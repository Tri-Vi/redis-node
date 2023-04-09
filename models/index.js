'use strict'
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const logger = require(__basedir + '/util/logging.js');

var db = {}
const sequelize = new Sequelize(
  process.env.DATABASE_SCHEMA,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    logging: (str)=> {
      logger.info(str)
    },
    pool: {
      max: Number(process.env.DATABASE_POOL_MAX),
      min: Number(process.env.DATABASE_POOL_MIN),
      acquire: Number(process.env.DATABASE_POOL_ACQUIRE),
      idle: Number(process.env.DATABASE_POOL_IDLE)
    }
  } 
)

// Loop through the files in this directory and import them
fs.readdirSync(__dirname)
  .filter(file => {
    return (file != 'index.js') && (file.slice(-3) === '.js')
  }).forEach(file =>{
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model
  });

Object.keys(db).forEach(modelName => {
  if(db[modelName].associate){
    db[modelName].associate(db);
  }
});

sequelize.sync();
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;