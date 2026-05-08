package com.example.socialmedia.dto;

import lombok.Data;

@Data
public class OAuthRequest {
    private String email;
    private String name;
    private String googleId;
}
