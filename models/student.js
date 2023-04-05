const Sequelize = require('sequelize');
const sequelize = require('../util/database.js');

const Student=sequelize.define("students",{
    rollno:{
      type:Sequelize.STRING,
      autoIncrement:false,
      allowNull:false,
      primaryKey:true
      },
      name:{
        type:Sequelize.STRING,
        autoIncrement:false,
        allowNull:false,
        primaryKey:false
        },
      dob:{
          type:Sequelize.STRING,
          autoIncrement:false,
          allowNull:false,
          primaryKey:false
          },
      score:{
            type:Sequelize.STRING,
            autoIncrement:false,
            allowNull:false,
            primaryKey:false
            }  
    },{timestamps:false});
module.exports=Student;