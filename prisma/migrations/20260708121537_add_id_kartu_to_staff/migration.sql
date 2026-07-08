/*
  Warnings:

  - A unique constraint covering the columns `[id_kartu]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_id_staff_fkey`;

-- DropIndex
DROP INDEX `Transaction_id_staff_fkey` ON `transaction`;

-- AlterTable
ALTER TABLE `staff` ADD COLUMN `id_kartu` VARCHAR(100) NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `id_staff` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Staff_id_kartu_key` ON `Staff`(`id_kartu`);
