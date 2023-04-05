const Sequelize=require("sequelize");
const dbConfig=require('../config/dbConfig.js');
const sequelize=new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,{
  dialect:dbConfig.dialect,
  host:dbConfig.HOST,
  operationAlias:false,
  pool:{
    max:dbConfig.pool.max,
    min:dbConfig.pool.min,
    acquire:dbConfig.pool.acquire,
    idle:dbConfig.pool.idle
 }
});
module.exports=sequelize;