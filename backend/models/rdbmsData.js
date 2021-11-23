const mongoose = require('mongoose');
// 한번 만들어보았다. 아직 안쓰고 있음.
const RdbmsDataSchema = new mongoose.Schema(
  {
    credentialName: String,
    selectedDB: String,
    ip: String,
    port: String,
    dbname: String,
    username: String,
    password: String,
    selectedColumns: Object,
    aliasColumns: Object,
    content: String,
  },
  { timestamps: true }
);

const RdbmsData = mongoose.model('rdbmsData', RdbmsDataSchema);
module.exports = { RdbmsData };
