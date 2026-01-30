import { api } from "./axios";

export function login(email, password) {
  return api.post("/api/auth/login", { email, password });
}

export function me() {
  return api.get("/api/users/me"); // 백엔드에서 로그인 여부 확인용
}

export function logout() {
  return api.post("/api/auth/logout"); // 서버에서 세션/쿠키 무효화
}
