const { Sequelize, DataTypes } = require('sequelize');
const { initModels } = require('./generated/init-models');
require('dotenv').config();

const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const DB = process.env.DB || 'DRR_APP';
let sequelize = new Sequelize(DB, USER, PASS, {
    host: 'localhost',
    dialect: 'mysql',
});

let { English } = initModels(sequelize, DataTypes);
let Term = English;

// (async () => {
//     let terms = await Term.findAll();
//     console.log("All terms:", JSON.stringify(terms, null, 2));
// })();
// exports.Term = Term //for non-babel codes

export default Term