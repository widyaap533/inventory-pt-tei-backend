const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
require('dotenv').config();

// Mengambil variabel URL dari file .env
const dbUrl = new URL(process.env.DATABASE_URL);

// Mengonfigurasi adapter mariadb dengan format spesifik yang dibutuhkan
const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: Number(dbUrl.port) || 3306,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substring(1), // Menghapus tanda '/' di awal nama database
});

// Memasukkan adapter ke dalam inisialisasi Prisma Client
const prisma = new PrismaClient({
  adapter: adapter,
});

module.exports = prisma;