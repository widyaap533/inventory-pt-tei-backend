const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  hashPassword: async (plainPassword) => {
    try {
      return await bcrypt.hash(plainPassword, saltRounds);
    } catch (error) {
      throw new Error('Gagal melakukan hash password');
    }
  },

  comparePassword: async (plainPassword, hashedPassword) => {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw new Error('Gagal memvalidasi password');
    }
  }
};