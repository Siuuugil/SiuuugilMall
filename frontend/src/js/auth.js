import { api } from "./axios";


export async function login(userid, password) {
  const response = await api.post("/api/login",{userid,password});
  const token = response.data;
  localStorage.setItem("token",token);
  return response;
}

export function me() {
  console.log("구현 중");
  //return api.get("/api/users/me"); // 백엔드에서 로그인 여부 확인용
}

export function logout() {
  localStorage.removeItem("token");
  alert("로그아웃 되었습니다!");
}

//회원가입
export async function signup(formData) {
  const response = await api.post("/api/signup", formData);
  return response;
}
