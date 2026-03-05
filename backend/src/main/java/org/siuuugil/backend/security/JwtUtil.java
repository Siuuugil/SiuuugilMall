package org.siuuugil.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // 토큰에 사용할 암호화 키
    private final Key key;

    // 토큰 유효 시간 1시간 설정
    private final long exp = 1000L * 60 * 60;

    // 숨겨둔 키 값 불러오기
    public JwtUtil(@Value("${jwt.secret}") String secretKey) {
        // 불러온 문자열 암호를 JWT가 사용할 수 있는 진짜 '키(Key)' 객체로 변환
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }
    // JWT 토큰 생성 메서드
    public String createToken(String userid, String role) {
        return Jwts.builder()
                .setSubject(userid) // 토큰 받을 id
                .claim("role", role) // 권한
                .setIssuedAt(new Date()) // 토큰 발행 시간
                .setExpiration(new Date(System.currentTimeMillis() + exp)) // 토큰 만료 시간
                .signWith(key) // 암호화 키로 서명
                .compact(); // 토큰 문자열로 압축해서 반환
    }
}