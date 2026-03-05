package org.siuuugil.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.siuuugil.backend.domain.User;
import org.siuuugil.backend.dto.RequestLoginDto;
import org.siuuugil.backend.dto.RequestUserDto;
import org.siuuugil.backend.dto.ResponseUserDto;
import org.siuuugil.backend.enums.UserRole;
import org.siuuugil.backend.repository.UserRepository;
import org.siuuugil.backend.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public ResponseUserDto signUp(RequestUserDto requestDto) {
        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());

        if (userRepository.existsByUserid(requestDto.getUserid())) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }

        User user = new User();
        user.setUserid(requestDto.getUserid());
        user.setPassword(encodedPassword);
        user.setEmail(requestDto.getEmail());
        user.setUsername(requestDto.getUsername());
        user.setPhone(requestDto.getPhone());
        user.setAddress(requestDto.getAddress());
        user.setRole(UserRole.USER); // 기본은 일반 유저

        User savedUser= userRepository.save(user);

        ResponseUserDto response = new ResponseUserDto();
        response.setId(savedUser.getId());
        response.setUserid(savedUser.getUserid());
        response.setUsername(savedUser.getUsername());
        response.setCreatedAt(savedUser.getCreatedAt());

        return response;



    }

    // 로그인 로직
    public String login(RequestLoginDto requestDto) {

        User user = userRepository.findByUserid(requestDto.getUserid())
                .orElseThrow(() -> new RuntimeException("가입되지 않은 아이디입니다."));

        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        return jwtUtil.createToken(user.getUserid(), user.getRole().name());
    }
}
