import * as express from "express";
import { User, Credentials } from "./model";
import { getToken, verifyToken } from "./auth/token";
import { Payload } from "./auth/model";

export const register = (app: express.Application) => {
	app.get("/", (req, res) => res.send("Auth Service"));

	// Get all users
	app.get("/user-context", (req, res) => {
		const auth: Credentials = req.body;

		// Get user role information

		const payload: Payload = { username: auth.email, role: "" };
		res.status(200).json();
	});

	// Create a new user
	app.post("/authenticate", (req, res) => {
		res.status(200).json();
	});
};
