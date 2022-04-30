// import sorting from "./sorting";
import XLSX from "xlsx";
import fileicon from "./fileicon";

var Utils = {
  ConvertISOtoLocaleDateTime(pDatetime) {
    return new Date(new Date(new Date(pDatetime).setHours(new Date(pDatetime).getHours() - new Date().getTimezoneOffset() / 60)))
      .toISOString()
      .slice(0, 16);
  },
  RandomPastelColor() {
    return `hsla(${~~(360 * Math.random())},70%,70%,0.8)`;
  },
  ExcelToArray(pFile, pFirstRowToRead) {
    var output = [];
    var reader = new FileReader();
    reader.onload = pFile => {
      var workbook = XLSX.read(pFile.target.result, { type: "array" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var range = XLSX.utils.decode_range(worksheet["!ref"]);
      for (var R = range.s.r + pFirstRowToRead; R <= range.e.r; ++R) {
        var obj = {};
        for (var C = range.s.c; C <= range.e.c; ++C) {
          var cellref = XLSX.utils.encode_cell({ c: C, r: R }); // construct A1 reference for cell
          obj[worksheet[XLSX.utils.encode_cell({ c: C, r: pFirstRowToRead - 1 })]?.v] = worksheet[cellref]?.v ? worksheet[cellref]?.v : "";
        }
        if (obj?.Username) output.push(obj);
      }
    };
    reader.readAsArrayBuffer(pFile);
    return output;
  },
  bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i > 1) {
      return parseFloat(bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
    } else {
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    }
  },
  fileicon(type) {
    return fileicon(type);
  },
  timeInterval(date) {
    var seconds = Math.floor((new Date() - new Date(date)) / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " ปีที่แล้ว";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " เดือนที่แล้ว";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " วันที่แล้ว";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " ชั่วโมงที่แล้ว";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " นาทีที่แล้ว";
    }
    return Math.floor(seconds) + " วินาทีที่แล้ว";
  },
  calculateGrade(score) {
    var result = { type: "", grade: "" };
    if (score >= 80) {
      result = { type: "a", grade: "A" };
    } else if (score >= 75) {
      result = { type: "bp", grade: "B+" };
    } else if (score >= 70) {
      result = { type: "b", grade: "B" };
    } else if (score >= 65) {
      result = { type: "cp", grade: "C+" };
    } else if (score >= 60) {
      result = { type: "c", grade: "C" };
    } else if (score >= 55) {
      result = { type: "dp", grade: "D+" };
    } else if (score >= 50) {
      result = { type: "d", grade: "D" };
    } else {
      result = { type: "f", grade: "F" };
    }
    return result;
  }
};

export { Utils };

export default {
  install(Vue) {
    Vue.prototype.Utils = Utils;
  }
};
