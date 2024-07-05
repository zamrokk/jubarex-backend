import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';

export type ArtefactDocument = HydratedDocument<Artefact>;

@Schema()
export class Artefact {
  @Prop()
  title: string;

  @Prop()
  height?: number;

  @Prop()
  width?: number;

  @Prop()
  depth?: number;

  @Prop()
  year?: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }],
  })
  tags?: Tag[];

  @Prop()
  fileUrl: string;

  @Prop()
  owner: string; // userId for entity links or plain text for unregistered users

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  createdBy: User;

  @Prop()
  creationLongitude?: number;

  @Prop()
  creationLatitude?: number;

  @Prop()
  currentLongitude?: number;

  @Prop()
  currentLatitude?: number;
}

export const ArtefactSchema = SchemaFactory.createForClass(Artefact);
