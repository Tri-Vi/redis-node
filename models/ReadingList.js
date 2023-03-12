'use strict';

module.exports = function(sequelize, DataTypes){
  var ReadingList = sequelize.define('ReadingList', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      required: false,
    }
  },{
    timestamps: false,
    tableName: 'ReadingList'
  });

  ReadingList.associate = function(models){
    ReadingList.User = ReadingList.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id'
    })

    ReadingList.Book = ReadingList.belongsTo(models.Book, {
      as: 'book',
      foreignKey: 'book_id'
    })
  }

  return ReadingList;
}
