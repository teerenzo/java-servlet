package com.challenge.ehospital.servlets.patientServlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.handlers.PatientHandlers;
import com.challenge.ehospital.helpers.JwtHelper;
import com.challenge.ehospital.helpers.ResponseType;
import com.challenge.ehospital.helpers.ResponseEntity;
import com.challenge.ehospital.models.Medicine;
import com.challenge.ehospital.models.Patient;

import io.jsonwebtoken.Claims;

@WebServlet("/patient/prescription")
public class getPrescriptionServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String jwtToken = JwtHelper.extractToken(req);
            Claims claims = JwtHelper.parseJwtToken(jwtToken);

            String patientUsername = claims.get("username", String.class);
            Patient patient = PatientHandlers.findPatient(patientUsername);

            Medicine[] result = PatientHandlers.getPrescriptionByPatient(patient);
            ResponseType.res(res, new ResponseEntity<Medicine[]>("Consultation retrieved successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResponseType.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }

}
