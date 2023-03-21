const XLSX = require("xlsx");
exports.ReadExcelFile = async (name) => {
      const data = await XLSX.readFile(name);
      var sheet_name_list = data.SheetNames;
      let jsonData = XLSX.utils.sheet_to_json(
            data.Sheets[sheet_name_list[0]]
      );
      return jsonData
}