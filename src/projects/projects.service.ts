import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Project, Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async projects(): Promise<Project[]> {
    const findProject = this.prisma.project.findMany({
      include: {
        projectHistory: {
          include: {
            engineer: {
              select: {
                lastName: true,
                firstName: true,
                lastNameKana: true,
                firstNameKana: true,
                sex: true,
                company: true,
              },
            },
          },
        },
      },
    });

    return (await findProject).map((fp) => ({
      ...fp,
      projectHistory: fp.projectHistory.map((ph) => ({
        startDate: ph.startDate,
        endDate: ph.endDate,
        engineerId: ph.engineerId,
        lastName: ph.engineer.lastName,
        firstName: ph.engineer.firstName,
        lastNameKana: ph.engineer.lastNameKana,
        firstNameKana: ph.engineer.firstNameKana,
        sex: ph.engineer.sex,
        company: ph.engineer.company,
      })),
    }));
  }
}
