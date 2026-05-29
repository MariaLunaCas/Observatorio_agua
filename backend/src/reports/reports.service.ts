import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Report, ReportSchema } from './schema/reports.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportSchema>,
  ) {}
  async create(createReportDto: CreateReportDto) {
    const createdReport = new this.reportModel({
      ...createReportDto,
      imageUrl: createReportDto.imageUrl || createReportDto.imageUrls?.[0] || '',
      imageUrls: createReportDto.imageUrls || (createReportDto.imageUrl ? [createReportDto.imageUrl] : []),
      status: createReportDto.status || 'pending',
      urgency: createReportDto.urgency || 1,
    });
    return createdReport.save();
  }

  async findAll(filters: {
    contaminationType?: string;
    location?: string;
    status?: string;
    createdBy?: string;
  } = {}) {
    const query: Record<string, unknown> = {};

    if (filters.contaminationType) {
      query.contaminationType = { $regex: filters.contaminationType, $options: 'i' };
    }

    if (filters.location) {
      query.address = { $regex: filters.location, $options: 'i' };
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.createdBy) {
      query.createdBy = filters.createdBy.trim().toLowerCase();
    }

    return this.reportModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    return this.reportModel.findById(id).exec();
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    return this.reportModel
      .findByIdAndUpdate(id, updateReportDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.reportModel.findByIdAndDelete(id).exec();
  }

  async stats() {
    const [total, pending, validated, usersAgg, byType] = await Promise.all([
      this.reportModel.countDocuments().exec(),
      this.reportModel.countDocuments({ status: 'pending' }).exec(),
      this.reportModel.countDocuments({ status: 'validated' }).exec(),
      this.reportModel.distinct('createdBy').exec(),
      this.reportModel.aggregate([
        { $group: { _id: '$contaminationType', total: { $sum: 1 } } },
        { $sort: { total: -1 } },
      ]),
    ]);

    return {
      total,
      pending,
      validated,
      citizens: usersAgg.filter(Boolean).length,
      validationRate: total ? Math.round((validated / total) * 100) : 0,
      byType,
    };
  }
}
