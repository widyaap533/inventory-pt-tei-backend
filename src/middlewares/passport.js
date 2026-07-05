const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const prisma = require("../config/prisma");
passport.use(
  "user",
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, 
    }, 
    async function (jwtPayload, cb) {
      try {
        const isUserExists = await prisma.staff.findUnique({
          where: { id: jwtPayload.id }
        });

        if (!isUserExists || isUserExists.is_delete) {
          return cb(null, false, { message: "User not found" });
        }

        return cb(null, isUserExists);
      } catch (error) {
        return cb(error, false);
      }
    }
  )
);

module.exports = passport;