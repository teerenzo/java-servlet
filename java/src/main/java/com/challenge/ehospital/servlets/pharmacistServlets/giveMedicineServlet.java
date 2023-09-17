package com.challenge.ehospital.servlets.pharmacistServlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.handlers.MedicineHandlers;
import com.challenge.ehospital.handlers.PatientHandlers;
import com.challenge.ehospital.handlers.PharmacistHandlers;
import com.challenge.ehospital.helpers.JwtHelper;
import com.challenge.ehospital.helpers.RequestBodyUtil;
import com.challenge.ehospital.helpers.ResponseType;
import com.challenge.ehospital.helpers.ResponseEntity;
import com.challenge.ehospital.models.Medicine;
import com.challenge.ehospital.models.Patient;
import com.challenge.ehospital.models.Pharmacist;

import io.jsonwebtoken.Claims;

@WebServlet("/pharmacist/provide-medicine")
public class giveMedicineServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String jwtToken = JwtHelper.extractToken(req);
            Claims claims = JwtHelper.parseJwtToken(jwtToken);
            String pharmacistPhone = claims.get("phoneNumber", String.class);

            String requestBody = RequestBodyUtil.getBody(req);
            String med = RequestBodyUtil.getKeyFromJson(requestBody, "medicineName");
            String patientUsername = RequestBodyUtil.getKeyFromJson(requestBody, "patientUsername");

            Pharmacist pharmacist = PharmacistHandlers.findPharmacist(pharmacistPhone);
            if (pharmacist == null) {
                ResponseType.res(res, new ResponseEntity<>("Not authorized", null), HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            Patient patient = PatientHandlers.findPatient(patientUsername);
            if (patient == null) {
                throw new IllegalArgumentException("Patient not found");
            }
            if (patient.getSelectedPharmacist() == null) {
                ResponseType.res(res,
                        new ResponseEntity<>("Not authorized, Patient has not selected you as pharmacist", null),
                        HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
            if (patient.getConsultation() == null) {
                throw new IllegalArgumentException("Patient has not consulted a physician");
            }

            Medicine medicine = MedicineHandlers.findMedicine(med);

            if (medicine == null) {
                throw new IllegalArgumentException("Medicine not found");
            }

            Patient result = PatientHandlers.getPerscription(patientUsername, medicine);
            ResponseType.res(res, new ResponseEntity<Patient>("Medic given successful", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResponseType.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
