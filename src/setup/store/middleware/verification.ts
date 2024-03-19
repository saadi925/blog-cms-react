export async function prepareHeaders(headers: Headers) {
  const token = localStorage.getItem("token");
  console.log("token", token);

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return headers;
}
