import { useState } from "react";
import {login, me} from "../../js/auth"
import "./loginPage.css"

export default function LoginPage(){
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault(); 
        setMsg("");
        setLoading(true);

        try {
            await login(email,password);
            const {data}= await me();
            setMsg(`로그인에 성공하였습니다! ${data.username ?? data.email ?? "ok"}`)
        } catch(err){
            setMsg("로그인에 실패하였습니다!");
        } finally {
            setLoading(false);
        }
    }
    

        return (
            
            <div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="email"></input>
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="password"></input>
                    <button disabled={loading || !email || !password} type="submit"> {loading ? "로그인 중..." : "로그인"}</button>
                </form>
                {msg && <p>{msg}</p>}
            </div>
        )

}