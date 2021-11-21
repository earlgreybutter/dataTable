const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_tb', {
    sno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    det: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    addr: {
      type: DataTypes.CHAR(80),
      allowNull: true
    },
    tel: {
      type: DataTypes.CHAR(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'student_tb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sno" },
        ]
      },
    ]
  });
};
