package com.javaChallenge.ehospital.servlets.patientServlets;

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
import com.javaChallenge.ehospital.models.Patient;
import com.javaChallenge.ehospital.models.Pharmacist;
import com.javaChallenge.ehospital.services.PatientServices;
import com.javaChallenge.ehospital.services.PharmacistServices;

import io.jsonwebtoken.Claims;

@WebServlet("/patient/select-pharmacist")
public class SelectPharmacistServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String requestBody = RequestBodyUtil.getBody(req);
            String pharmacistPhone = RequestBodyUtil.getKeyFromJson(requestBody, "pharmacistPhone");

            String jwtToken = JwtHelper.extractToken(req);
            Claims claims = JwtHelper.parseJwtToken(jwtToken);

            String patientUsername = claims.get("username", String.class);
            Pharmacist pharmacist = PharmacistServices.findPharmacist(pharmacistPhone);

            if (pharmacist == null) {
                throw new IllegalArgumentException("Pharmacist not found");
            }

            Patient result = PatientServices.selectPharmacist(patientUsername, pharmacist);
            ResFormat.res(res, new ResponseEntity<Patient>("Physician selected successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
