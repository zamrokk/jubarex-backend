import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArtefactService } from './artefact.service';
import { CreateArtefactDto } from './dto/create-artefact.dto';
import { UpdateArtefactDto } from './dto/update-artefact.dto';
import { Artefact } from './entities/artefact.entity';

@Controller('artefact')
export class ArtefactController {
  constructor(private readonly artefactService: ArtefactService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.artefactService.upload(file);
  }

  @Get(':id/file')
  async getFile(@Param('id') uuid: string): Promise<StreamableFile> {
    const artefact : Artefact= await this.artefactService.findOne(uuid);
    const buffer8intarray = await this.artefactService.getFile(artefact.fileUrl);
    return new StreamableFile(buffer8intarray);
  }

  @Post()
  create(@Body() createArtefactDto: CreateArtefactDto) {
    return this.artefactService.create(createArtefactDto);
  }

  @Get()
  findAll() {
    return this.artefactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') uuid: string) {
    return this.artefactService.findOne(uuid);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtefactDto: UpdateArtefactDto,
  ) {
    return this.artefactService.update(+id, updateArtefactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artefactService.remove(+id);
  }
}
