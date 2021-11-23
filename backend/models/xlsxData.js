const mongoose = require('mongoose');

const XlsxDataSchema = new mongoose.Schema(
  {
    credentialName: String,  // 사용자가 지정한 이름
    owner: { type: String, required: true },
    selectedColumns: Object,    // { key : value } { column_name : show/hide }
    aliasColumns: Object, // { key : value } 나중에 생각
    content: String // JSON String 형태로 데이터 저장
  },
  { timestamps: true }
);

const XlsxData = mongoose.model('xlsxData', XlsxDataSchema);
module.exports = { XlsxData };
