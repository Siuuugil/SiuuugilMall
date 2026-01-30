package org.siuuugil.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.siuuugil.backend.domain.User;
import org.siuuugil.backend.dto.RequestUserDto;
import org.siuuugil.backend.dto.ResponseUserDto;
import org.siuuugil.backend.enums.UserRole;
import org.siuuugil.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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
}
