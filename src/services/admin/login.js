import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
	unAuthorizedResponse,
} from "../../helpers/functions/ResponseHandler.js";
import createAccessToken from "../../helpers/functions/createAccestoken.js";
import bcrypt from "bcrypt";
export async function login(req, res, next) {
	try {
		const { email, password } = req.body;
		//find admin
		const admin = await prisma.admin.findUnique({
			where: {
				email,
			},
		});
		//check password match or not
		const match = await bcrypt.compare(password, admin.password);
		if (!admin) {
			return badRequestResponse(res, "dont find your account");
		}
		if (!match) {
			return unAuthorizedResponse(res, "in correct password");
		}

		const newToken = await prisma.tokenaccess.create({
			data: {
				adminid: admin.id,
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
			},
		});
		const accessToken = createAccessToken(admin.id, newToken.id);
		delete admin.password;
		return okResponse(res, "Login successful", {
			...admin,
			accessToken,
		});
	} catch (err) {
		next();
	}
}
