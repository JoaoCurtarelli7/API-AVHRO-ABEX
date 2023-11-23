-- CreateTable
CREATE TABLE "Doador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "cpf" TEXT,
    "dataCadastro" DATETIME
);

-- CreateTable
CREATE TABLE "Donatario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "cpf" TEXT,
    "dataCadastro" DATETIME
);

-- CreateTable
CREATE TABLE "Familia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "numeroIntegrantes" INTEGER,
    "dataCadastro" DATETIME,
    "bairro" TEXT
);

-- CreateTable
CREATE TABLE "DoacaoEntregue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "donatarioId" INTEGER NOT NULL,
    CONSTRAINT "DoacaoEntregue_donatarioId_fkey" FOREIGN KEY ("donatarioId") REFERENCES "Donatario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DoacaoRecebida" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "doadorId" INTEGER NOT NULL,
    CONSTRAINT "DoacaoRecebida_doadorId_fkey" FOREIGN KEY ("doadorId") REFERENCES "Doador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
