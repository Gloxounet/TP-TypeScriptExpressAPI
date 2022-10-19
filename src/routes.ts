import * as express from "express";
import * as UserController from "./userController";
import { User, Credentials } from "./model";

export const register = (app: express.Application) => {
	app.get("/", (req, res) => res.send("Hello World!"));

	// Get all users
	app.get("/user", (req, res) => {
		const auth: Credentials = req.body;
		console.log(auth);
		res.status(200).json(UserController.listUsers(auth));
	});

	// Get user by name
	app.get("/user/:name", (req, res) => {
		res.status(200).json(UserController.getUserByName(req.params.name));
	});

	// Create a new user
	app.post("/user", (req, res) => {
		const newUser: User = req.body;
		console.log(newUser);
		res.status(200).json(UserController.addUser(newUser));
	});

	// Update user information
	app.put("/user", (req, res) => {
		const user: User = req.body;
		console.log(user);
		res.status(200).json(UserController.updateUser(user));
	});

	// Delete user
	app.delete("/user/:userId", (req, res) => {
		const userId: number = parseInt(req.params.userId);
		console.log(userId);
		res.status(200).json(UserController.deleteUser(userId));
	});
};
