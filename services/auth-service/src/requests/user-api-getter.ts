import { getRequest, postRequest } from "./request";
import { User } from "../model";

function getUserByName(username: string) {
	const response = getRequest<User>(`http://127.0.0.1:5000/user/${username}`);
	return response;
}
