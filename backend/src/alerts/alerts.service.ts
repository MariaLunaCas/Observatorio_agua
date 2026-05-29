import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alert, AlertDocument } from './schema/alert.schema';
import { CreateAlertDto } from './dto/create-alert.dto';

@Injectable()
export class AlertsService {
  constructor(
    @InjectModel(Alert.name)
    private readonly alertModel: Model<AlertDocument>,
  ) {}

  create(createAlertDto: CreateAlertDto) {
    return new this.alertModel({
      ...createAlertDto,
      minUrgency: createAlertDto.minUrgency || 3,
      active: createAlertDto.active ?? true,
    }).save();
  }

  findAll() {
    return this.alertModel.find().sort({ createdAt: -1 }).exec();
  }

  update(id: string, updateAlertDto: Partial<CreateAlertDto>) {
    return this.alertModel.findByIdAndUpdate(id, updateAlertDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.alertModel.findByIdAndDelete(id).exec();
  }
}
