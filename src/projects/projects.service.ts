import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EngineerProjectHistory, Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async projects(): Promise<EngineerProjectHistory[]> {
    return this.prisma.engineerProjectHistory.findMany({
      include: {
        project: true,
        engineer: true,
      },
    });
  }
}
