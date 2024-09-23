import { Request, Response, NextFunction } from "express";
import Record from "../models/record.model";
import errorHandler from "../utils/errorHandler";
import validateUserRequiredData from "../utils/validateUserRequiredData";
import validateCowRequiredData from "../utils/validateCowRequiredData";
import validateInjectionInfoAndAiDatesRequiredData from "../utils/validateInjectionInfoAndAiDatesRequiredData";



export async function createNewRecord(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { user, cows } = req.body;
    if (!user || !cows) {
      return next(errorHandler(400, "Bad Request: User or cows data is missing."));
    }    

    try {
      validateUserRequiredData(user);
      validateCowRequiredData(cows);
    } catch(err) {
      return next(err);
    }

    
    const isPhoneNumberAlreadyInUse = await Record.isPhoneNumberAlreadyInUse(user.phoneNumber);
    if (isPhoneNumberAlreadyInUse) {
      return next(errorHandler(409, "Duplicate Key: Phone number is already in use by another record."));
    }

    const newRecord = await Record.createNewRecord({user: user, cows: cows});
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: {
        record: newRecord
      }
    });
  } catch(err) {
    next(err);
  }
}



export async function getAllRecords(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const records = await Record.getAllRecords();
    res.status(200).json({
      success: true,
      length: records.length,
      data: {
        records: records
      }
    });
  } catch(err) {
    next(err);
  }
}



export async function getRecordByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId } = req.params;
    const isUserRecordAvailable = await Record.hasUserRecord(Number(userId));
    if (!isUserRecordAvailable) {
      return next(errorHandler(404, "Record not found for the specified user id: " + userId));
    }

    const record = await Record.getRecordByUserId(Number(userId));
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        record: record
      }
    });
  } catch(err) {
    next(err);
  }
}



export async function deleteAllRecords(req: Request, res: Response, next: NextFunction) {
  try {
    await Record.deleteAllRecords();
    res.status(204).json({});
  } catch(err) {
    next(err);
  }
}



export async function deleteRecord(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const isUserRecordAvailable = await Record.hasUserRecord(Number(userId));
    if (!isUserRecordAvailable) {
      return next(errorHandler(404, "Record not found for the specified user id: " + userId));
    }
    await Record.deleteRecordByUserId(Number(userId));
    res.status(204).json({});
  } catch(err) {
    next(err);
  }
}



export async function addNewCowToUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const isRecordExists = await Record.hasUserRecord(Number(userId));
    if (!isRecordExists) {
      return next(errorHandler(404, "User record not found for the specified user id: " + userId));
    }

    validateCowRequiredData([req.body]);

    await Record.addNewCowToUser(Number(userId), req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: `A new cow record successfully created for user id: ${userId}`
    });
  } catch(err) {
    next(err);
  }
}



export async function deleteCowFromUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, cowId } = req.params;
    const isUserRecordAvailable = await Record.hasUserRecord(Number(userId));
    if (!isUserRecordAvailable) {
      return next(errorHandler(404, "User record not found for the specified user id: " + userId));
    }

    const isCowRecordAvailable = await Record.hasCowRecord(Number(cowId));
    if (!isCowRecordAvailable) {
      return next(errorHandler(404, "Cow record not found for the specified cow id: " + cowId));
    }

    await Record.deleteCowFromUser(Number(cowId));
    res.status(204).json({});
  } catch(err) {
    next(err);
  }
}



export async function addNewInjectionInfoAndAiDatesToCow(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, cowId } = req.params;
    const isUserRecordAvailable = await Record.hasUserRecord(Number(userId));
    if (!isUserRecordAvailable) {
      return next(errorHandler(404, "User record not found for the specified user id: " + userId));
    }

    const isCowRecordAvailable = await Record.hasCowRecord(Number(cowId));
    if (!isCowRecordAvailable) {
      return next(errorHandler(404, "Cow record not found for the specified cow id: " + cowId));
    }

    validateInjectionInfoAndAiDatesRequiredData(req.body);

    await Record.addNewInjectionInfoAndAiDatesToCow(Number(cowId), req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: `New injection info and AI dates have been successfully created for cow id: ${cowId}.`
    });
  } catch(err) {
    next(err);
  }
}