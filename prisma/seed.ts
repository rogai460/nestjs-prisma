import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

new Date(1960, 8, 24);

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
];

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
];

// model Project {
//   id              Int                      @id @default(autoincrement())
//   projectNameMask String?
//   projectName     String
//   startDate       DateTime
//   endDate         DateTime
//   createdAt       DateTime                 @default(now())
//   updateAt        DateTime                 @default(now())
//   endUser         String
//   projectHistory  EngineerProjectHistory[]
// }

// model EngineerProjectHistory {
//   id         Int       @id @default(autoincrement())
//   title      String
//   startDate  DateTime
//   endDate    DateTime
//   createdAt  DateTime  @default(now())
//   updateAt   DateTime  @default(now())
//   project    Project?  @relation(fields: [projectId], references: [id])
//   projectId  Int?
//   engineer   Engineer? @relation(fields: [engineerId], references: [id])
//   engineerId Int?
// }

const transfer = async () => {
  const users = [];
  for (const u of userData) {
    const user = prisma.engineer.create({
      data: u,
    });
    users.push(user);
  }
  return await prisma.$transaction(users);
};

// 定義されたデータを実際のモデルへ登録する処理
const main = async () => {
  console.log(`Start seeding ...`);

  await transfer();

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
