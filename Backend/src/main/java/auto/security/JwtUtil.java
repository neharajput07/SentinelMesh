package auto.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET =
        "sentinelmeshsecretkey12345678901234567890";

    private static final Key SECRET_KEY =
        Keys.hmacShaKeyFor(SECRET.getBytes());

    // Generate token
    public static String generateToken(String email) {

        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(new Date())
            .setExpiration(
                new Date(System.currentTimeMillis()
                    + 1000 * 60 * 60 * 24) // 24 hours
            )
            .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
            .compact();
    }

    // Extract email from token
    public static String extractEmail(String token) {

        Claims claims = Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build()
            .parseClaimsJws(token)
            .getBody();

        return claims.getSubject();
    }

    // Validate token
    public static boolean validateToken(String token) {

        try {
            Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}