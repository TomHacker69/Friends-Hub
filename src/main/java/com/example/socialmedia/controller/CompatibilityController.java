package com.example.socialmedia.controller;

import com.example.socialmedia.dto.CompatibilityResponse;
import com.example.socialmedia.service.CompatibilityService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/compatibility")
public class CompatibilityController {

    private final CompatibilityService compatibilityService;

    public CompatibilityController(CompatibilityService compatibilityService) {
        this.compatibilityService = compatibilityService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CompatibilityResponse> getCompatibility(
            @PathVariable Long userId,
            Authentication authentication) {
        return ResponseEntity.ok(compatibilityService.getCompatibility(userId, authentication.getName()));
    }
}