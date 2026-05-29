import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return new this.commentModel({
      ...createCommentDto,
      authorEmail: createCommentDto.authorEmail.trim().toLowerCase(),
      status: createCommentDto.status || 'visible',
    }).save();
  }

  findAll(reportId?: string) {
    const query = reportId ? { reportId } : {};
    return this.commentModel.find(query).sort({ createdAt: -1 }).exec();
  }

  updateStatus(id: string, status: string) {
    return this.commentModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.commentModel.findByIdAndDelete(id).exec();
  }
}
