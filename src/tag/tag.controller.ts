import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Tag } from './entities/tag.entity';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() tag: Tag) {
    return this.tagService.create(tag);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.tagService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() tag: Tag) {
    return this.tagService.update(+id, tag);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
