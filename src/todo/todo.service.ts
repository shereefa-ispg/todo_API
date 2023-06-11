import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schema/schema.todo';
import { createTodoDto, updateTodoDto } from 'src/dto/create-dto.todo';
import { error } from 'console';
import { access } from 'fs/promises';
import { UsersService } from 'src/users/users.service';
import { Types } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private TodoModel: Model<Todo>,
  private userService:UsersService) {}

  async createTodo(userId:string,body: createTodoDto): Promise<Todo> {
    
    const todo = await new this.TodoModel({userId:userId,...body});
    await todo.save();
    
    const user=await this.userService.findUserById(userId);
    user.todo=[...user.todo,todo._id];
    await user.save();
    return todo;
}

  async findAllTodo(userId:string): Promise<Todo[]> {
    const todos = await this.TodoModel.find().exec();
    const userTodos=todos.filter(todo=>todo.userId===userId)
    return userTodos;
  }

  async findTodoById(userId:string,todoId: string): Promise<Todo> {
    const todo = this.TodoModel.findById(todoId).exec();
    if((await todo).userId===userId){
      return todo;
    }
  }

  async updateTodo(userId:string,todoId: string, updatedTodo: updateTodoDto): Promise<Todo> {
    const todo = await this.TodoModel.findByIdAndUpdate(todoId, updatedTodo, {
      new: true,
    }).exec();
    if(todo.userId===userId){
      return todo;
    }
  }

  async deleteTodo(userId: string,todoId:string): Promise<Todo> {
    const todo = await this.TodoModel.findByIdAndDelete(todoId);
    if(todo.userId===userId){
      const user=await this.userService.findUserById(userId);
      const userTodoId=new Types.ObjectId(todoId); 
      user.todo=user.todo.filter(todoId=>todoId!==userTodoId);
      await user.save();
    }
    return todo;
  }
}
