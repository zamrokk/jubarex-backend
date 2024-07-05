import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtefactModule } from './artefact/artefact.module';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://zamrokk:e6GCLknDrYYFJJ7g@jubarex.pawkwhs.mongodb.net/?retryWrites=true&w=majority&appName=jubarex',
    ),
    UserModule,
    AuthModule,
    ArtefactModule,
    TagModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
