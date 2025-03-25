-- AlterTable
ALTER TABLE `weddingwebsite` ADD COLUMN `coupleName` VARCHAR(191) NULL,
    ADD COLUMN `eventDate` DATETIME(3) NULL,
    ADD COLUMN `gallery` JSON NULL,
    ADD COLUMN `guestList` JSON NULL;
