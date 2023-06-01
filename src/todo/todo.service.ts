import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schema/schema.todo';
import { createTodoDto, updateTodoDto } from 'src/dto/create-dto.todo';
import { error } from 'console';
import { access } from 'fs/promises';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private TodoModel: Model<Todo>) {}

  async createTodo(body: createTodoDto): Promise<Todo> {
    const todo = await new this.TodoModel(body);
    return todo.save();
  }

  async findAllTodo(): Promise<Todo[]> {
    const todos = await this.TodoModel.find().exec();
    return todos;
  }

  async findTodoById(id: string): Promise<Todo> {
    const todo = this.TodoModel.findById(id).exec();
    return todo;
  }

  async updateTodo(id: string, updatedTodo: updateTodoDto): Promise<Todo> {
    const todo = await this.TodoModel.findByIdAndUpdate(id, updatedTodo, {
      new: true,
    }).exec();
    return todo;
  }

  async deleteTodo(id: string): Promise<Todo> {
    const todo = await this.TodoModel.findByIdAndDelete(id);
    return todo;
  }
}
