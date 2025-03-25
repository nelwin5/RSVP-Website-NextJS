/*
  Warnings:

  - You are about to drop the column `template` on the `weddingwebsite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `weddingwebsite` DROP COLUMN `template`,
    ADD COLUMN `templates` JSON NULL;
