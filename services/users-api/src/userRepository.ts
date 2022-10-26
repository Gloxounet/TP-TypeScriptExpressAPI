import Database from "better-sqlite3";
import fs from "fs";
import { User, Credentials } from "./model";

export default class UserRepository {
	db: Database.Database;

	constructor() {
		this.db = new Database("db/users.db", { verbose: console.log });
		this.applyMigrations();
	}

	//Table creation
	applyMigrations() {
		const applyMigration = (path: string) => {
			const migration = fs.readFileSync(path, "utf8");
			this.db.exec(migration);
		};

		const testRow = this.db
			.prepare(
				"SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'"
			)
			.get();
		if (!testRow) {
			console.log("Applying migrations on DB users...");
			const migrations = ["db/migrations/init.sql"];
			migrations.forEach(applyMigration);
		}
	}

	getAllUsers(admin: boolean): User[] {
		let query = "SELECT * FROM users";
		if (!admin) {
			query += " WHERE deleted = 0";
		}
		const statement = this.db.prepare(query);
		const rows: User[] = statement.all();
		return rows;
	}

	getUserById(userId: number): User[] {
		const statement = this.db.prepare("SELECT * FROM users WHERE user_id = ?");
		const rows: User[] = statement.get(userId);
		return rows;
	}

	getUsersByCredentials(auth: Credentials): User {
		const statement = this.db.prepare(
			"SELECT * FROM users WHERE email = ? AND password = ?"
		);
		const row: User = statement.get(auth.email, auth.password);
		return row;
	}

	getUserByName(name: string): User {
		const statement = this.db.prepare("SELECT * FROM users WHERE name =?");
		const rows: User = statement.get(name);
		return rows;
	}

	createUser(name: string, role: string, email: string, password: string) {
		const statement = this.db.prepare(
			"INSERT INTO users (name,role,email,password) VALUES (?,?,?,?)"
		);
		return statement.run(name, role, email, password).lastInsertRowid;
	}

	updateUser(user: User) {
		const statement = this.db.prepare(
			"UPDATE users SET name =?, role =?, email =?, password =? WHERE user_id =?"
		);
		return statement.run(
			user.name,
			user.role,
			user.email,
			user.password,
			user.id
		).lastInsertRowid;
	}

	deleteUser(userId: number) {
		const statement = this.db.prepare(
			"UPDATE users SET deleted=? WHERE user_id =?"
		);
		return statement.run(1, userId).lastInsertRowid;
	}
}
