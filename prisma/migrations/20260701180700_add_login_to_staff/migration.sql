/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `staff` ADD COLUMN `password` VARCHAR(8) NOT NULL,
    ADD COLUMN `username` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Staff_username_key` ON `Staff`(`username`);
