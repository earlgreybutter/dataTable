const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('myclasses', {
    ROW_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CLASS: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SEMESTER: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SUBJECT: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    SCORE: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'myclasses',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ROW_ID" },
        ]
      },
    ]
  });
};
