/*
  Warnings:

  - Added the required column `created_by` to the `learning_journal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `learning_journal` ADD COLUMN `created_by` VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `learning_journal` ADD CONSTRAINT `learning_journal_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
