import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  create(tag: Tag) {
    const createdTag = new this.tagModel(tag);
    return createdTag.save();
  }

  findAll() {
    return this.tagModel.find().exec();
  }

  findOne(name: string) {
    return this.tagModel.findOne({ name }).exec();
  }

  async findById(tagId: string): Promise<Tag> {
    return this.tagModel.findById(tagId).exec();
  }

  async update(id: number, tag: Tag) {
    const updatedTag = await this.tagModel.findByIdAndUpdate(id, tag).exec();
    return updatedTag;
  }

  async remove(id: number) {
    const deletedTag = await this.tagModel.findByIdAndDelete(id).exec();
    return deletedTag;
  }
}
