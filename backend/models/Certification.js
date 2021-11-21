const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema(
  {
    credentialName: { type: String, unique: true, required: true },
    credentialCategory: { type: String, required: true },
    owner: { type: String, required: true },
    accessKeyId: { type: String },
    secretAccessKey: { type: String },
    region: { type: String },
    service: { type: String },
    selectedDB: String,
    ip: String,
    port: String,
    dbname: String,
    username: String,
    password: String,
  },
  { timestamps: true }
);

const Certification = mongoose.model('certification', CertificationSchema);
module.exports = { Certification };
