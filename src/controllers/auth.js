const prisma = require('../config/prisma');
const { comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingStaff = await prisma.staff.findUnique({ where: { username } });
    if (existingStaff === undefined) {
      return res.status(404).json({ success: false, message: "Akun tidak ditemukan!" });
    }

    const isMatch = await comparePassword(password, existingStaff.password);
    if (isMatch === false) {
      return res.status(401).json({ success: false, message: "Kata sandi salah!" });
    }
    const token = generateToken(existingStaff);

    res.status(200).json({ 
      success: true, 
      message: "Login berhasil", 
      token: token,
      data: { 
        id: existingStaff.id, 
        name: existingStaff.name,
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login };