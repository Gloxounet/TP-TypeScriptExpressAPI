import { User, Credentials, isAdmin } from "./model";
import UserRepository from "./userRepository";

const userRepository = new UserRepository();

const listUsers = (auth: Credentials) => {
	if (auth?.email == null || auth?.password == null) {
		return userRepository.getAllUsers(false);
	}

	const user: User = getUsersByCredentials(auth);
	return userRepository.getAllUsers(isAdmin(user));
};

const getUserById = (id: number) => {
	return userRepository.getUserById(id);
};

const getUserByName = (name: string) => {
	return userRepository.getUserByName(name);
};

const getUsersByCredentials = (credentials: Credentials) => {
	return userRepository.getUsersByCredentials(credentials);
};

const addUser = (newUser: User) => {
	return userRepository.createUser(
		newUser.name,
		newUser.role,
		newUser.email,
		newUser.password
	);
};

const updateUser = (user: User) => {
	return userRepository.updateUser(user);
};
const deleteUser = (userid: number) => {
	return userRepository.deleteUser(userid);
};

// TODO: implement and export
// function findUser (userId: number): User { //@todo }

export {
	listUsers,
	addUser,
	updateUser,
	deleteUser,
	getUserById,
	getUserByName,
};
