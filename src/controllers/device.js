const prisma = require('../config/prisma');

module.exports = {
  getAllDevice: async (req, res) => {
    try {
      const deviceList = await prisma.device.findMany({
        where: { is_delete: false },
        select: {
          id: true,
          name: true,
          stok: true,
          created_at: true,
          updated_at: true
        }
      });

      if (deviceList.length === 0) {
        return res.status(404).json({ status: 'error', message: 'Daftar Device tidak ditemukan' });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Berhasil mengambil data device',
        data: deviceList
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  },

  createDevice: async (req, res) => {
    try {
      const { name, stok } = req.body;

      if (name === undefined) {
        return res.status(400).json({ status: 'error', message: 'Nama device wajib diisi' });
      }

      const newDevice = await prisma.device.create({
        data: {
          name: name,
          stok: stok ? parseInt(stok) : undefined 
        }
      });

      return res.status(201).json({
        status: 'success',
        message: 'Device berhasil ditambahkan',
        data: {
          id: newDevice.id,
          name: newDevice.name,
          stok: newDevice.stok
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal menambahkan device' });
    }
  },

  getDeviceById: async (req, res) => {
    try {
      const { id } = req.params;

      const device = await prisma.device.findFirst({
        where: {
          id: id,
          is_delete: false
        },
        select: {
          id: true,
          name: true,
          stok: true,
          created_at: true,
          updated_at: true
        }
      });

      if (device === undefined) {
        return res.status(404).json({ status: 'error', message: 'Device tidak ditemukan' });
      }

      return res.status(200).json({ status: 'success', data: device });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal mengambil data device' });
    }
  },

  updateDevice: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, stok } = req.body;

      const existingDevice = await prisma.device.findFirst({
        where: { id: id, is_delete: false }
      });

      if (existingDevice === undefined) {
        return res.status(404).json({ status: 'error', message: 'Device tidak ditemukan' });
      }

      const updateData = {};
      if (name) updateData.name = name;
      
      if (stok !== undefined) updateData.stok = parseInt(stok);

      const updatedDevice = await prisma.device.update({
        where: { id: existingDevice.id },
        data: updateData
      });

      return res.status(200).json({
        status: 'success',
        message: 'Data device berhasil diupdate',
        data: {
          id: updatedDevice.id,
          name: updatedDevice.name,
          stok: updatedDevice.stok
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal mengupdate device' });
    }
  },

  deleteDevice: async (req, res) => {
    try {
      const { id } = req.params;

      const existingDevice = await prisma.device.findFirst({
        where: { id: id, is_delete: false }
      });

      if (existingDevice === undefined) {
        return res.status(404).json({ status: 'error', message: 'Device tidak ditemukan' });
      }

      await prisma.device.delete({
        where: { id: existingDevice.id }
      });

      return res.status(200).json({
        status: 'success',
        message: 'Device berhasil dihapus'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal menghapus device' });
    }
  }
};