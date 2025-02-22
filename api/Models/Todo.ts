// In types/todo.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public dueDate!: string;
  public completed!: boolean;
  public categoryId!: number;
  public createdAt!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Passing the `sequelize` instance is required
    modelName: 'Todo', // Model name
    tableName: 'todos', // Table name in the database
  }
);

export default Todo;
