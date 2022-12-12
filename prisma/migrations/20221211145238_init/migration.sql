-- CreateTable
CREATE TABLE "Engineer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT,
    "lastNameKana" TEXT,
    "firstNameKana" TEXT,
    "sex" INTEGER,
    "company" TEXT
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectNameMask" TEXT,
    "projectName" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endUser" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EngineerProjectHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" INTEGER,
    "engineerId" INTEGER,
    CONSTRAINT "EngineerProjectHistory_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EngineerProjectHistory_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "Engineer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
