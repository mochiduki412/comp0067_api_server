const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Kono', {
    id: {
      field: 'TermId',
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    language: {
      field: 'LanguageId',
      type: DataTypes.STRING(128),
      allowNull: true
    },
    title: {
      field: 'Title',
      type: DataTypes.STRING(128),
      allowNull: false
    },
    text: {
      field: 'Term',
      type: DataTypes.TEXT,
      allowNull: false
    },
    audio: {
      field: 'AudioURL',
      type: DataTypes.BLOB('medium'),
      allowNull: true
    },
    pictogram: {
      field: 'PictogramURL',
      type: DataTypes.BLOB('medium'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'English',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TermId" },
        ]
      },
    ]
  });
};
