/*
  Warnings:

  - You are about to drop the column `templates` on the `weddingwebsite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `weddingwebsite` DROP COLUMN `templates`,
    ADD COLUMN `template` INTEGER NULL;
