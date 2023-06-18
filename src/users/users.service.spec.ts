import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User } from './schema/schema.users';
import { getModelToken } from '@nestjs/mongoose';


import { createUserDto } from 'src/dto/create-dto.users';
import { InternalServerErrorException } from '@nestjs/common';



const CreateUserDto: createUserDto = {
  firstName: 'Shereefa',
  lastName: 'Basheer',
  email: 'shereefa123@gmail.com',
  userName: 'user',
  password: '123456',
  role: 'objectid98756',
};
const mockUserModel = {
  find: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockReturnThis(),
  findById: jest.fn().mockReturnThis(),
  findByIdAndUpdate: jest.fn(),
  create: jest.fn(),
  findByIdAndDelete: jest.fn(),


}
const userId = 'mockUserId';
const user: any = {
  id: userId,
  ...CreateUserDto,
};
const users: unknown = [
  { id: 'mockUserId1', ...CreateUserDto,userName:'Naiba' },
  { id: 'mockUserId2', ...CreateUserDto }];



describe('UsersService', () => {
  let userService: UsersService;
  let userModel: Model<User>


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getModelToken(User.name),

        useValue: mockUserModel

      }],
    }).compile();

    userService = await module.get<UsersService>(UsersService);
    userModel = await module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  describe('createUser', () => {
    it('should throw error if username already exists', async () => {
      const mockfindOneUser = jest.fn().mockResolvedValue(user);
      jest.spyOn(userService, 'findOneUser').mockImplementation(mockfindOneUser);
      await expect(userService.createUser(CreateUserDto)).rejects.toThrowError(new InternalServerErrorException("user already exists"))
      expect(userModel.create).not.toHaveBeenCalled();
    }),
      it('should save a user in the database with hashed password', async () => {
        const mockedHashedPassword = jest.fn().mockResolvedValue('hashedPassword')

        jest.spyOn(userModel, 'findOne').mockResolvedValue(null);
        jest.spyOn(userModel, 'create').mockResolvedValue([user]);
        jest.spyOn(userService, 'hashPassword').mockImplementation(mockedHashedPassword);
        const result = await userService.createUser(CreateUserDto);
        expect(userModel.findOne).toHaveBeenCalledWith({ userName: CreateUserDto.userName });
        expect(userModel.create).toHaveBeenCalledWith({ ...CreateUserDto, password: 'hashedPassword' });
        expect(result).toEqual([user]);
      });
  })

  describe('findAll', () => {
    it('should return all users', async () => {

      const mockFind = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(users as User[]) })
      jest.spyOn(userModel, 'find').mockImplementation(mockFind);
      const result = await userService.findAll();
      expect(userModel.find).toHaveBeenCalled();
      expect(result).toEqual(users)

    })
  })
  describe('findOneUser', () => {
    it('should return one user by username', async () => {

      jest.spyOn(userModel, 'findOne').mockResolvedValue(user);
      const result = await userService.findOneUser(CreateUserDto.userName);
      expect(userModel.findOne).toHaveBeenCalledWith({ userName: CreateUserDto.userName })
      expect(result).toEqual(user);
    })
  })
  describe('findUserById', () => {
    it('should return a user by id', async () => {
      const mockFindByid = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(user) });
      jest.spyOn(userModel, 'findById').mockImplementation(mockFindByid);
      const result = await userService.findUserById(userId);
      expect(userModel.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    })
  })
  describe('updateUser', () => {
    it('should throw error if username already exists', async () => {

      const updateDto: Partial<createUserDto> = {
        firstName: 'Lubaba',
        lastName: 'Basheer',
        email: 'shereefa123@gmail.com',
        userName: 'Naiba',
        password: '123456',
        role: 'objectid98756',
  
      }
      const mockfindOneUser = jest.fn().mockResolvedValue(users[0]);
      jest.spyOn(userService, 'findOneUser').mockImplementation(mockfindOneUser);
      await expect(userService.updateUser(userId,updateDto)).rejects.toThrowError(InternalServerErrorException);
      expect(userModel.findByIdAndUpdate).not.toHaveBeenCalled();
      })
    
    
    it('should update an existing user with updated hashed password', async () => {
      const updateUserDto: Partial<createUserDto> = {
        firstName: 'Lubaba',
        lastName: 'Basheer',
        email: 'shereefa123@gmail.com',
        userName: 'user2',
        password: '789',
        role: 'objectid98756',
  
      }
      const updateUser: any = {
        id: userId,
        ...CreateUserDto,
        ...updateUserDto,
        password: 'hashedPassword',
  
      }
      const mockFindByid = jest.spyOn(userService, 'findUserById').mockResolvedValue(user);
      const mockFindOne = jest.spyOn(userService, 'findOneUser').mockResolvedValue(null);
      const mockedHashedPassword = jest.fn().mockResolvedValue('hashedPassword')
      jest.spyOn(userService, 'hashPassword').mockImplementation(mockedHashedPassword);

      const mockUpdate = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(updateUser) });
      jest.spyOn(userModel, 'findByIdAndUpdate').mockImplementation(mockUpdate);
      const result = await userService.updateUser(userId, updateUserDto);
      //expect(userService.findUserById).toHaveBeenCalledWith(userId);
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(userId, updateUserDto, { new: true });
      expect(result).toEqual(updateUser);
      mockUpdate.mockClear();
    })
      
  })
  describe('deleteUserById',()=>{
    it('should delete a user',async ()=>{
      jest.spyOn(userModel,'findByIdAndDelete').mockResolvedValue(undefined);
      const result=await userService.deleteUserById(userId);
      expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(userId);
      expect(result).toEqual(undefined);


      

    })
  })

})