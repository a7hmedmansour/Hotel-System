import { prisma } from "../../index.js";
import {
	badRequestResponse,
	okResponse,
} from "../../helpers/functions/ResponseHandler.js";
import bcrypt from "bcrypt";
import createAccessToken from "../../helpers/functions/createAccestoken.js";
export async function register(req, res, next) {
	try {
		const { name, email, phonenum, Password } = req.body;
		const admin = await prisma.admin.findFirst({
			where: {
				OR: [{ phonenum }, { email }],
			},
		});
		if (admin) {
			return badRequestResponse(
				res,
				"Email or PhoneNumber already exist you can not register",
			);
		}
		const enbcryptpassword = bcrypt.hashSync(Password, 10);

		const newadmin = await prisma.admin.create({
			data: {
				name: name,
				email: email,
				password: enbcryptpassword,
				phonenum: phonenum,
			},
		});
		const newToken = await prisma.tokenaccess.create({
			data: {
				adminid: newadmin.id,
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
			},
		});
		const accessToken = createAccessToken(newadmin.id, newToken.id);
		if (newadmin) {
			delete newadmin.password;
			return okResponse(res, "successfully Register", {
				...newadmin,
				accessToken,
			});
		} else {
			return badRequestResponse(res, "error");
		}
	} catch (err) {
		console.log(err);
		next();
	}
}
