import { getRequest, postRequest } from "./request";
import { User } from "../model";

export function getUserByName(username: string) {
	const response = getRequest<User>(`http://users-api:5000/user/${username}`);
	return response;
}
