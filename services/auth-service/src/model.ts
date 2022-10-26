type User = {
	id: number;
	name: string;
	role: string;

	password: string;
	email: string;

	score?: number;
	deleted?: boolean;
};

type Credentials = {
	email: string;
	password: string;
};

export function isAdmin(user: User): boolean {
	return user.role === "Admin";
}

export function isPlayer(user: User): boolean {
	return user.role === "Player";
}

export function isReporter(user: User): boolean {
	return user.role === "Reporter";
}

export { User, Credentials };
