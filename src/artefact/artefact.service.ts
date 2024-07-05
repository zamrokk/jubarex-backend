import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { CreateArtefactDto } from './dto/create-artefact.dto';
import { UpdateArtefactDto } from './dto/update-artefact.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TagService } from 'src/tag/tag.service';
import { UserService } from 'src/user/user.service';
import { v4 as uuid } from 'uuid';
import { Artefact } from './entities/artefact.entity';

@Injectable()
export class ArtefactService {
  client: S3Client;

  constructor(
    @InjectModel(Artefact.name) private artefactModel: Model<Artefact>,
    private userService: UserService,
    private tagService: TagService,
  ) {
    // a client can be shared by different commands.
    this.client = new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    } as S3ClientConfig);
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const id = uuid();

    console.log('uuid', id, 'file', file);

    const input = {
      ACL: ObjectCannedACL.public_read,
      Body: file.buffer.toString('utf8'),

      Bucket: process.env.S3_BUCKET, // required
      Key: id, // required
    };
    const command = new PutObjectCommand(input);
    try {
      const response = await this.client.send(command);

      console.log('artefact uploaded to S3', response);

      return id;
    } catch (error) {
      console.error('Cannot upload to S3', error);
      throw error;
    }
  }

  async create(createArtefactDto: CreateArtefactDto) {
    const createdArtefact = new this.artefactModel(createArtefactDto);
    return createdArtefact.save();
  }

  findAll() {
    return this.artefactModel.find().populate(['createdBy', 'tags']).exec();
  }

  findOne(uuid: string) {
    return this.artefactModel
      .findOne({ _id: uuid })
      .populate(['createdBy', 'tags'])
      .exec();
  }

  async update(id: number, updateArtefactDto: UpdateArtefactDto) {
    const updatedArtefact = await this.artefactModel
      .findByIdAndUpdate(id, updateArtefactDto)
      .exec();
    return updatedArtefact;
  }

  async remove(id: number) {
    const deletedArtefact = await this.artefactModel
      .findByIdAndDelete(id)
      .exec();
    return deletedArtefact;
  }
}
