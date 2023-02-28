'use strict'
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

var db = {}
const sequelize = new Sequelize(
  process.env.DATABASE_SCHEMA,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    logging: console.log,
    pool: {
      max: Number(process.env.DATABASE_POOL_MAX),
      min: Number(process.env.DATABSE_POOL_MIN),
      acquire: Number(process.env.DATABASE_POOL_ACQUIRE),
      idle: Number(process.env.DATABASE_POOL_IDLE)
    },
    timezone: 'America/Chicago'
  } 
)

// Loop through the files in this directory and import them
fs.readFileSync(__dirname)
  .filter(file => {
    return (file != 'index.js') && (file.slice(-3) === '.js')
  }).forEach(file =>{
    var model = sequelize['import'](path.join(__dirname, file));
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