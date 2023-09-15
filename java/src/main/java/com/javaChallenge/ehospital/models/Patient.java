package com.javaChallenge.ehospital.models;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;
import javax.naming.AuthenticationException;

import com.javaChallenge.ehospital.helpers.PasswordUtil;
import com.javaChallenge.ehospital.helpers.ResponseEntity;
import com.javaChallenge.ehospital.helpers.UserRolesEnum;
import com.javaChallenge.ehospital.services.PatientServices;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class Patient extends User {
    @NonNull
    private String username;
    private Medicine[] prescription;
    private Pharmacist selectedPharmacist;
    private Physician selectedPhysician;
    private Consultation consultation;

    public Patient(String name, Integer age, String gender, UserRolesEnum role, String password, String username) {
        super(name, age, gender, role, password);
        this.username = username;
        // TODO Auto-generated constructor stub
    }

    @Override
    public ResponseEntity<User> register() throws Exception {

        if (!PasswordUtil.isValidPassword(getPassword(), 4, 6)) {
            throw new Exception("Patient's password must be 4-6 characters");
        }

        PatientServices.createPatient(this);
        return new ResponseEntity<User>("Patient registered successfully!", PatientServices.findPatient(getUsername()));
    }

    @Override
    public ResponseEntity<String> login(String username, String Password) throws AuthenticationException {
        Patient existingUser = PatientServices.findPatient(username);

        if (existingUser == null)
            throw new AuthenticationException("Incorrect username or password!");

        if (!Password.equals(existingUser.getPassword()))
            throw new AuthenticationException("Incorrect username or password!");
        String secretKey = "mysecretkeymysecretkeymysecretkey";
        Key signingKey = new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS256.getJcaName());

        Claims claims = Jwts.claims().setSubject(existingUser.username);
        claims.put("role", existingUser.role.name());
        claims.put("username", existingUser.username);

        Instant now = Instant.now();

        String jwtToken = Jwts.builder()
                .claim("role", existingUser.role.name())
                .claim("username", existingUser.username)
                .setSubject(existingUser.username)
                .setId(existingUser.id)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(5l, ChronoUnit.HOURS)))
                .signWith(signingKey)
                .compact();

        return new ResponseEntity<String>("User logged in Successfully", jwtToken);
    }

    public void setSelectedPhysician(Physician physician) {
        this.selectedPhysician = physician;
    }

    public void setSelectedPharmacist(Pharmacist pharmacist) {
        this.selectedPharmacist = pharmacist;
    }

    public void setConsultation(Consultation consultation) {
        this.consultation = consultation;
    }

    public void setPrescription(Medicine prescription) {
        if (this.prescription == null) {
            this.prescription = new Medicine[] { prescription };
        } else {
            Medicine[] newPrescription = new Medicine[this.prescription.length + 1];
            System.arraycopy(this.prescription, 0, newPrescription, 0, this.prescription.length);
            newPrescription[newPrescription.length - 1] = prescription;
            this.prescription = newPrescription;
        }
    }
}
