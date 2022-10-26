import * as express from "express";
import { UCredentials, User } from "./model";

import { getToken, verifyToken } from "./auth/token";
import { Payload, Token } from "./auth/model";

import { getUserByName } from "./requests/user-api-getter";

export const register = (app: express.Application) => {
	app.get("/", (req, res) => res.send("Auth Service"));

	// Get all users
	app.post("/authenticate", (req, res) => {
		const auth: UCredentials = req.body;

		// Get user role information
		const user: Promise<User> = getUserByName(auth.username);

		user
			.then((data: User) => {
				const payload: Payload = { username: data.name, role: data.role };
				const token = getToken(payload);
				return res.status(200).json(token);
			})
			.catch((error) => console.log(error))
			.then(() => {
				return res.status(404).json({ error: "User not found" });
			});
	});

	// Create a new user
	app.get("/user-context", (req, res) => {
		const body: Token = req.body;
		const token = body.token;

		console.log(token);

		const verify = verifyToken(token);

		res.status(200).json(verify);
	});
};
