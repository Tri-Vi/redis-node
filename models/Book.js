'use strict'

module.exports = function(sequelize, DataTypes){
  var Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    }
  }, {
    tableName: 'Book',
    timestamps: false
  });

  Book.associate = function(models){
    Book.ReadingLists = Book.hasMany(models.ReadingList, {
      as: 'reading_lists',
      foreignKey: 'book_id'
    })
  }
  return Book;
}
