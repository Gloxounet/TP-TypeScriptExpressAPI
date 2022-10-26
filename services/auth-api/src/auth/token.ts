import jwt from "jsonwebtoken";
import { Payload } from "./model";

const privateKey = "thisisasecretkey";

export function getToken(payload: Payload): string {
	return jwt.sign(payload, privateKey);
}

export function verifyToken(token: string) {
	return jwt.verify(token, privateKey);
}
