const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myclassSchema = new Schema(
  {
    tableName: String, 
    index: { type: String, unique: true },
    class: String,
    userId: Number,
    semester: Number,
    subject: String,
    score: Number,
  },
  {
    collection: 'externalClasses',
    strict: 'throw',
    timestamps: true,
  }
);

var MyclassModel = mongoose.model('myclasses', myclassSchema);

module.exports = { MyclassModel };
