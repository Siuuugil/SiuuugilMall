package org.siuuugil.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ResponseUserDto {

    private Long id;
    private String userid;
    private String email;
    private String username;
    private String role;
    private LocalDateTime createdAt;
}
