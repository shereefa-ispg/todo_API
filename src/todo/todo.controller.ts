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
  UseInterceptors,Request, UseGuards
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { createTodoDto, updateTodoDto } from 'src/dto/create-dto.todo';
import { Todo } from './schema/schema.todo';
import { HttpExceptionFilter } from 'src/exceptionfilter/http-exception.filter';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ValidationExceptionsFilter } from 'src/exceptionfilter/validation.exception.filter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserGuard } from 'src/guards/user.guard';
import { RolePermissions, UserRole } from 'src/enum/role.enum';
import { Permissions } from 'src/decorators/permissions.decorator';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('todo/:userId')
@UseFilters(HttpExceptionFilter)
export class TodoController {
  constructor(private todoService: TodoService) {}
  
  @UseGuards(JwtAuthGuard,UserGuard)
  @Roles(UserRole.USER)
  @Permissions(RolePermissions[UserRole.USER].write)
  @Post()
  async PostTodo(@Request() req,@Body() body: createTodoDto): Promise<Todo> {
    const userId=req.user.userId;
    const todo = await this.todoService.createTodo(userId,body);
    if (!todo) throw new BadRequestException('something happened');
    return todo;
  }

  @UseGuards(JwtAuthGuard,UserGuard)
  @Roles(UserRole.USER)
  @Permissions(RolePermissions[UserRole.USER].read)
  @Get()
  @UseInterceptors(LoggingInterceptor)
  async getAllTodo(@Param('userId') userId:string): Promise<Todo[]> {
    const todo = await this.todoService.findAllTodo(userId);
    
    if (todo.length === 0) throw new NotFoundException('no records found');
    return todo;
  }

  @UseGuards(JwtAuthGuard,UserGuard)
  @Roles(UserRole.USER)
  @Permissions(RolePermissions[UserRole.USER].read)
  @Get(':todoId')
  @UseInterceptors(TransformInterceptor)
  async getTodoById(@Param('userId') userId:string,@Param('todoId') todoId: string): Promise<Todo> {
    const todo = await this.todoService.findTodoById(userId,todoId);
    if (!todo) throw new NotFoundException('id doesnot exist');
    return todo;
  }
 
  @UseGuards(JwtAuthGuard,UserGuard)
  @Roles(UserRole.USER)
  @Permissions(RolePermissions[UserRole.USER].update)
  @Patch(':todoId')
  async patchTodo(@Param('userId') userId:string,
    @Param('todoId') todoId: string,
    @Body() body: updateTodoDto,
  ): Promise<Todo> {
    const todo = await this.todoService.updateTodo(userId,todoId, body);
    if (!todo) throw new NotFoundException('this id doesnot exist');
    return todo;
  }
  @UseGuards(JwtAuthGuard,UserGuard)
  @Roles(UserRole.USER)
  @Permissions(RolePermissions[UserRole.USER].delete)
  @Delete(':todoId')
  async deleteTodo(@Param('userId') userId: string,@Param('todoId') todoId: string): Promise<Todo> {
    const todo = await this.todoService.deleteTodo(userId,todoId);
    if (!todo) throw new NotFoundException('this id doesnot exist');
    return;
  }
}
