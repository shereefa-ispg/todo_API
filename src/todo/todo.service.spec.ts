import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { UsersService } from 'src/users/users.service';
import { Model } from 'mongoose';
import { Todo } from './schema/schema.todo';

describe('TodoService', () => {
  let todoService: TodoService;
  let userService:UsersService;
  let todoModel:Model<Todo>; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService,UsersService],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
  });
});
