const prisma = require('../config/prisma');
const { hashPassword } = require('../utils/hash');

module.exports = {
  getAllStaff: async (req, res) => {
    try {
      const staffList = await prisma.staff.findMany({
        where: { is_delete: false },
        select: {
          id: true,
          id_kartu: true,
          username: true,
          name: true,
          position: true,
          created_at: true,
          updated_at: true
        }
      });

      if (staffList.length === 0) {
        return res.status(404).json({ status: 'error', message: 'Daftar staff tidak ditemukan' });
      }

      return res.status(200).json({
        status: 'success',
        data: staffList
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  },

  createStaff: async (req, res) => {
    try {
      const { username, password, name, position, id_kartu } = req.body;
      if (id_kartu !== undefined) {
        const existingCard = await prisma.staff.findUnique({
          where: { id_kartu: id_kartu }
        });
        if (existingCard !== null) {
          return res.status(400).json({ 
            status: 'error', 
            message: 'ID Kartu sudah terdaftar pada staff lain' 
          });
        }
      }

      const hashedPassword = await hashPassword(password);
      const newStaff = await prisma.staff.create({
        data: {
          username,
          password: hashedPassword, 
          name,
          position,
          id_kartu: id_kartu
        }
      });

      return res.status(201).json({
        status: 'success',
        message: 'Staff berhasil ditambahkan',
        data: {
          id: newStaff.id,
          username: newStaff.username,
          id_kartu: newStaff.id_kartu
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal menambahkan staff' });
    }
  },
  
  getStaffById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const staff = await prisma.staff.findFirst({
        where: { 
          id: id,
          is_delete: false 
        },
        select: {
          id: true,
          id_kartu: true,
          username: true,
          name: true,
          position: true,
          created_at: true
        }
      });

      if (staff === null) {
        return res.status(404).json({ status: 'error', message: 'Staff tidak ditemukan' });
      }
      return res.status(200).json({ status: 'success', data: staff });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal mengambil data staff' });
    }
  },

  updateStaff: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, id_kartu, name, position  } = req.body;

      const existingStaff = await prisma.staff.findFirst({
        where: { id: id, is_delete: false }
      });

      if (existingStaff === null) {
        return res.status(404).json({ status: 'error', message: 'staff tidak ditemukan' });
      }
      if (username && username !== existingStaff.username) {
        const checkUsername = await prisma.staff.findUnique({ where: { username: username } });
        if (checkUsername) {
          return res.status(400).json({ status: 'error', message: 'Username sudah digunakan oleh staff lain' });
        }
      }
      if (id_kartu && id_kartu !== existingStaff.id_kartu) {
        const checkKartu = await prisma.staff.findUnique({ where: { id_kartu: id_kartu } });
        if (checkKartu) {
          return res.status(400).json({ status: 'error', message: 'ID Kartu sudah terdaftar pada staff lain' });
        }
      }

      const updateData = {
        id: existingStaff.id,
        username: username,
        id_kartu: id_kartu,
        name: name,
        position: position
      };
      const updatedStaff = await prisma.staff.update({
        where: { id: existingStaff.id },
        data: updateData
      });

      return res.status(200).json({
        status: 'success',
        message: 'Data device berhasil diupdate',
        data: {
          id: updateData.id,
          name: updateData.username
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal mengupdate staff' });
    }
  },

  deleteStaff: async (req, res) => {
    try {
      const { id } = req.params;

      const existingStaff = await prisma.staff.findUnique({
        where: { id: id }
      });

      if (existingStaff === undefined) {
        return res.status(404).json({ status: 'error', message: 'Staff tidak ditemukan' });
      }

      await prisma.staff.delete({
        where: { id: existingStaff.id }
      });

      return res.status(200).json({
        status: 'success',
        message: 'Staff berhasil dihapus secara permanen'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal menghapus staff' });
    }
  }
};