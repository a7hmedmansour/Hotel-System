import { prisma } from "../../index.js";
import { Strategy, ExtractJwt } from "passport-jwt";
import dontenv from "dotenv";
dontenv.config();
const adminmange = new Strategy(
	{
		secretOrKey: process.env.SECRET_JWT,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	},
	async (payload, done) => {
		try {
			const token = await prisma.tokenaccess.findMany({
				where: {
					id: payload.tokenId,
				},
				include: {
					adminRE: true,
				},
			});
			if (token) {
				const adminmanger = await prisma.admin.findFirst({
					where: {
						id: token.id,
						role: "master",
					},
				});
				if (adminmanger) {
					return done(null, { ...token.adminRE, tokenId: token.id });
				} else {
					return done(null, false);
				}
			} else return done(null, false);
		} catch (err) {
			console.log(err);
			return done(err, false);
		}
	},
);
export default adminmange;
