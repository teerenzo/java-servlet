package com.challenge.ehospital.servlets.physicianServlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.handlers.PatientHandlers;
import com.challenge.ehospital.handlers.PhysicianHandlers;
import com.challenge.ehospital.helpers.JwtHelper;
import com.challenge.ehospital.helpers.RequestBodyUtil;
import com.challenge.ehospital.helpers.ResponseType;
import com.challenge.ehospital.helpers.ResponseEntity;
import com.challenge.ehospital.models.Consultation;
import com.challenge.ehospital.models.Patient;
import com.challenge.ehospital.models.Physician;

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
            Physician physician = PhysicianHandlers.findPhysician(physicianEmail);

            Consultation consultation = new Consultation(diseaseName, physician, description);

            Patient patient = PatientHandlers.findPatient(patientUsername);
            if (patient == null) {
                throw new IllegalArgumentException("Patient not found");
            }

            if (patient.getSelectedPhysician() != physician) {
                ResponseType.res(res,
                        new ResponseEntity<>("An Authorized, Physician is not selected", null),
                        HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            Patient result = PatientHandlers.getConsultation(patientUsername, consultation);
            ResponseType.res(res, new ResponseEntity<Patient>("Consultation gived to patient successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResponseType.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
