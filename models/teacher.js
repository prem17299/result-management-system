const Sequelize = require('sequelize');
const sequelize = require('../util/database.js');
  const Teacher=sequelize.define("teachers",{
    email:{
    type:Sequelize.STRING,
    autoIncrement:false,
    allowNull:false,
    primaryKey:true
    },
    password:{
      type:Sequelize.STRING,
      autoIncrement:false,
      allowNull:false,
      primaryKey:false
      }
    
  },{timestamps:false});
  module.exports=Teacher;