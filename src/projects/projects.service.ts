import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Project, Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async users(): Promise<Project[]> {
    return this.prisma.project.findMany({
      include: {
        projectHistory: true,
      },
    });
  }
}
