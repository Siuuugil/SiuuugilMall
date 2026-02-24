import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { signup } from '../../js/auth';
import './signUp.css'; 

const SignUp = () => {
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        userid: '',
        password: '',
        username: '',
        phone: '',
        email: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        try {
            
          const response = await signup(formData);
            
            alert(`회원가입 성공! ${response.data.username}님 환영합니다.`);
            navigate('/login'); 
            
        } catch (error) {
            console.error('가입 중 에러 발생:', error);
            alert('가입 실패! 다시 시도해주세요.');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2 className="signup-title">SIGN UP</h2>
                
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input name="userid" placeholder="아이디" onChange={handleChange} required />
                    <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} required />
                    <input name="username" placeholder="이름" onChange={handleChange} required />
                    <input name="email" type="email" placeholder="이메일" onChange={handleChange} required />
                    <input name="phone" placeholder="전화번호 ('-' 제외)" onChange={handleChange} required />
                    <input name="address" placeholder="주소 (선택)" onChange={handleChange} />
                    
                    <button className="signup-btn" type="submit">가입하기</button>
                </form>

                {/* 추후 추가할 소셜 회원가입 영역 */}
                <div className="divider"><span>OR</span></div>
                
                <div className="social-login-group">
                    <button className="social-btn btn-kakao" type="button">카카오로 가입하기</button>
                    <button className="social-btn btn-google" type="button">구글로 가입하기</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;