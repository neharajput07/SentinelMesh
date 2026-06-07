package auto.controller;

import auto.dto.LoginRequest;
import auto.dto.LoginResponse;
import auto.entity.User;
import auto.repository.UserRepository;
import auto.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
private BCryptPasswordEncoder passwordEncoder;

    // TEST API
    @GetMapping("/hello")
    public String hello() {
        return "SentinelMesh Backend Running";
    }

    // SIGNUP API
    @PostMapping("/signup")
    public ResponseEntity<String> signup(
        @RequestBody User user
    ) {
        // Check if email already exists
        User existing = userRepository
            .findByEmail(user.getEmail());

        if (existing != null) {
            return ResponseEntity
                .badRequest()
                .body("Email already registered");
        }

        user.setPassword(
    passwordEncoder.encode(user.getPassword())
);
userRepository.save(user);

        return ResponseEntity.ok(
            "User Registered Successfully"
        );
    }

    // LOGIN API
    @PostMapping("/login")
    public ResponseEntity<?> login(
        @RequestBody LoginRequest loginRequest
    ) {
        // Find user by email
        User user = userRepository
            .findByEmail(loginRequest.getEmail());

        // User not found
        if (user == null) {
            return ResponseEntity
                .badRequest()
                .body("User Not Found");
        }

        // Wrong password
        if (!passwordEncoder.matches(
    loginRequest.getPassword(),
    user.getPassword()
)) {
    return ResponseEntity
        .badRequest()
        .body("Invalid Password");
}

        // Generate JWT token
        String token = JwtUtil.generateToken(
            user.getEmail()
        );

        // Return token + email
        return ResponseEntity.ok(
            new LoginResponse(token, user.getEmail())
        );
    }
}