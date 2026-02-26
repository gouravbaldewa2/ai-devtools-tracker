-- CreateEnum
CREATE TYPE "Product" AS ENUM ('ANTIGRAVITY', 'CURSOR', 'WARP', 'CLAUDE_CODE');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FEATURE', 'BUGFIX', 'IMPROVEMENT', 'RELEASE', 'ANNOUNCEMENT');

-- CreateTable
CREATE TABLE "updates" (
    "id" TEXT NOT NULL,
    "product" "Product" NOT NULL,
    "title" TEXT NOT NULL,
    "announcement_date" TIMESTAMP(3) NOT NULL,
    "key_highlights" TEXT[],
    "version" TEXT,
    "changelog_url" TEXT NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'FEATURE',
    "scraped_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "raw_content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "updates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "updates_product_idx" ON "updates"("product");

-- CreateIndex
CREATE INDEX "updates_announcement_date_idx" ON "updates"("announcement_date");

-- CreateIndex
CREATE INDEX "updates_product_announcement_date_idx" ON "updates"("product", "announcement_date");
