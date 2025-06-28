-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectTag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ProjectTag" ("id", "name") SELECT "id", "name" FROM "ProjectTag";
DROP TABLE "ProjectTag";
ALTER TABLE "new_ProjectTag" RENAME TO "ProjectTag";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
