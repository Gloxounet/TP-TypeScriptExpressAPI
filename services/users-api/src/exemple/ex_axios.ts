import axios from "axios";

type User = {
	id: number;
	email: string;
	first_name: string;
};

// ---------------------------------------------------------------- GET ----------------------------------------------------------------

type GetUsersResponse = {
	data: User[];
};

async function getUsers() {
	try {
		// 👇️ const data: GetUsersResponse
		const { data, status } = await axios.get<GetUsersResponse>(
			"https://reqres.in/api/users",
			{
				headers: {
					Accept: "application/json",
				},
			}
		);

		console.log(JSON.stringify(data, null, 4));

		// 👇️ "response status is: 200"
		console.log("response status is: ", status);

		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log("error message: ", error.message);
			return error.message;
		} else {
			console.log("unexpected error: ", error);
			return "An unexpected error occurred";
		}
	}
}

// ----------------------------------------------------------------POST----------------------------------------------------------------

type CreateUserResponse = {
	name: string;
	job: string;
	id: string;
	createdAt: string;
};

async function createUser() {
	try {
		// 👇️ const data: CreateUserResponse
		const { data } = await axios.post<CreateUserResponse>(
			"https://reqres.in/api/users",
			{ name: "John Smith", job: "manager" },
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);

		console.log(JSON.stringify(data, null, 4));

		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log("error message: ", error.message);
			// 👇️ error: AxiosError<any, any>
			return error.message;
		} else {
			console.log("unexpected error: ", error);
			return "An unexpected error occurred";
		}
	}
}
