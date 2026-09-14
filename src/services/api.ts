import axios from "axios";

export const loginUser = async (username: string, password: string) => {

  try {
    const response = await axios.post("https://dummyjson.com/auth/login", {
      username,
      password,
    });
    console.log(JSON.stringify(response, null, 4))
    return response;
  } catch (error: any) {
    console.log(error)
    return error.response;
  }
};

export const getCurrentUser = async (token: string | null) => {
  try {
    const response = await axios.get("https://dummyjson.com/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(JSON.stringify(response, null, 4))
    return response;
  } catch (error: any) {
    console.log(error)
    return error.response;
  }
}