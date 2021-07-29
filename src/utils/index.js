// import sorting from "./sorting";
import XLSX from "xlsx";
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
          if (worksheet[cellref]) {
            obj[worksheet[XLSX.utils.encode_cell({ c: C, r: pFirstRowToRead - 1 })]?.v] = worksheet[cellref]?.v;
          } else {
            continue;
          }
        }
        if (obj?.Username) output.push(obj);
      }
    };
    reader.readAsArrayBuffer(pFile);
    return output;
  },
  s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }
};

export { Utils };

export default {
  install(Vue) {
    Vue.prototype.Utils = Utils;
  }
};
