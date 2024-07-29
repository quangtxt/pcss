import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment, { duration } from "moment";
import { DATE_FORMAT_SLASH } from "./constants";
/** App utils */
const { confirm } = Modal;
const utils = {
  getRollNumberFromEmail(email) {
    const parts = email.split("@");
    if (parts.length !== 2) {
      return null;
    }

    const username = parts[0];
    const rollNumber = username.slice(-8);
    return rollNumber;
  },
  getBase64FromImageUrl(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  },

  /** Add commas for separate thousand in number */
  thousandSeparator: (num) => {
    let parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  },

  /** remove html */
  removeHtml: (string) => {
    if (!string) return "";
    return string
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/, "<")
      .replace(/&gt;/, ">")
      .replace(/&le;/, "≤")
      .replace(/&ge;/, "≥");
  },

  /** Compare time, return -1 for sooner, 0 for equal, 1 for later */
  compareTime: (DateA, DateB) => {
    let a = new Date(DateA);
    let b = new Date(DateB);
    let msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
    let msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());
    if (parseFloat(msDateA) < parseFloat(msDateB)) return -1;
    // lt
    else if (parseFloat(msDateA) === parseFloat(msDateB)) return 0;
    // eq
    else if (parseFloat(msDateA) > parseFloat(msDateB)) return 1;
    // gt
    else return null; // error
  },

  removeVietnameseCharMark: (str) => {
    if (str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");
      return str.trim();
    }
    return str.trim();
  },

  nonAccentVietnamese: (str) => {
    if (typeof str !== "string") return;
    str = str.toLowerCase().trim();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Một số hệ thống mã hóa tiếng Việt kết hợp dấu thành các ký tự utf-8 riêng lẻ
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  },

  /** Decode JWT token */
  jwtDecode: (token) => {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  },

  /** Filter unique object in array */
  getUnique: (arr, comp) => {
    return arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);
  },

  /** Get gender name */
  getGenderName: (gender) => {
    let genderName = "";
    switch (gender) {
      case 0:
        genderName = "Nữ";
        break;
      case 1:
        genderName = "Nam";
        break;
      case 2:
        genderName = "Khác";
        break;
      default:
        genderName = undefined;
        break;
    }
    return genderName;
  },

  /** Render weekday name */
  renderWeekday: (day) => {
    switch (day) {
      case 1:
        return "Thứ hai";
      case 2:
        return "Thứ ba";
      case 3:
        return "Thứ tư";
      case 4:
        return "Thứ năm";
      case 5:
        return "Thứ sáu";
      case 6:
        return "Thứ bảy";
      default:
        return "Chủ nhật";
    }
  },

  /** Check nullish */
  isNullish: (value) => {
    return value === undefined || value === null || value === "";
  },

  /** Capitalize name */
  getNameInCapitalize: (string) => {
    if (!string) return "";
    return string.toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase());
  },

  /** get extension file*/
  getExtensionFile: (file_name) => {
    if (!file_name) return "";
    return file_name.toLowerCase().split(".").pop();
  },
  /** Remove extension file from name file*/
  removeExtensionFile: (file_name) => {
    if (!file_name) return "";
    return file_name.split(".").slice(0, -1).join(".");
  },

  /** Get date range between 2 dates
   * Input values should be in string format (YYYY-MM-DD)
   * */
  getDateRange: (date) => {
    if (typeof date !== "string") {
      throw new Error("Input date should be a string in format YYYY-MM-DD");
    }
    let d1 = new Date(date);
    let d2 = new Date();
    let diff = d1.getTime() - d2.getTime();
    return diff / (1000 * 3600 * 24);
  },

  isUpper: (str) => {
    if (typeof str !== "string") return false;
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
  },

  /** Return the date range from week number and year
   * For example: Input weekNo = 3, year = 2020 will return 2020-01-13 and 2020-01-19
   * Remember to use moment('YYYY-MM-DD').isoWeekYear()
   * */
  getDateRangeOfWeek: (weekNo, yearNo) => {
    if (
      !(
        Number.isInteger(weekNo) &&
        Number.isInteger(yearNo) &&
        weekNo >= 1 &&
        yearNo >= 1970
      )
    )
      return false;
    Date.prototype.getWeek = function () {
      let date = new Date(this.getTime());
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
      let week1 = new Date(date.getFullYear(), 0, 4);
      return (
        1 +
        Math.round(
          ((date.getTime() - week1.getTime()) / 86400000 -
            3 +
            ((week1.getDay() + 6) % 7)) /
            7
        )
      );
    };
    let d1, numOfdaysPastSinceLastMonday, month, date;
    let rangeIsFrom, rangeIsTo;
    d1 = new Date("" + yearNo + "");
    numOfdaysPastSinceLastMonday = d1.getDay() - 1;
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    d1.setDate(d1.getDate() + 7 * (weekNo - d1.getWeek()));
    month =
      d1.getMonth() + 1 < 10 ? `0${d1.getMonth() + 1}` : d1.getMonth() + 1;
    date = d1.getDate() < 10 ? `0${d1.getDate()}` : d1.getDate();
    rangeIsFrom = `${d1.getFullYear()}-${month}-${date}`;
    d1.setDate(d1.getDate() + 6);
    month =
      d1.getMonth() + 1 < 10 ? `0${d1.getMonth() + 1}` : d1.getMonth() + 1;
    date = d1.getDate() < 10 ? `0${d1.getDate()}` : d1.getDate();
    rangeIsTo = `${d1.getFullYear()}-${month}-${date}`;
    return [rangeIsFrom, rangeIsTo];
  },
  renderDocumentCommitteeStatus: (statusCode) => {
    switch (statusCode) {
      case "00":
        return "Tạo văn bản mới";
      case "01":
        return "Đã đến";
      case "02":
        return "Từ chối tiếp nhận";
      case "03":
        return "Đã tiếp nhận văn bản";
      case "04":
        return "Phân công xử lý";
      case "05":
        return "Đang xử lý";
      case "06":
        return "Hoàn thành";
      case "13":
        return "Yêu cầu lấy lại văn bản";
      case "15":
        return "Đồng ý lấy lại, cập nhật văn bản";
      case "16":
        return "Từ chối lấy lại, cập nhật văn bản";
      case null:
        return "Đã gửi";
      case "100":
        return "Văn bản bị thu hồi";
      case "200":
        return "Văn bản bị cập nhật";
      case "300":
        return "Văn bản bị thay thế";
      default:
        return "";
    }
  },
  renderDocumentCommitteeTag: (status) => {
    const tag = {
      color: "",
      text: "",
    };
    switch (status) {
      case "01":
        tag.color = "black";
        tag.name = "Đã đến";
        break;
      case "02":
        tag.color = "red";
        tag.name = "Từ chối tiếp nhận";
        break;
      case "03":
        tag.color = "purple";
        tag.name = "Đã tiếp nhận";
        break;
      case "04":
        tag.color = "lime";
        tag.name = "Phân công";
        break;
      case "05":
        tag.color = "green";
        tag.name = "Đang xử lý";
        break;
      case "06":
        tag.color = "blue";
        tag.name = "Hoàn thành";
        break;
      case "13":
        tag.color = "magenta";
        tag.name = "Lấy lại";
        break;
      case "15":
        tag.color = "volcano";
        tag.name = "Đồng ý cập nhật / lấy lại";
        break;
      case "16":
        tag.color = "red";
        tag.name = "Từ chối cập nhật / lấy lại";
        break;
      case null:
        tag.color = "gray";
        tag.name = "Chưa đọc";
        break;
      case "100":
        tag.color = "red";
        tag.name = "Văn bản bị thu hồi";
        break;
      case "200":
        tag.color = "red";
        tag.name = "Văn bản bị cập nhật";
        break;
      case "300":
        tag.color = "red";
        tag.name = "Văn bản bị thay thế";
        break;
      default:
        tag.color = "";
        tag.name = "";
        break;
    }
    return tag;
  },
  renderInternalDocumentTag: (status) => {
    const tag = {
      color: "",
      text: "",
    };
    switch (status) {
      case "100":
        tag.color = "black";
        tag.name = "Chưa duyệt";
        break;
      case "101":
        tag.color = "green";
        tag.name = "Đã duyệt";
        break;
      case "102":
        tag.color = "blue";
        tag.name = "Tạo danh sách công việc";
        break;
      default:
        tag.color = "";
        tag.name = "";
        break;
    }
    return tag;
  },

  checkForDuplicates: (array) => {
    let valuesAlreadySeen = [];

    for (let i = 0; i < array.length; i++) {
      let value = array[i];
      if (valuesAlreadySeen.indexOf(value) !== -1) {
        return true;
      }
      valuesAlreadySeen.push(value);
    }
    return false;
  },
  urlify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + "</a>";
    });
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
  },
  exportExcel: (rows, filename = "download") => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = filename;
    const ws = XLSX.utils.json_to_sheet(rows, { skipHeader: true });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  },
  isIOSDevice: () => {
    const isPlatform = [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform);

    const isAgent = navigator.userAgent.includes("Mac");

    return (
      // iPad on iOS 13 detection
      isPlatform || isAgent
    );
  },

  getParameterByName: (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  executeFromDate(startDate, timeString, holidays) {
    const match = timeString.match(/(\d+) (week|weeks) \(weeks (\d+)-(\d+)\)/);
    if (match) {
      const duration = parseInt(match[1]);
      const startWeek = parseInt(match[3]);
      const startDate_moment = moment(startDate);
      let fromDate_moment = startDate_moment
        .clone()
        .add(startWeek - 1, "weeks");

      if (holidays) {
        const holidayStart = moment(holidays[0]);
        const holidayEnd = moment(holidays[1]);
        if (
          fromDate_moment.diff(holidayStart, "days") == 0 ||
          fromDate_moment.isAfter(holidayEnd)
        ) {
          fromDate_moment = fromDate_moment.add(
            holidayEnd.diff(holidayStart, "days") + 1,
            "days"
          );
        }
      }
      return fromDate_moment;
    }

    const match1 = timeString.match(/(\d+) (week|weeks) \(week (\d+)\)/);
    if (match1) {
      const duration = parseInt(match1[1]);
      const startWeek = parseInt(match1[3]);
      const startDate_moment = moment(startDate);
      let fromDate_moment = startDate_moment
        .clone()
        .add(startWeek - 1, "weeks");
      if (holidays) {
        const holidayStart = moment(holidays[0]);
        const holidayEnd = moment(holidays[1]);
        if (
          fromDate_moment.diff(holidayStart, "days") == 0 ||
          fromDate_moment.isAfter(holidayEnd)
        ) {
          fromDate_moment = fromDate_moment.add(
            holidayEnd.diff(fromDate_moment, "days") + 1,
            "days"
          );
        }
      }
      return fromDate_moment;
    }

    const match2 = timeString.match(/(\d+) (week|weeks)/);
    if (match2) {
      return moment(startDate);
    }
    return null;
  },

  executeToDate(startDate, timeString, holidays) {
    const match = timeString.match(/(\d+) (week|weeks) \(weeks (\d+)-(\d+)\)/);
    if (match) {
      const duration = parseInt(match[1]);
      const startWeek = parseInt(match[3]);
      const endWeek = parseInt(match[4]);

      // Calculate the end date using moment.js
      const startDate_obj = moment(startDate);
      let endDate_obj = startDate_obj.add(endWeek, "weeks").subtract(1, "day");
      if (holidays) {
        const holidayStart = moment(holidays[0]);
        const holidayEnd = moment(holidays[1]);
        if (
          endDate_obj.isAfter(holidayEnd) ||
          endDate_obj.diff(holidayEnd, "days") == 0
        ) {
          endDate_obj = endDate_obj.add(
            holidayEnd.diff(holidayStart, "days") + 1,
            "days"
          );
        }
      }
      return endDate_obj;
    }

    const match1 = timeString.match(/(\d+) (week|weeks) \(week (\d+)\)/);
    if (match1) {
      const duration = parseInt(match1[1]);
      const startWeek = parseInt(match1[3]);

      // Calculate the end date using moment.js
      const startDate_obj = moment(startDate);
      let endDate_obj = startDate_obj.add(duration * 7 - 1, "days");
      if (holidays) {
        const holidayStart = moment(holidays[0]);
        const holidayEnd = moment(holidays[1]);
        if (
          endDate_obj.diff(holidayEnd, "days") == 0 ||
          endDate_obj.isAfter(holidayEnd)
        ) {
          endDate_obj = endDate_obj.add(
            holidayEnd.diff(holidayStart, "days") + 1,
            "days"
          );
        }
      }
      return endDate_obj;
    }

    const match2 = timeString.match(/(\d+) (week|weeks)/);
    if (match2) {
      const duration = parseInt(match2[1]);
      const startDate_obj = moment(startDate);
      let endDate_obj = startDate_obj.add(duration, "weeks").subtract(1, "day");
      if (holidays) {
        const holidayStart = moment(holidays[0]);
        const holidayEnd = moment(holidays[1]);
        if (
          endDate_obj.diff(holidayEnd, "days") == 0 ||
          endDate_obj.isAfter(holidayEnd)
        ) {
          endDate_obj = endDate_obj.add(
            holidayEnd.diff(holidayStart, "days") + 1,
            "days"
          );
        }
      }
      return endDate_obj;
    }
    return null;
  },
  formatCurrency: (number) => {
    if (!number) return;
    return new Intl.NumberFormat().format(parseInt(number));
  },
  confirmDelete: (handleDelete) => {
    return confirm({
      title: "Bạn có muốn xóa thông tin này không?",
      icon: <QuestionCircleOutlined style={{ color: "red" }} />,
      okText: "Đồng ý",
      cancelText: "Không",
      okType: "danger",
      onOk() {
        handleDelete();
      },
    });
  },
  async exportPDF(element, title, font) {
    const pdfContent = document.getElementById(element);
    console.log("pdfContent", pdfContent);
    //https://www.npmjs.com/package/html-to-pdfmake
    const html = htmlToPdfmake(pdfContent.innerHTML, {
      imagesByReference: true,
    });
    const originURL = window.location.origin;
    pdfMake.fonts = {
      TimesNewRoman: {
        normal: `${originURL}/assets/fonts/timesNewRoman/Times-New-Roman-Regular.ttf`,
        bold: `${originURL}/assets/fonts/timesNewRoman/Times-New-Roman-Bold.ttf`,
        italics: `${originURL}/assets/fonts/timesNewRoman/Times-New-Roman-Italic.ttf`,
        bolditalics: `${originURL}/assets/fonts/timesNewRoman/Times-New-Roman-BoldItalic.ttf`,
      },
      Roboto: {
        normal: `${originURL}/assets/fonts/roboto/Roboto-Regular.ttf`,
        bold: `${originURL}/assets/fonts/roboto/Roboto-Bold.ttf`,
        italics: `${originURL}/assets/fonts/roboto/Roboto-Italic.ttf`,
        bolditalics: `${originURL}/assets/fonts/roboto/Roboto-BoldItalic.ttf`,
      },
      CourierNew: {
        normal: `${originURL}/assets/fonts/courierNew/Courier-New-Regular.ttf`,
        bold: `${originURL}/assets/fonts/courierNew/Courier-New-Bold.ttf`,
        italics: `${originURL}/assets/fonts/courierNew/Courier-New-Italic.ttf`,
        bolditalics: `${originURL}/assets/fonts/courierNew/Courier-New-BoldItalic.ttf`,
      },
      Arial: {
        normal: `${originURL}/assets/fonts/arial/Arial-Regular.ttf`,
        bold: `${originURL}/assets/fonts/arial/Arial-Bold.ttf`,
        italics: `${originURL}/assets/fonts/arial/Arial-Italic.ttf`,
        bolditalics: `${originURL}/assets/fonts/arial/Arial-BoldItalic.ttf`,
      },
    };
    const documentDefinition = {
      content: html.content,
      defaultStyle: {
        font: font || "Roboto",
      },
      images: html.images,
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).download(`${title}.pdf`);
  },
  transformData(datatrs) {
    const result = {};

    function buildTree(items) {
      // Lọc các phần tử có parent là null (cấp gốc)
      const rootItems = items.filter((item) => item.milestone.parent === null);
      // Duyệt qua các phần tử ở cấp gốc và xây dựng cây
      rootItems.forEach((root) => {
        result[root.milestone.id] = {
          id: root.milestone.id,
          name: root.milestone.name,
          requirement: root.milestone.requirement,
          product: root.milestone.product,
          time: root.milestone.time,
          person: root.milestone.person,
          detail: buildSubTree(items, root.milestone.id, 1),
        };
      });
    }

    // Hàm helper để xây dựng các cấp con
    function buildSubTree(items, parentId, startingChildId) {
      const children = items.filter(
        (item) => item.milestone.parent === parentId
      );
      return children.map((child, index) => ({
        id: child.milestone.id,
        name: child.milestone.name,
        requirement: child.milestone.requirement,
        product: child.milestone.product,
        time: child.milestone.time,
        person: child.milestone.person,
        fromDate: moment(child.startDate),
        toDate: moment(child.endDate),
        key: `${startingChildId + index}`,
        detail: buildSubTree(items, child.milestone.id, 1),
      }));
    }

    // Bắt đầu xây dựng cây
    buildTree(datatrs);
    return Object.values(result);
  },
  getPhase(datatrs) {
    const rootItems = datatrs.filter((item) => item.milestone.parent === null);
    return Object.values(rootItems);
  },
  checkRichType(type, delegateValue, unitValue, agencyValue) {
    return type === "NDDPV"
      ? delegateValue
      : type === "DVPT"
      ? unitValue
      : agencyValue;
  },
  getInfoUser(username, departmentWithUserList) {
    if (!departmentWithUserList) return;
    const user = {
      full_name: username,
      image_id: null,
      username: username,
    };
    departmentWithUserList.forEach((department) => {
      const userTarget = department.users.find(
        (user) => user.user_name === username || user.user_code === username
      );
      if (userTarget) {
        user.full_name = userTarget.name_uppercase
          ? userTarget.name_uppercase
          : username;
        user.image_id = userTarget.image_id;
      }
    });
    return user;
  },
};

export default utils;
