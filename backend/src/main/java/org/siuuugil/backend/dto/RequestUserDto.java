package org.siuuugil.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestUserDto {

    private String userid;
    private String password;
    private String username;
    private String phone;
    private String email;
    private String address;
}
