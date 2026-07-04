// const passport = require("passport");
// const { Strategy, ExtractJwt } = require("passport-jwt");
// const prisma = require("../config/prisma");

// passport.use(
//   "user",
//   new Strategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET, 
//     },
//     async (jwtPayload, cb) => {
//       try {
//         const user = await prisma.staff.findUnique({
//           where: { id: jwtPayload.id } 
//         });

//         if (user === 0){
//           return cb(null, false, { message: "Staf tidak ditemukan" });
//         }
//         return cb(null, user);
//       } catch (error) {
//         return cb(error, false);
//       }
//     }
//   )
// );

// module.exports = passport;