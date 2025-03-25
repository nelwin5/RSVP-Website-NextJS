-- DropForeignKey
ALTER TABLE `weddingwebsite` DROP FOREIGN KEY `WeddingWebsite_plannerId_fkey`;

-- DropIndex
DROP INDEX `WeddingWebsite_plannerId_key` ON `weddingwebsite`;

-- AddForeignKey
ALTER TABLE `WeddingWebsite` ADD CONSTRAINT `WeddingWebsite_plannerId_fkey` FOREIGN KEY (`plannerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
