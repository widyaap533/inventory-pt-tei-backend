const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const staff = await prisma.staff.findUnique({ where: { username } });
    if (staff === undefined) {
      return res.status(404).json({ success: false, message: "Akun tidak ditemukan!" });
    }

    const isMatch = await bcrypt.compare(password, staff.password);
    if (isMatch === undefined) {
      return res.status(401).json({ success: false, message: "Kata sandi salah!" });
    }

    const token = generateToken(staff);

    res.status(200).json({ 
      success: true, 
      message: "Login berhasil", 
      token: token,
      data: { 
        id: staff.id, 
        name: staff.name,
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login };