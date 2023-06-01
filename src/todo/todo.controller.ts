import {
  Controller,
  Post,
  Body,
  ForbiddenException,
  Get,
  Patch,
  BadRequestException,
  Delete,
  NotFoundException,
  Param,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { createTodoDto, updateTodoDto } from 'src/dto/create-dto.todo';
import { Todo } from './schema/schema.todo';
import { HttpExceptionFilter } from 'src/exceptionfilter/http-exception.filter';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ValidationExceptionsFilter } from 'src/exceptionfilter/validation.exception.filter';

@Controller('todo')
@UseFilters(HttpExceptionFilter)
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  async PostTodo(@Body() body: createTodoDto): Promise<Todo> {
    const todo = await this.todoService.createTodo(body);
    if (!todo) throw new BadRequestException('something happened');
    return todo;
  }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  async getAllTodo(): Promise<Todo[]> {
    const todo = await this.todoService.findAllTodo();
    if (todo.length === 0) throw new NotFoundException('no records found');
    return todo;
  }

  @Get(':id')
  @UseInterceptors(TransformInterceptor)
  async getTodoById(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todoService.findTodoById(id);
    if (!todo) throw new NotFoundException('id doesnot exist');
    return todo;
  }

  @Patch(':id')
  async patchTodo(
    @Param('id') id: string,
    @Body() body: updateTodoDto,
  ): Promise<Todo> {
    const todo = await this.todoService.updateTodo(id, body);
    if (!todo) throw new NotFoundException('this id doesnot exist');
    return todo;
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todoService.deleteTodo(id);
    if (!todo) throw new NotFoundException('this id doesnot exist');
    return;
  }
}
