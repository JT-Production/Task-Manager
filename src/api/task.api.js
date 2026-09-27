import connectionInstance from "./client";

const createTask = async (title, description, dueDate, status, token) => {
  try {
    const res = connectionInstance.post(
      "/tasks/create",
      {
        title,
        description,
        dueDate,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(JSON.stringify(res, null, 4), "res");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { createTask };
