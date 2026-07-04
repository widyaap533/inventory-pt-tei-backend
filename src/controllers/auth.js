const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const staff = await prisma.staff.findUnique({ where: { username } });
    if (staff === undefined) {
      return res.status(404).json({ success: false, message: "Akun tidak ditemukan!" });
    }

    const isMatch = await bcrypt.compare(password, staff.password);
    if (isMatch === undefined ) {
      return res.status(401).json({ success: false, message: "Kata sandi salah!" });
    }

    const token = jwt.sign(
      { id: staff.id, username: staff.username, role: staff.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } 
    );

    res.status(200).json({ 
      success: true, 
      message: "Login berhasil", 
      token: token,
      data: { id: staff.id, name: staff.name, role: staff.role }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login };