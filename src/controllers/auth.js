// const prisma = require('../config/prisma');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // [REGISTER] Menambah Staf Baru (Dengan password yang di-enkripsi)
// const register = async (req, res) => {
//   try {
//     const { username, password, name, position } = req.body;

//     // 1. Cek apakah username sudah dipakai
//     const existingUser = await prisma.staff.findUnique({ where: { username } });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "Username sudah terdaftar!" });
//     }

//     // 2. Acak (Hash) kata sandi
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // 3. Simpan ke database
//     const newStaff = await prisma.staff.create({
//       data: {
//         username,
//         password: hashedPassword,
//         name,
//         position
//       }
//     });

//     res.status(201).json({ 
//       success: true, 
//       message: "Akun berhasil dibuat", 
//       data: { id: newStaff.id, username: newStaff.username } 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // [LOGIN] Masuk ke sistem
// const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // 1. Cari staf berdasarkan username
//     const staff = await prisma.staff.findUnique({ where: { username } });
//     if (!staff) {
//       return res.status(404).json({ success: false, message: "Akun tidak ditemukan!" });
//     }

//     // 2. Cocokkan kata sandi yang diketik dengan yang ada di database
//     const isMatch = await bcrypt.compare(password, staff.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Kata sandi salah!" });
//     }

//     // 3. Buat tiket (Token JWT)
//     const token = jwt.sign(
//       { id: staff.id, username: staff.username, role: staff.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' } // Token akan kedaluwarsa dalam 1 hari
//     );

//     res.status(200).json({ 
//       success: true, 
//       message: "Login berhasil", 
//       token: token,
//       data: { id: staff.id, name: staff.name, role: staff.role }
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = { register, login };