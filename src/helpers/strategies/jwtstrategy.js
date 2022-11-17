import { prisma } from "../../index.js";
import { Strategy, ExtractJwt } from "passport-jwt";
import dontenv from "dotenv";
dontenv.config();

const adminStrategy = new Strategy(
	{
		secretOrKey: process.env.SECRET_JWT,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		jsonWebTokenOptions: {
			maxAge: "1d",
		},
	},
	async (payload, done) => {
		try {
			const token = await prisma.tokenaccess.findUnique({
				where: {
					id: payload.tokenId,
				},
				include: {
					adminRE: true,
				},
			});
			if (token) {
				return done(null, { ...token.adminRE, tokenId: token.id });
			} else {
				return done(null, false);
			}
		} catch (err) {
			console.log(err);
			return done(err, false);
		}
	},
);

export default adminStrategy;
