package com.javaChallenge.ehospital.servlets.physicianServlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.javaChallenge.ehospital.helpers.JwtHelper;
import com.javaChallenge.ehospital.helpers.RequestBodyUtil;
import com.javaChallenge.ehospital.helpers.ResFormat;
import com.javaChallenge.ehospital.helpers.ResponseEntity;
import com.javaChallenge.ehospital.models.Consultation;
import com.javaChallenge.ehospital.models.Patient;
import com.javaChallenge.ehospital.models.Physician;
import com.javaChallenge.ehospital.services.PatientServices;
import com.javaChallenge.ehospital.services.PhysicianServices;

import io.jsonwebtoken.Claims;

@WebServlet("/physician/consultation")
public class GivePatientConsultationServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String requestBody = RequestBodyUtil.getBody(req);
            String diseaseName = RequestBodyUtil.getKeyFromJson(requestBody, "diseaseName");
            String description = RequestBodyUtil.getKeyFromJson(requestBody, "description");
            String patientUsername = RequestBodyUtil.getKeyFromJson(requestBody, "patientUsername");

            String jwtToken = JwtHelper.extractToken(req);
            Claims claims = JwtHelper.parseJwtToken(jwtToken);

            String physicianEmail = claims.get("email", String.class);
            Physician physician = PhysicianServices.findPhysician(physicianEmail);

            Consultation consultation = new Consultation(diseaseName, physician, description);

            Patient patient = PatientServices.findPatient(patientUsername);
            if (patient == null) {
                throw new IllegalArgumentException("Patient not found");
            }

            if (patient.getSelectedPhysician() != physician) {
                ResFormat.res(res,
                        new ResponseEntity<>("An Authorized, Physician is not selected", null),
                        HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            Patient result = PatientServices.getConsultation(patientUsername, consultation);
            ResFormat.res(res, new ResponseEntity<Patient>("Consultation gived to patient successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
