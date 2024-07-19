/** Use only with Antd Form */
/** Currently validator will no longer working if using regex from outside 'validator' object */
import utils from "./utils";

const validator = {
  validateCurrencyFormat: (rule, value, callback) => {
    const regex = /^[a-zA-Z]{3}/g;
    if (value === "") {
      callback(`Cần nhập giá trị`);
      return Promise.reject("Cần nhập giá trị");
    } else if (!regex.test(value)) {
      return Promise.reject("Định dạng tiền tệ không đúng. VD: 'USD', 'EUR'");
    } else {
      return Promise.resolve();
    }
  },

  validatorSelectUser: (rule, value) => {
    if (value && !value.value.includes("USR")) {
      return Promise.reject("Vui lòng lựa chọn cá nhân xử lý!");
    } else {
      return Promise.resolve();
    }
  },

  validateInputString: (rule, value) => {
    if (value && value.trim() === "") {
      return Promise.reject("Cần nhập ký tự, vui lòng không bỏ trống");
    } else {
      return Promise.resolve();
    }
  },

  validateDocumentCode: (rule, value) => {
    const input = utils.removeVietnameseCharMark(value);
    const regex = /^[a-zA-Z0-9._]+$/g;
    if (input && !regex.test(input)) {
      return Promise.reject(
        "Mã văn bản chỉ được phép nhập chữ, số, dấu chấm & gạch dưới. VD: QTTB.CNTT01_1"
      );
    } else {
      return Promise.resolve();
    }
  },

  validateWebsite: (rule, value) => {
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    if (value && !regex.test(value)) {
      return Promise.reject("Sai định dạng website!");
    } else {
      return Promise.resolve();
    }
  },

  validateEmail: (rule, value) => {
    const regex = /^[A-Za-z][A-Za-z0-9-_\.]{1,32}(\+?[0-9]){0,5}@[A-Za-z0-9_-]{2,}(\.[A-Za-z0-9]{2,4}){1,2}$/gm;
    if (value && !regex.test(value)) {
      return Promise.reject("Sai định dạng email!");
    } else {
      return Promise.resolve();
    }
  },

  validateIntergerNumber: (rule, value) => {
    if (value && !Number.isInteger(value)) {
      return Promise.reject("Không phải số nguyên");
    } else if (value && value < 0) {
      return Promise.reject("Không được phép nhập số âm");
    } else {
      return Promise.resolve();
    }
  },

  validateNumber: (rule, value) => {
    const regex = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/g;
    if (value && value.trim() === "") {
      return Promise.reject("Cần nhập số");
    } else if (isNaN(value) && value !== "" && value !== undefined) {
      return Promise.reject("Không phải số");
    } else if (
      value !== "" &&
      value !== undefined &&
      regex.test(value) === false
    ) {
      return Promise.reject(
        "Sai định dạng số. Bỏ số 0 ở đầu, dấu cách hoặc các ký tự đặc biệt"
      );
    } else if (value < 0) {
      return Promise.reject("Cần nhập số lớn hơn 0");
    } else {
      return Promise.resolve();
    }
  },

  validateUsername: (rule, value) => {
    const regex = /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/g;
    if (value && !regex.test(value)) {
      return Promise.reject("Tên đăng nhập không đúng định dạng!");
    } else {
      return Promise.resolve();
    }
  },
  validateSemesterName: (rule, value) => {
    const regex = /^(Spring|Summer|Fall)\d{4}$/;
    if (value && !regex.test(value)) {
      return Promise.reject(
        "Semester name is not in the correct format! Must begin with 'Spring', 'Summer' or 'Fall' along with the year.Example: Summer2024"
      );
    } else {
      return Promise.resolve();
    }
  },
  validatePhoneNumber: (rule, value) => {
    // const regex = /0[0-9]{9,11}/g
    const regex = /((01|09|03|07|08|05|\+84|84)+([0-9]{8,9})\b)/g;
    if (value && (!regex.test(value) || value.length > 13)) {
      return Promise.reject("Sai định dạng số điện thoại!");
    } else {
      return Promise.resolve();
    }
  },

  validateCompletionRate: (rule, value) => {
    if (typeof value === "string" && value !== "") {
      return Promise.reject("Tỉ lệ hoàn thành phải là số!");
    } else if (value > 100) {
      return Promise.reject("Tỉ lệ hoàn thành không được lớn hơn 100%!");
    } else {
      return Promise.resolve();
    }
  },

  validateCharactersCannotExceed: (rule, value) => {
    if (value && value.length > 255) {
      return Promise.reject("Ký tự không được vượt quá 255!");
    } else {
      return Promise.resolve();
    }
  },
};

export default validator;
