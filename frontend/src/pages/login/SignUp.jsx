import React, { useState } from 'react'
import axios from 'axios'

const SignUp =  ()=> {
    const [formData,setFormData] = useState({

        userid: '',
        password: '',
        username: '',
        phone: '',
        email: '',
        address: ''
    });

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지
        
        try {
          // 백엔드로 POST 요청 
          const response = await axios.post('http://localhost:8080/api/signup', formData);
          
          alert('회원가입 성공! ' + response.data.username + '님 환영합니다.');
          console.log('서버 응답:', response.data);
        } catch (error) {
          console.error('가입 중 에러 발생:', error);
          alert('가입 실패! 다시 시도해주세요.');
        }
      };

      return (
        <form onSubmit={handleSubmit}>
          <h2>쇼핑몰 회원가입</h2>
          <input name="userid" placeholder="아이디" onChange={handleChange} required /><br/>
          <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} required /><br/>
          <input name="username" placeholder="이름" onChange={handleChange} required /><br/>
          <input name="email" type="email" placeholder="이메일" onChange={handleChange} required /><br/>
          <input name="phone" placeholder="전화번호" onChange={handleChange} required /><br/>
          <input name="address" placeholder="주소(선택)" onChange={handleChange} /><br/>
          <button type="submit">가입하기</button>
        </form>
      );
};
export default SignUp;