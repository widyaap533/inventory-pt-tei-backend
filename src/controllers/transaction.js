const prisma = require('../config/prisma');

module.exports = {
  getAllTransaction: async (req, res) => {
    try {
      const transactionList = await prisma.transaction.findMany({
        where: { is_delete: false },
        select: {
          id: true,
          id_staff: true,
          staff: { 
            select: {
              name: true,
              id_kartu: true
            }
          },
          departure_date: true,
          time_out: true,
          category: { 
            select: { name: true } 
          },
          detail_transaction: {
            select: {
              amount: true, 
              device: {
                select: {
                  name: true,
                  stok: true 
                }
              }
            }
          }
        },
        orderBy: { created_at: 'desc' } 
      });
      
      if (transactionList.length === 0) {
        return res.status(404).json({ success: false, message: 'Daftar transaksi tidak ditemukan' });
      }

      const formattedData = transactionList.map((trx) => {
        return {
          id: trx.id,
          id_staff: trx.id_staff,
          staff_name: trx.staff?.name,
          id_kartu: trx.staff?.id_kartu,
          departure_date: trx.departure_date,
          time_out: trx.time_out,
          category_name: trx.category?.name,
          borrowed_items: trx.detail_transaction.map((detail) => ({
            device_name: detail.device?.name,
            quantity: detail.amount,
            available: detail.device?.stok
          }))
        };
      });

      return res.status(200).json({
        success: true,
        message: "Berhasil mengambil data transaksi",
        data: formattedData
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getTransactionById: async (req, res) => {
    try {
      const { id } = req.params;

      const transaction = await prisma.transaction.findFirst({
        where: { 
          id: id, 
          is_delete: false 
        },
        select: {
          id: true,
          id_staff: true,
          staff: { 
            select: {
              name: true,
              id_kartu: true
            }
          },
          departure_date: true,
          time_out: true,
          category: { 
            select: { name: true } 
          },
          detail_transaction: {
            select: {
              amount: true,
              device: { 
                select: { 
                  name: true, 
                  stok: true 
                } 
              }
            }
          }
        }
      });

      if (transaction === undefined) {
        return res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan' });
      }

      const formattedData = {
        id: transaction.id,
        id_staff: transaction.id_staff,
        departure_date: transaction.departure_date,
        time_out: transaction.time_out,
        category_name: transaction.category?.name,
        borrowed_items: transaction.detail_transaction.map((detail) => ({
          device_name: detail.device?.name,
          quantity: detail.amount,
          available: detail.device?.stok
        }))
      };

      return res.status(200).json({ 
        success: true, 
        message: 'Berhasil mengambil detail transaksi',
        data: formattedData 
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Gagal mengambil detail transaksi' });
    }
  },

  createTransaction: async (req, res) => {
    const { id_kartu, id_category, departure_date, time_out, details } = req.body;

    if (id_kartu === null || id_category === null || departure_date === null || time_out === null || details.length === 0) {
      return res.status(400).json({ status: 'error', message: 'Data tidak lengkap atau detail perangkat kosong' });
    }

    try {
      const staff = await prisma.staff.findFirst({
        where: { 
          id_kartu: id_kartu,
          is_delete: false 
        }
      });
      if (staff === null) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Akses ditolak. ID Kartu tidak terdaftar di sistem' 
        });
      }

      const result = await prisma.$transaction(async (tx) => {
        const category = await tx.category.findFirst({ where: { id: id_category, is_delete: false } });
        if (category === undefined) throw new Error('Kategori tidak ditemukan atau sudah dihapus');

        for (const item of details) {
          const device = await tx.device.findUnique({ where: { id: item.id_device } });
          
          if (device === undefined || device.is_delete) {
            throw new Error(`Perangkat dengan ID ${item.id_device} tidak valid atau terhapus`);
          }
          if (device.stok < item.amount) {
            throw new Error(`Stok ${device.name} tidak mencukupi! Sisa stok: ${device.stok}, diminta: ${item.amount}`);
          }

          await tx.device.update({
            where: { id: item.id_device },
            data: { stok: device.stok - item.amount }
          });
        }

        const newTransaction = await tx.transaction.create({
          data: {
            id_staff: staff.id,
            id_category: id_category,
            departure_date: new Date(departure_date),
            time_out: time_out,
            detail_transaction: {
              create: details.map((item) => ({
                id_device: item.id_device,
                amount: item.amount
              }))
            }
          },
          include: {
            detail_transaction: true 
          }
        });

        return newTransaction;
      });

      return res.status(201).json({
        status: 'success',
        message: 'Transaksi berhasil disimpan dan stok otomatis dikurangi',
        data: result
      });

    } catch (error) {
      console.error(error);
      return res.status(400).json({ status: 'error', message: error.message || 'Gagal memproses transaksi' });
    }
  },

  deleteTransaction: async (req, res) => {
    try {
      const { id } = req.params;

      const transaction = await prisma.transaction.findFirst({
        where: { id: id, is_delete: false },
        include: { detail_transaction: true }
      });

      if (transaction === undefined) {
        return res.status(404).json({ status: 'error', message: 'Transaksi tidak ditemukan' });
      }

      await prisma.$transaction(async (tx) => {
        
        for (const detail of transaction.detail_transaction) {
          const device = await tx.device.findUnique({ where: { id: detail.id_device } });
          if (device) {
            await tx.device.update({
              where: { id: detail.id_device },
              data: { stok: device.stok + detail.amount }
            });
          }
        }

        await tx.transaction.update({
          where: { id: id },
          data: { is_delete: true }
        });
      });

      return res.status(200).json({
        status: 'success',
        message: 'Transaksi berhasil dibatalkan dan stok dikembalikan'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal membatalkan transaksi' });
    }
  }
};