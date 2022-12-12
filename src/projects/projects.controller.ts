import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from '@prisma/client';


@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}
  
    @Get()
    async projects(): Promise<Project[]> {
      return this.projectsService.projects();
    }
}
