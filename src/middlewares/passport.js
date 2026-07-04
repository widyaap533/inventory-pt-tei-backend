const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const prisma = require("../config/prisma"); // Sesuaikan path ke file prisma kamu

passport.use(
  "user", // Nama strategy-nya
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Kalau di LMS pakai file .pem (RS256), di sini kita pakai string biasa dari .env agar lebih praktis
      secretOrKey: process.env.JWT_SECRET, 
    }, 
    async function (jwtPayload, cb) {
      try {
        // Cari user di tabel staff berdasarkan ID yang ada di dalam token
        const isUserExists = await prisma.staff.findUnique({
          where: { id: jwtPayload.id } // Pastikan saat login, payload-nya membawa 'id'
        });

        if (!isUserExists || isUserExists.is_delete) {
          return cb(null, false, { message: "User not found" });
        }

        // Jika ketemu, datanya dilempar agar bisa diakses di req.user
        return cb(null, isUserExists);
      } catch (error) {
        return cb(error, false);
      }
    }
  )
);

module.exports = passport;