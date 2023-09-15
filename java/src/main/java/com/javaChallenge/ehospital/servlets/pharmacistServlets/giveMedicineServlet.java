package com.javaChallenge.ehospital.servlets.pharmacistServlets;

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
import com.javaChallenge.ehospital.models.Medicine;
import com.javaChallenge.ehospital.models.Patient;
import com.javaChallenge.ehospital.models.Pharmacist;
import com.javaChallenge.ehospital.services.MedicineServices;
import com.javaChallenge.ehospital.services.PatientServices;
import com.javaChallenge.ehospital.services.PharmacistServices;

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

            Pharmacist pharmacist = PharmacistServices.findPharmacist(pharmacistPhone);
            if (pharmacist == null) {
                ResFormat.res(res, new ResponseEntity<>("Not authorized", null), HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            Patient patient = PatientServices.findPatient(patientUsername);
            if (patient == null) {
                throw new IllegalArgumentException("Patient not found");
            }
            if (patient.getSelectedPharmacist() == null) {
                ResFormat.res(res,
                        new ResponseEntity<>("Not authorized, Patient has not selected you as pharmacist", null),
                        HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
            if (patient.getConsultation() == null) {
                throw new IllegalArgumentException("Patient has not consulted a physician");
            }

            Medicine medicine = MedicineServices.findMedicine(med);

            if (medicine == null) {
                throw new IllegalArgumentException("Medicine not found");
            }

            Patient result = PatientServices.getPerscription(patientUsername, medicine);
            ResFormat.res(res, new ResponseEntity<Patient>("Medic given successful", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
