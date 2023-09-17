package com.challenge.ehospital.helpers;
import java.security.Key;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;

import com.challenge.ehospital.contraints.AppContraints;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtHelper{
    static AppContraints appConstraint = new AppContraints();
     
    public static String extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || authHeader.isEmpty()) {
            throw new IllegalArgumentException("Authorization header is missing");
        }

        if (!authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header format");
        }

        String jwtToken = authHeader.substring(7);
        return jwtToken;
    }

    public static Claims parseJwtToken(String jwtToken) {

        Key signingKey = new SecretKeySpec(appConstraint.secretKey.getBytes(), SignatureAlgorithm.HS256.getJcaName());

        // Parse the JWT token and retrieve the claims
        JwtParser jwtParser = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build();
        Claims claims = jwtParser.parseClaimsJws(jwtToken).getBody();

        return claims;
    }
}