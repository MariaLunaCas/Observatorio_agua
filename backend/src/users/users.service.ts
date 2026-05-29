import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const requestedRole = createUserDto.requestedRole || createUserDto.role || 'user';
    const isAdminRequest = requestedRole === 'admin';

    const createdUser = new this.userModel({
      ...createUserDto,
      email: createUserDto.email.trim().toLowerCase(),
      password: hash,
      role: isAdminRequest ? 'user' : requestedRole,
      requestedRole,
      status: isAdminRequest ? 'pending' : 'active',
    });

    return createdUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.trim().toLowerCase() }).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument | null> {
    const update: Record<string, unknown> = { ...updateUserDto };

    if (updateUserDto.email) {
      update.email = updateUserDto.email.trim().toLowerCase();
    }

    return this.userModel
      .findByIdAndUpdate(id, update, {
        returnDocument: 'after',
      })
      .exec();
  }

  async approveAdminRequest(
    id: string,
    validatorEmail: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        id,
        {
          role: 'admin',
          requestedRole: 'admin',
          status: 'active',
          approvedBy: validatorEmail.trim().toLowerCase(),
          approvedAt: new Date(),
        },
        { returnDocument: 'after' },
      )
      .exec();
  }

  async rejectAdminRequest(id: string): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        id,
        {
          role: 'user',
          requestedRole: 'user',
          status: 'rejected',
        },
        { returnDocument: 'after' },
      )
      .exec();
  }

  async remove(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async countAdmins(): Promise<number> {
    return this.userModel.countDocuments({ role: 'admin' }).exec();
  }

  async promoteToFirstAdmin(
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const normalizedEmail = email.trim().toLowerCase();
    const hash = await bcrypt.hash(password, 10);

    const createdUser = new this.userModel({
      name: 'Admin Validator',
      email: normalizedEmail,
      username: normalizedEmail.split('@')[0],
      password: hash,
      role: 'admin',
      requestedRole: 'admin',
      status: 'active',
      approvedBy: 'system',
      approvedAt: new Date(),
    });

    return createdUser.save();
  }
}
