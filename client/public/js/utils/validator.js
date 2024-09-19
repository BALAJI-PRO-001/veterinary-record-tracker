

class Validator {
  NUMERIC_CHARACTER_REGEX_PATTERN = /^\d+$/;
  SPECIAL_CHARACTER_REGEX_PATTERN = /[^a-zA-Z0-9\s]/;
  EMAIL_REGEX_PATTERN = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  UPPERCASE_REGEX_PATTERN = /[A-Z]/;
  ALPHABET_REGEX_PATTERN = /^[A-Za-z]+$/;

  isTrue(value) {
    if(value == "") {
      return false;
    }
    return true;
  }

  isValidName(name) {
    if(name == "") {
      return {isValid : false, message: "name cannot be Empty..."};
    }
    return {isValid: true}; 
  }



  isValidPhoneNo(phoneNo) {
    console.log(phoneNo);
    if(phoneNo == "") {
      console.log("1");
      return {isValid : false,message : "phone no cannot be empty"};
    }
    if(!this.NUMERIC_CHARACTER_REGEX_PATTERN.test(phoneNo)) {
      console.log("2");
      return {isValid : false,message : "use only numeric values..."};
    }
    if(this.SPECIAL_CHARACTER_REGEX_PATTERN.test(phoneNo)) {
      console.log("3");
      return {isValid : false,message : "use only numeric values..."};
    }
    if(this.ALPHABET_REGEX_PATTERN.test(phoneNo)) {
      console.log("4");
      return {isValid : false,message : "use only numeric values..."};
    }
    else {
      console.log("5");
      return{isValid: true};
    }
    

  }
}


const validator = new Validator();
export default validator;