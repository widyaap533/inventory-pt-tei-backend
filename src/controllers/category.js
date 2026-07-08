const prisma = require('../config/prisma');

module.exports = {
  getAllCategory: async (req, res) => {
    try {
      const categoryList = await prisma.category.findMany({
        where: { is_delete: false },
        select: {
          id: true,
          name: true,
          created_at: true,
          updated_at: true
        }
      });

      if (categoryList.length === 0) {
        return res.status(404).json({ status: 'error', message: 'Daftar Kategori tidak ditemukan' });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Berhasil mengambil data kategori',
        data: categoryList
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ status: 'error', message: 'Nama kategori wajib diisi' });
      }

      const newCategory = await prisma.category.create({
        data: { name: name }
      });

      return res.status(201).json({
        status: 'success',
        message: 'Kategori berhasil ditambahkan',
        data: {
          id: newCategory.id,
          name: newCategory.name
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal menambahkan kategori' });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await prisma.category.findFirst({
        where: {
          id: id,
          is_delete: false
        },
        select: {
          id: true,
          name: true,
          created_at: true,
          updated_at: true
        }
      });

      if (category === null) {
        return res.status(404).json({ status: 'error', message: 'Kategori tidak ditemukan' });
      }

      return res.status(200).json({ status: 'success', data: category });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal mengambil data kategori' });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const existingCategory = await prisma.category.findFirst({
        where: { id: id, is_delete: false }
      });

      if (existingCategory === null) {
        return res.status(404).json({ status: 'error', message: 'Kategori tidak ditemukan' });
      }

      if (name === null) {
        return res.status(400).json({ status: 'error', message: 'Nama kategori tidak boleh kosong' });
      }

      const updatedCategory = await prisma.category.update({
        where: { id: existingCategory.id },
        data: { name: name }
      });

      return res.status(200).json({
        status: 'success',
        message: 'Data kategori berhasil diupdate',
        data: {
          id: updatedCategory.id,
          name: updatedCategory.name
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal mengupdate kategori' });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const existingCategory = await prisma.category.findFirst({
        where: { id: id, is_delete: false }
      });

      if (existingCategory === null) {
        return res.status(404).json({ status: 'error', message: 'Kategori tidak ditemukan' });
      }

      await prisma.category.delete({
        where: { id: existingCategory.id }
      });

      return res.status(200).json({
        status: 'success',
        message: 'Kategori berhasil dihapus'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Gagal menghapus kategori' });
    }
  }
};