const mongoose = require('mongoose');

const awsVer3DataSchema = new mongoose.Schema(
  {
    credentialName: String,
    owner: { type: String, required: true },
    selectedColumns: Array,
    aliasColumns: Object,
    content: String,
  },
  {
    timestamps: true,
  }
);

const AwsVer3Data = mongoose.model('awsVer3Data', awsVer3DataSchema);
module.exports = { AwsVer3Data };
