import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagModule } from 'src/tag/tag.module';
import { UserModule } from 'src/user/user.module';
import { ArtefactController } from './artefact.controller';
import { ArtefactService } from './artefact.service';
import { Artefact, ArtefactSchema } from './entities/artefact.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Artefact.name, schema: ArtefactSchema },
    ]),
    UserModule,
    TagModule,
  ],

  controllers: [ArtefactController],
  providers: [ArtefactService],
})
export class ArtefactModule {}
