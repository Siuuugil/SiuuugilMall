import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import SignUp from "./pages/login/signUp";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/MainPage" element={<MainPage />}/>
      <Route path="*" element={<Navigate to="/MainPage" replace />} />
    </Routes>
  );
}
