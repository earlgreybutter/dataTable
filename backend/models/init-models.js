var DataTypes = require("sequelize").DataTypes;
var _myclasses = require("./myclasses");
var _student_tb = require("./student_tb");

function initModels(sequelize) {
  var myclasses = _myclasses(sequelize, DataTypes);
  var student_tb = _student_tb(sequelize, DataTypes);


  return {
    myclasses,
    student_tb,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
