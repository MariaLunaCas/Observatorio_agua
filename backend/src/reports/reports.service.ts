import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Report, ReportSchema } from './schema/reports.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportSchema>
  ) {}
  async create(createReportDto: CreateReportDto) {
    const createdReport = new this.reportModel(createReportDto);
    return createdReport.save();
  }

  async findAll() {
    return this.reportModel.find().exec();
  }

  async findOne(id: string) {
    return this.reportModel.findById(id).exec();
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    return this.reportModel.findByIdAndUpdate(id, updateReportDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.reportModel.findByIdAndDelete(id).exec();
  }
}
