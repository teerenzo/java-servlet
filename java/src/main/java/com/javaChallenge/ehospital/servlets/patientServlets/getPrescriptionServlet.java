package com.javaChallenge.ehospital.servlets.patientServlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.javaChallenge.ehospital.helpers.JwtHelper;
import com.javaChallenge.ehospital.helpers.ResFormat;
import com.javaChallenge.ehospital.helpers.ResponseEntity;
import com.javaChallenge.ehospital.models.Medicine;
import com.javaChallenge.ehospital.models.Patient;
import com.javaChallenge.ehospital.services.PatientServices;

import io.jsonwebtoken.Claims;

@WebServlet("/patient/prescription")
public class getPrescriptionServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String jwtToken = JwtHelper.extractToken(req);
            Claims claims = JwtHelper.parseJwtToken(jwtToken);

            String patientUsername = claims.get("username", String.class);
            Patient patient = PatientServices.findPatient(patientUsername);

            Medicine[] result = PatientServices.getPrescriptionByPatient(patient);
            ResFormat.res(res, new ResponseEntity<Medicine[]>("Consultation retrieved successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }

}
