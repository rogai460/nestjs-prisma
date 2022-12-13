/*
  Warnings:

  - Added the required column `cost` to the `EngineerProjectHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales` to the `EngineerProjectHistory` table without a default value. This is not possible if the table is not empty.
  - Made the column `engineerId` on table `EngineerProjectHistory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectId` on table `EngineerProjectHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EngineerProjectHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "sales" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" INTEGER NOT NULL,
    "engineerId" INTEGER NOT NULL,
    CONSTRAINT "EngineerProjectHistory_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EngineerProjectHistory_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "Engineer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EngineerProjectHistory" ("createdAt", "endDate", "engineerId", "id", "projectId", "startDate", "updateAt") SELECT "createdAt", "endDate", "engineerId", "id", "projectId", "startDate", "updateAt" FROM "EngineerProjectHistory";
DROP TABLE "EngineerProjectHistory";
ALTER TABLE "new_EngineerProjectHistory" RENAME TO "EngineerProjectHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
