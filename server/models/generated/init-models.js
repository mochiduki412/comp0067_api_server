var DataTypes = require("sequelize").DataTypes;
var _English = require("./English");
var _Kono = require("./Kono");
var _Krio = require("./Krio");
var _Limba = require("./Limba");
var _Mende = require("./Mende");
var _Pictograms = require("./Pictograms");
var _Themne = require("./Themne");

function initModels(sequelize) {
  var English = _English(sequelize, DataTypes);
  //Do not modify other tables for now.
  // var Kono = _Kono(sequelize, DataTypes);
  // var Krio = _Krio(sequelize, DataTypes);
  // var Limba = _Limba(sequelize, DataTypes);
  // var Mende = _Mende(sequelize, DataTypes);
  // var Pictograms = _Pictograms(sequelize, DataTypes);
  // var Themne = _Themne(sequelize, DataTypes);


  return {
    English,
    // Kono,
    // Krio,
    // Limba,
    // Mende,
    // Pictograms,
    // Themne,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
