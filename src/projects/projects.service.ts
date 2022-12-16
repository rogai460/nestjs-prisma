import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Project, Prisma } from '@prisma/client';

export interface ProjectResponse {
  projectId: number;
  projectNameMask: string;
  projectName: string;
  startDate: Date;
  endDate: Date | null;
  endUser: string;
  projectHistory: ProjectHistoryResponse[];
}

export interface ProjectHistoryResponse {
  startDate: Date;
  endDate: Date | null;
  engineerId: number;
  sales: number;
  cost: number;
  profit: number;
  profitRate: number;
  fullName: string;
  fullNameKana: string | null;
  sex: string | null;
  company: string | null;
}

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async projects(): Promise<ProjectResponse[]> {
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
      projectId: fp.id,
      projectNameMask: fp.projectNameMask,
      projectName: fp.projectName,
      startDate: fp.startDate,
      endDate: fp.endDate,
      endUser: fp.endUser,
      projectHistory: fp.projectHistory.map((ph) => ({
        startDate: ph.startDate,
        endDate: ph.endDate,
        sales: ph.sales,
        cost: ph.cost,
        profit: ph.sales - ph.cost,
        profitRate: (ph.sales - ph.cost) / ph.sales,
        engineerId: ph.engineerId,
        fullName: `${ph.engineer.lastName} ${ph.engineer.firstName}`,
        fullNameKana: `${ph.engineer.lastNameKana} ${ph.engineer.firstNameKana}`,
        sex: ph.engineer.sex == 0 ? '男' : '女',
        company: ph.engineer.company,
      })),
    }));
  }
}
