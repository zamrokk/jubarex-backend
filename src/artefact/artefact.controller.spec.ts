import { Test, TestingModule } from '@nestjs/testing';
import { ArtefactController } from './artefact.controller';
import { ArtefactService } from './artefact.service';

describe('ArtefactController', () => {
  let controller: ArtefactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtefactController],
      providers: [ArtefactService],
    }).compile();

    controller = module.get<ArtefactController>(ArtefactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
