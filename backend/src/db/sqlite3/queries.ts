const CREATE_USERS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS USERS (
                                  ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                  NAME VARCHAR(50) NOT NULL,
                                  PHONE_NUMBER INT UNIQUE NOT NULL,
                                  ADDRESS VARCHAR(255) NOT NULL,
                                  IS_CURRENT_USER BOOLEAN DEFAULT TRUE,
                                  DATE_AND_TIME DATETIME DEFAULT (DATETIME('NOW', 'LOCALTIME'))
                                )`.toLowerCase();

const INSERT_USER_RECORD_SQL = "INSERT INTO USERS (NAME, PHONE_NUMBER, ADDRESS) VALUES (?, ?, ?)".toLowerCase();
const SELECT_LAST_USER_RECORD_SQL = "SELECT * FROM USERS WHERE ID = (SELECT MAX(ID) FROM USERS)".toLowerCase();
const SELECT_USER_RECORD_BY_PHONE_NUMBER_SQL = "SELECT * FROM USERS WHERE PHONE_NUMBER = ?".toLowerCase();
const SELECT_USER_RECORD_BY_ID_SQL = "SELECT * FROM USERS WHERE ID = ?".toLowerCase();
const SELECT_ALL_USERS_RECORDS_SQL = "SELECT * FROM USERS".toLowerCase();
const UPDATE_USER_RECORD_BY_ID = "UPDATE USERS SET <COLUMN_NAME> = ? WHERE ID = ?".toLowerCase();
const DELETE_USER_RECORD_BY_ID_SQL = "DELETE FROM USERS WHERE ID = ?".toLowerCase();
const DELETE_ALL_USERS_RECORDS_SQL = "DELETE FROM USERS".toLowerCase();



const CREATE_COWS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS COWS (
                                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                USER_ID INTEGER NOT NULL,
                                NAME VARCHAR(100) NOT NULL,
                                BREED VARCHAR(100) NOT NULL,
                                BULL_NAME VARCHAR(100) NOT NULL,
                                DATE_AND_TIME DATETIME DEFAULT (DATETIME('NOW', 'LOCALTIME')),
                                FOREIGN KEY (USER_ID) REFERENCES USERS(ID)
                              )`.toLowerCase();      
                              
const INSERT_COW_RECORD_SQL = "INSERT INTO COWS (USER_ID, NAME, BREED, BULL_NAME) VALUES (?, ?, ?, ?)".toLowerCase();                             
const SELECT_LAST_COW_RECORD_SQL = "SELECT * FROM COWS WHERE ID = (SELECT MAX(ID) FROM COWS)".toLowerCase();
const SELECT_ALL_COWS_RECORDS_SQL = "SELECT * FROM COWS".toLowerCase();



const CREATE_INJECTION_INFO_AND_AI_DATES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS INJECTION_INFO_AND_AI_DATES (
                                                        ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                                        COW_ID INTEGER NOT NULL,
                                                        NAME VARCHAR(50) NOT NULL,
                                                        COST DECIMAL(10, 2) NOT NULL,
                                                        DATE VARCHAR(20) NOT NULL,
                                                        DATE_AND_TIME DATETIME DEFAULT (DATETIME('NOW', 'LOCALTIME')),
                                                        FOREIGN KEY (COW_ID) REFERENCES COWS(ID)                                                     
                                                      )`.toLowerCase();                                 

const INSERT_INJECTION_INFO_AND_AI_DATES_RECORD_SQL = "INSERT INTO INJECTION_INFO_AND_AI_DATES (COW_ID, NAME, COST, DATE) VALUES (?, ?, ?, ?)".toLowerCase();
const SELECT_INJECTION_INFO_AND_AI_DATES_RECORDS_BY_COW_ID_SQL = "SELECT ID, NAME, COST, DATE FROM INJECTION_INFO_AND_AI_DATES WHERE COW_ID = ?".toLowerCase();
const SELECT_ALL_INJECTION_INFO_AND_AI_DATES_RECORDS_SQL = "SELECT * FROM INJECTION_INFO_AND_AI_DATES".toLowerCase();

export default {
  CREATE_USERS_TABLE_SQL,
  INSERT_USER_RECORD_SQL,
  SELECT_LAST_USER_RECORD_SQL,
  SELECT_USER_RECORD_BY_PHONE_NUMBER_SQL,
  SELECT_USER_RECORD_BY_ID_SQL,
  SELECT_ALL_USERS_RECORDS_SQL,
  UPDATE_USER_RECORD_BY_ID,
  DELETE_USER_RECORD_BY_ID_SQL,
  DELETE_ALL_USERS_RECORDS_SQL,
  
  CREATE_COWS_TABLE_SQL,
  INSERT_COW_RECORD_SQL,
  SELECT_LAST_COW_RECORD_SQL,
  SELECT_ALL_COWS_RECORDS_SQL,

  CREATE_INJECTION_INFO_AND_AI_DATES_TABLE_SQL,
  INSERT_INJECTION_INFO_AND_AI_DATES_RECORD_SQL,
  SELECT_INJECTION_INFO_AND_AI_DATES_RECORDS_BY_COW_ID_SQL,
  SELECT_ALL_INJECTION_INFO_AND_AI_DATES_RECORDS_SQL
};