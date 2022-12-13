import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

// モデル投入用のデータ定義
const userData: Prisma.EngineerUncheckedCreateInput[] = [
  {
    id: 1,
    lastName: '山田',
    firstName: '太郎',
    lastNameKana: 'ヤマダ',
    firstNameKana: 'タロウ',
    sex: 0,
    company: '',
  },
  {
    id: 2,
    lastName: '田中',
    firstName: '次郎',
    lastNameKana: 'タナカ',
    firstNameKana: 'ジロウ',
    sex: 0,
    company: '',
  },
];

const projectData: Prisma.ProjectUncheckedCreateInput[] = [
  {
    id: 1,
    projectNameMask: 'Y案件',
    projectName: '山田商店自動決済プロジェクト',
    startDate: new Date(2017, 8, 24),
    endDate: null,
    endUser: '山田商店',
  },
];

const projectHistoryData: Prisma.EngineerProjectHistoryUncheckedCreateInput[] =
  [
    {
      startDate: new Date(2017, 8, 24),
      endDate: null,
      sales: 100,
      cost: 50,
      projectId: 1,
      engineerId: 1,
    },
    {
      startDate: new Date(2017, 8, 24),
      endDate: null,
      sales: 100,
      cost: 50,
      projectId: 1,
      engineerId: 2,
    },
  ];

const transferUser = async () => {
  const users = [];
  for (const u of userData) {
    const user = prisma.engineer.create({
      data: u,
    });
    users.push(user);
  }
  return await prisma.$transaction(users);
};

const transferProject = async () => {
  const users = [];
  for (const u of projectData) {
    const user = prisma.project.create({
      data: u,
    });
    users.push(user);
  }
  return await prisma.$transaction(users);
};

const transferProjectHistory = async () => {
  const users = [];
  for (const u of projectHistoryData) {
    const user = prisma.engineerProjectHistory.create({
      data: u,
    });
    users.push(user);
  }
  return await prisma.$transaction(users);
};

// 定義されたデータを実際のモデルへ登録する処理
const main = async () => {
  console.log(`Start seeding ...`);

  await transferUser();
  await transferProject();
  await transferProjectHistory();

  console.log(`Seeding finished.`);
};

// 処理開始
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
