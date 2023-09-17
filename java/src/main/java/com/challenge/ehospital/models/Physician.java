package com.challenge.ehospital.models;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;
import javax.naming.AuthenticationException;

import com.challenge.ehospital.handlers.PhysicianHandlers;
import com.challenge.ehospital.helpers.PasswordUtil;
import com.challenge.ehospital.helpers.ResponseEntity;
import com.challenge.ehospital.helpers.UserRolesEnum;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class Physician extends User {
    @NonNull
    private String email;

    public Physician(String name, Integer age, String gender, UserRolesEnum role, String password, String email) {
        super(name, age, gender, role, password);
        this.email = email;
    }

    @Override
    public ResponseEntity<User> register() throws Exception {
        if (!PasswordUtil.isValidPassword(getPassword(), 7, 8)) {
            throw new Exception("Physician's password must be 7-8 characters");
        }

        PhysicianHandlers.createPharmacist(this);

        return new ResponseEntity<User>("Physician registered successfully!",
                PhysicianHandlers.findPhysician(getEmail()));
    }

    @Override
    public ResponseEntity<String> login(String email, String Password) throws AuthenticationException {
        Physician existingUser = PhysicianHandlers.findPhysician(email);

        if (existingUser == null)
            throw new AuthenticationException("Incorrect email or password!");

        if (!Password.equals(existingUser.getPassword()))
            throw new AuthenticationException("Incorrect email or password!");

        String secretKey = "mysecretkeymysecretkeymysecretkey";
        Key signingKey = new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS256.getJcaName());

        Claims claims = Jwts.claims().setSubject(existingUser.email);
        claims.put("role", existingUser.role.name());
        claims.put("email", existingUser.email);

        Instant now = Instant.now();

        String jwtToken = Jwts.builder()
                .claim("role", existingUser.role.name())
                .claim("email", existingUser.email)
                .setSubject(existingUser.email)
                .setId(existingUser.id)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(5l, ChronoUnit.HOURS)))
                .signWith(signingKey)
                .compact();

        return new ResponseEntity<String>("Physician logged in Successfully", jwtToken);
    }

}
