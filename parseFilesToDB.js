const fs = require('fs');
require('dotenv').config();

function parse(){ //TODO: fix interface
    //IMPROVE: Use Json object.
    const BASE = process.cwd();
    const BASE_TITLE = BASE + '/filesToParse/ENGLISH/Title/';
    const BASE_TEXT = BASE + '/filesToParse/ENGLISH/Text/';
    const BASE_PICTOGRAM = BASE + '/filesToParse/Pictograms/';
    const BASE_AUDIO = BASE + '/filesToParse/Audios/';

    let titles = fs.readdirSync(BASE_TITLE);
    let texts = fs.readdirSync(BASE_TEXT);
    let pictograms = fs.readdirSync(BASE_PICTOGRAM);
    let audios = fs.readdirSync(BASE_AUDIO);
    console.assert(titles.length == texts.length);
    console.assert(titles.length == pictograms.length);
    for (let i = 0; i < titles.length; i++) {
        let data = {
            title: fs.readFileSync(BASE_TITLE + titles[i]),
            text: fs.readFileSync(BASE_TEXT + texts[i]),
            pictogram: fs.readFileSync(BASE_PICTOGRAM + pictograms[i]),
            audio: fs.readFileSync(BASE_AUDIO + audios[ i % audios.length ])
        };
        Term.create(data);
    }
}

const { initModels } = require('./server/models/generated/init-models');
const { Sequelize, DataTypes } = require('sequelize');

const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const DB = process.env.DB || 'DRR_APP';
let sequelize = new Sequelize(DB, USER, PASS, {host: 'localhost',dialect: 'mysql',});
let { English } = initModels(sequelize, DataTypes);
let Term = English;
(async () => {
    await sequelize.sync({ force: true });
    parse();
})();