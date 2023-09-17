package com.challenge.ehospital.models;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;
import javax.naming.AuthenticationException;

import com.challenge.ehospital.handlers.PharmacistHandlers;
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
public class Pharmacist extends User {
    @NonNull
    private String phoneNumber;

    public Pharmacist(String name, Integer age, String gender, UserRolesEnum role, String password, String phoneNumber) {
        super(name, age, gender, role, password);
        this.phoneNumber = phoneNumber;
        // TODO Auto-generated constructor stub
    }

    @Override
    public ResponseEntity<User> register() throws Exception {
        if (!PasswordUtil.isValidPassword(getPassword(), 9, 10)) {
            throw new Exception("Pharmacist's password must be 9-10 characters");
        }

        PharmacistHandlers.createPharmacist(this);

        return new ResponseEntity<User>("Pharmacist registered successfully!",
                PharmacistHandlers.findPharmacist(getPhoneNumber()));
    }

    @Override
    public ResponseEntity<String> login(String phoneNumber, String Password) throws AuthenticationException {
        Pharmacist existingUser = PharmacistHandlers.findPharmacist(phoneNumber);

        if (existingUser == null)
            throw new AuthenticationException("Incorrect email or password!");

        if (!Password.equals(existingUser.getPassword()))
            throw new AuthenticationException("Incorrect email or password!");
        String secretKey = "mysecretkeymysecretkeymysecretkey";
        Key signingKey = new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS256.getJcaName());
        Claims claims = Jwts.claims().setSubject(existingUser.phoneNumber);
        claims.put("role", existingUser.role.name());
        claims.put("phoneNumber", existingUser.phoneNumber);

        Instant now = Instant.now();

        String jwtToken = Jwts.builder()
                .claim("role", existingUser.role.name())
                .claim("phoneNumber", existingUser.phoneNumber)
                .setSubject(existingUser.phoneNumber)
                .setId(existingUser.id)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(5l, ChronoUnit.HOURS)))
                .signWith(signingKey)
                .compact();

        return new ResponseEntity<String>("User logged in Successfully", jwtToken);
    }
}
