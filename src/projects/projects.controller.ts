import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { EngineerProjectHistory } from '@prisma/client';


@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}
  
    @Get()
    async projects(): Promise<EngineerProjectHistory[]> {
      return this.projectsService.projects();
    }
}
