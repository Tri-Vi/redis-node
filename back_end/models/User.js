'use strict'

module.exports = function(sequelize, DataTypes){
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    }
  },{
    tableName: 'User',
    timestamps: false
  });

  User.associate = function(models){
    User.ReadingLists = User.hasMany(models.ReadingList, {
      as: 'reading_lists',
      foreignKey: 'user_id'
    })
  }
  return User;
}
