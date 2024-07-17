import {
  GetObjectCommand,
  GetObjectCommandInput,
  ObjectCannedACL,
  PutObjectCommand,
  PutObjectRequest,
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
import { Readable } from 'stream';
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
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    } as S3ClientConfig);
  }

  async upload(file: Express.Multer.File): Promise<string> {
    console.log('file', file);
    const id = uuid() + '.' + file.originalname.split('.').pop();

    console.log('uuid', id, 'file', file, 'mime', file.mimetype);

    const input: PutObjectRequest = {
      ACL: ObjectCannedACL.public_read,
      Body: Readable.from(file.buffer),
      ContentType: file.mimetype,
      ContentLength: file.buffer.length,
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

  async getFile(uuid: string): Promise<Uint8Array> {
    const input: GetObjectCommandInput = {
      Bucket: process.env.S3_BUCKET, // required
      Key: uuid, // required
    };
    const command = new GetObjectCommand(input);
    try {
      const response = await this.client.send(command);

      console.log('artefact downloaded from S3', response);

      return await response.Body.transformToByteArray();
    } catch (error) {
      console.error('Cannot download from S3', error);
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
