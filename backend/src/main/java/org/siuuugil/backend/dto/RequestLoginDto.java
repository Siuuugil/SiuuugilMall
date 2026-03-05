package org.siuuugil.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestLoginDto {
    private String userid;
    private String password;
}