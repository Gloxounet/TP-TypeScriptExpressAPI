import axios from "axios";

// ---------------------------------------------------------------- GET ----------------------------------------------------------------

export async function getRequest<T>(url: string): Promise<T | string> {
	// 👇️ const data: GetUsersResponse
	const { data, status } = await axios.get<T>(url, {
		headers: {
			Accept: "application/json",
		},
	});

	console.log(JSON.stringify(data, null, 4));

	// 👇️ "response status is: 200"
	console.log("response status is: ", status);

	return data;
}

// ----------------------------------------------------------------POST----------------------------------------------------------------

export async function postRequest<RequestType, ResponseType>(
	url: string,
	payload: RequestType
): Promise<ResponseType | string> {
	try {
		// 👇️ const data: CreateUserResponse
		const { data } = await axios.post<ResponseType>(url, payload, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

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
