export async function login(username, password) {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    let response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        body: formData,
    });
    let result = await response.json();
    console.log("Response", result);
    return result;
}

// Register: /register/
export async function register(
    username,
    password,
    password_repeat,
    email,
    first_name,
    last_name
) {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("password_repeat", password_repeat);
    formData.append("email", email);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);

    let response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        body: formData,
    });
    let result = await response.json();
    console.log("Response", result);
    return result;
}

// Get Boards /board/
export async function getBoards() {
    let token = "Token " + localStorage.getItem("token");
    console.log(token);

    let response = await fetch("http://127.0.0.1:8000/board/", {
        method: "GET",
        headers: {
            Authorization: token,
        },
    });
    let result = await response.json();
    return result;
}

// Get Tasks of Board: /task/

export async function getTasks(board_id) {
    let token = "Token " + localStorage.getItem("token");

    let response = await fetch(
        "http://127.0.0.1:8000/task/?board_id=" + board_id, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        }
    );
    let result = await response.json();
    console.log("Response", result);
    return result;
}

// Add Board: /board/add/
export async function addBoard(name) {
    let token = "Token " + localStorage.getItem("token");

    let formData = new FormData();
    formData.append("name", name);

    let response = await fetch("http://127.0.0.1:8000/board/add/", {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: formData,
    });
    let result = await response.json();
    console.log("Response", result);
    return result;
}

// Add Task: /task/add/
export async function addTask(
    title,
    urgency,
    category,
    user_id,
    board_id,
    color,
    description
) {
    let token = "Token " + localStorage.getItem("token");

    let formData = new FormData();
    formData.append("title", title);
    formData.append("urgency", urgency);
    formData.append("category", category);
    formData.append("user_id", user_id);
    formData.append("board_id", board_id);
    formData.append("color", color);
    formData.append("description", description);

    let response = await fetch("http://127.0.0.1:8000/task/add/", {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: formData,
    });
    let result = await response.json();
    console.log("Response", result);
    return result;
}
// Add User to Board: /board/add/user/
export async function addUserToBoard(board_id, user_ids) {
    let token = "Token " + localStorage.getItem("token");

    let formData = new FormData();
    formData.append("board_id", board_id);
    formData.append("user_ids", user_ids);

    let response = await fetch("http://127.0.0.1:8000/board/add/user/", {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: formData,
    });
    let result = await response.json();
    console.log("Response", result);
    return result;
}

// Get all Users from Board: /task/user/
export async function getUsersFromBoard(board_id) {
    //Get the Token of authenticated User:
    let token = "Token " + localStorage.getItem("token");

    let response = await fetch(
        "http://127.0.0.1:8000/task/user/?board_id=" + board_id, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        }
    );
    let result = await response.json();
    console.log("Response", result);
    return result;
}

// Get all Users not in the Board: /board/user/
export async function getUsersNotAddedToBoard(board_id) {
    let token = "Token " + localStorage.getItem("token");

    let response = await fetch(
        "http://127.0.0.1:8000/board/user/?board_id=" + board_id, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        }
    );
    let result = await response.json();
    console.log("Response", result);
    return result;
}

// Remove a User from the Board: /board/remove/user/

export async function removeUserFromBoard() {
    let token = "Token " + localStorage.getItem("token");

    let formData = new FormData();
    formData.append("board_id", 3);
    formData.append("user_ids", [3]);

    let response = await fetch("http://127.0.0.1:8000/board/remove/user/", {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: formData,
    });
    let result = await response.json();
    console.log("Response", result);
    return result;
}

export async function getUser(user_id) {
    let token = "Token " + localStorage.getItem("token");

    let response = await fetch(
        "http://127.0.0.1:8000/get/user/?user_id=" + user_id, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        }
    );
    let result = await response.json();
    console.log("Response", result);
    return result;
}

export async function saveChangeCategory(task_id, newCategory) {
    let token = "Token " + localStorage.getItem("token");
    let formData = new FormData();
    formData.append("task_id", task_id);
    formData.append("newCategory", newCategory);

    let response = await fetch("http://127.0.0.1:8000/change/category/", {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: formData,
    });

    let result = await response.json();
    console.log("Response", result);
    return result;
}
export async function saveChangeUrgency(task_id, newUrgency) {
    let token = "Token " + localStorage.getItem("token");
    let formData = new FormData();
    formData.append("task_id", task_id);
    formData.append("newUrgency", newUrgency);

    let response = await fetch("http://127.0.0.1:8000/change/urgency/", {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: formData,
    });

    let result = await response.json();
    console.log("Response", result);
    return result;
}

export async function saveChangeUser(task_id, newUser) {
    let token = "Token " + localStorage.getItem("token");
    let formData = new FormData();
    formData.append("task_id", task_id);
    formData.append("newUser", newUser);

    let response = await fetch("http://127.0.0.1:8000/change/user/", {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: formData,
    });
    let result = await response.json();
    console.log("Response", result);
    return result;
}

export async function deleteTask(task_id) {
    let token = "Token " + localStorage.getItem("token");
    let formData = new FormData();
    formData.append("task_id", task_id);

    let response = await fetch("http://127.0.0.1:8000/delete/user/", {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: formData,
    });
}