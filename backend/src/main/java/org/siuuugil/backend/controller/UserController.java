package org.siuuugil.backend.controller;

import lombok.RequiredArgsConstructor;
import org.siuuugil.backend.dto.RequestLoginDto;
import org.siuuugil.backend.dto.RequestUserDto;
import org.siuuugil.backend.dto.ResponseUserDto;
import org.siuuugil.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ResponseUserDto> signup(@RequestBody RequestUserDto requestUserDto) {
        ResponseUserDto response = userService.signUp(requestUserDto);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody RequestLoginDto requestLoginDto) {
        String result = userService.login(requestLoginDto);
        return ResponseEntity.ok(result);
    }


}

