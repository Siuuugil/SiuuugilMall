import { useState } from "react";
import { login, me } from "../../js/auth"
import { useNavigate } from "react-router-dom"
import "./loginPage.css"
import MainPage from "../MainPage";

export default function LoginPage() {
    const navigate = useNavigate();
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setMsg("");
        setLoading(true);

        try {
            await login(userid, password);

            localStorage.setItem("loggedInUser", userid);
            navigate("/MainPage");

            setMsg("로그인에 성공하였습니다!")
        } catch (err) {
            setMsg("로그인에 실패하였습니다!");
        } finally {
            setLoading(false);
        }
    }


    return (

        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title">LOGIN</h2>

                <form className="login-form" onSubmit={handleSubmit}>
                    <input value={userid} onChange={(e) => setUserid(e.target.value)} placeholder="아이디를 입력해주세요" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력해주세요" />

                    {msg && <p style={{ color: '#ff5a5a', fontSize: '13px', margin: '0', textAlign: 'left' }}>{msg}</p>}

                    <button className="login-btn" disabled={loading || !userid || !password} type="submit">
                        {loading ? "로그인 중..." : "로그인"}
                    </button>
                </form>

                {/* 추후 로그인 버튼 구현 장소*/}
                <div className="divider"><span>OR</span></div>

                <div className="social-login-group">
                    <button className="social-btn btn-kakao" type="button">카카오로 시작하기</button>
                    <button className="social-btn btn-google" type="button">구글로 시작하기</button>
                </div>
            </div>
        </div>
    )

}