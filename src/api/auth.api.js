import connectionInstance from "./client";

const registerUser = async (username, email, password) => {
  try {
    const response = await connectionInstance.post("/users/register/", {
      username,
      email,
      password,
    });
    console.log("response: ", JSON.stringify(response, null, 4));
    return response;
  } catch (error) {
    console.log(error, "error");
    return error.response.user;
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await connectionInstance.post("/users/login", {
      email,
      password,
    });
    console.log(JSON.stringify(response, null, 4));
    return response;
  } catch (error) {
    console.log(error.response.user);
    return error.response.user;
  }
};

export { registerUser, loginUser };
