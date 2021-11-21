const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema(
  {
    selected: { type: String, required: true },
    edited: { type: String, required: true },
    tableName: { type: String, required: true },
  },
  { timestamps: true }
);

const Column = mongoose.model('column', ColumnSchema);
module.exports = { Column };
