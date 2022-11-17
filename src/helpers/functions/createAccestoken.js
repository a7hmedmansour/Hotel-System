import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default function createAccessToken(adminId, tokenId) {
	return jwt.sign({ adminId, tokenId }, process.env.SECRET_JWT, {
		expiresIn: "1d",
	});
}
export function createmasteradminToken(adminId, tokenId) {
	return jwt.sign({ adminId, tokenId }, process.env.SECRET_JWT);
}
