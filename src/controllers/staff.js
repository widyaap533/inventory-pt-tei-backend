const prisma = require('../config/prisma');
const { hashPassword } = require('../utils/hash');

module.exports = {
  createStaff: async (req, res) => {
    try {
      const { username, password, name, position } = req.body;

      const hashedPassword = await hashPassword(password);

      const newStaff = await prisma.staff.create({
        data: {
          username,
          password: hashedPassword, 
          name,
          position
        }
      });

      return res.status(201).json({
        status: 'success',
        message: 'Staff berhasil ditambahkan',
        data: {
          id: newStaff.id,
          username: newStaff.username
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
          username: true,
          name: true,
          position: true,
          created_at: true
        }
      });

      if (staff === undefined) {
        return res.status(404).json({ status: 'error', message: 'Staff tidak ditemukan' });
      }

      return res.status(200).json({ status: 'success', data: staff });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal mengambil data staff' });
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