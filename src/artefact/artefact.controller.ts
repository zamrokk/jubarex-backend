import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArtefactService } from './artefact.service';
import { CreateArtefactDto } from './dto/create-artefact.dto';
import { UpdateArtefactDto } from './dto/update-artefact.dto';

@Controller('artefact')
export class ArtefactController {
  constructor(private readonly artefactService: ArtefactService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.artefactService.upload(file);
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
