-- CreateTable
CREATE TABLE "OvocieAZeleniny" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "isForSale" BOOLEAN NOT NULL,
    "aisleName" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "superDepartmentName" TEXT NOT NULL,

    CONSTRAINT "OvocieAZeleniny_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grilovanie" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "isForSale" BOOLEAN NOT NULL,
    "aisleName" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "superDepartmentName" TEXT NOT NULL,

    CONSTRAINT "Grilovanie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pecivo" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "isForSale" BOOLEAN NOT NULL,
    "aisleName" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "superDepartmentName" TEXT NOT NULL,

    CONSTRAINT "Pecivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasoRybyALahodky" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "isForSale" BOOLEAN NOT NULL,
    "aisleName" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "superDepartmentName" TEXT NOT NULL,

    CONSTRAINT "MasoRybyALahodky_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MliecneVyrobkyAVajcia" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "isForSale" BOOLEAN NOT NULL,
    "aisleName" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "superDepartmentName" TEXT NOT NULL,

    CONSTRAINT "MliecneVyrobkyAVajcia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrvanlivePotraviny" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "isForSale" BOOLEAN NOT NULL,
    "aisleName" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "superDepartmentName" TEXT NOT NULL,

    CONSTRAINT "TrvanlivePotraviny_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialnaAZdravaVyziva" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "isForSale" BOOLEAN NOT NULL,
    "aisleName" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "superDepartmentName" TEXT NOT NULL,

    CONSTRAINT "SpecialnaAZdravaVyziva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MrazenePotraviny" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "isForSale" BOOLEAN NOT NULL,
    "aisleName" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "superDepartmentName" TEXT NOT NULL,

    CONSTRAINT "MrazenePotraviny_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Napoje" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "isForSale" BOOLEAN NOT NULL,
    "aisleName" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "superDepartmentName" TEXT NOT NULL,

    CONSTRAINT "Napoje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alkohol" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "isForSale" BOOLEAN NOT NULL,
    "aisleName" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "superDepartmentName" TEXT NOT NULL,

    CONSTRAINT "Alkohol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" SERIAL NOT NULL,
    "promotionId" TEXT NOT NULL,
    "promotionType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "offerText" TEXT NOT NULL,
    "attributes" TEXT[],
    "ovocieAZeleninyId" INTEGER,
    "grilovanieId" INTEGER,
    "mliecneVyrobkyAVajciaId" INTEGER,
    "pecivoId" INTEGER,
    "masoRybyALahodkyId" INTEGER,
    "trvanlivePotravinyId" INTEGER,
    "specialnaAZdravaVyzivaId" INTEGER,
    "mrazenePotravinyId" INTEGER,
    "napojeId" INTEGER,
    "alkoholId" INTEGER,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OvocieAZeleniny_productId_lastUpdated_key" ON "OvocieAZeleniny"("productId", "lastUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "Grilovanie_productId_lastUpdated_key" ON "Grilovanie"("productId", "lastUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "Pecivo_productId_lastUpdated_key" ON "Pecivo"("productId", "lastUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "MasoRybyALahodky_productId_lastUpdated_key" ON "MasoRybyALahodky"("productId", "lastUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "MliecneVyrobkyAVajcia_productId_lastUpdated_key" ON "MliecneVyrobkyAVajcia"("productId", "lastUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "TrvanlivePotraviny_productId_lastUpdated_key" ON "TrvanlivePotraviny"("productId", "lastUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "SpecialnaAZdravaVyziva_productId_lastUpdated_key" ON "SpecialnaAZdravaVyziva"("productId", "lastUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "MrazenePotraviny_productId_lastUpdated_key" ON "MrazenePotraviny"("productId", "lastUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "Napoje_productId_lastUpdated_key" ON "Napoje"("productId", "lastUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "Alkohol_productId_lastUpdated_key" ON "Alkohol"("productId", "lastUpdated");

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_ovocieAZeleninyId_fkey" FOREIGN KEY ("ovocieAZeleninyId") REFERENCES "OvocieAZeleniny"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_grilovanieId_fkey" FOREIGN KEY ("grilovanieId") REFERENCES "Grilovanie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_mliecneVyrobkyAVajciaId_fkey" FOREIGN KEY ("mliecneVyrobkyAVajciaId") REFERENCES "MliecneVyrobkyAVajcia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_pecivoId_fkey" FOREIGN KEY ("pecivoId") REFERENCES "Pecivo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_masoRybyALahodkyId_fkey" FOREIGN KEY ("masoRybyALahodkyId") REFERENCES "MasoRybyALahodky"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_trvanlivePotravinyId_fkey" FOREIGN KEY ("trvanlivePotravinyId") REFERENCES "TrvanlivePotraviny"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_specialnaAZdravaVyzivaId_fkey" FOREIGN KEY ("specialnaAZdravaVyzivaId") REFERENCES "SpecialnaAZdravaVyziva"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_mrazenePotravinyId_fkey" FOREIGN KEY ("mrazenePotravinyId") REFERENCES "MrazenePotraviny"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_napojeId_fkey" FOREIGN KEY ("napojeId") REFERENCES "Napoje"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_alkoholId_fkey" FOREIGN KEY ("alkoholId") REFERENCES "Alkohol"("id") ON DELETE SET NULL ON UPDATE CASCADE;
