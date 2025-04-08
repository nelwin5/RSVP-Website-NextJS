/*
  Warnings:

  - A unique constraint covering the columns `[subdomain]` on the table `WeddingWebsite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WeddingWebsite_subdomain_key" ON "WeddingWebsite"("subdomain");
