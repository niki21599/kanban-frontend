export async function getUser(user_id) {
  let token = "Token " + localStorage.getItem("tokenKanban");

  let response = await fetch(
    "http://34.147.74.31/get/user/?user_id=" + user_id,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );
  let result = await response.json();

  return result;
}
