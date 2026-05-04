import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './schema/user.schema';

//define las operaciones de CRUD

@Injectable()
export class UsersService {

  constructor (
    @InjectModel(User.name) private userModel: Model<UserDocument> 
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({ ...createUserDto, password: hash, role: createUserDto.role || 'user'});
    return createdUser.save(); 
  }

  async findByEmail(email: string) {
  return this.userModel.findOne({ email });
  }

  async findAll() {
  return this.userModel.find().exec();
  }

  async findOne(id: string) {
  return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
  return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: string) {
  return this.userModel.findByIdAndDelete(id).exec();
  }
}
