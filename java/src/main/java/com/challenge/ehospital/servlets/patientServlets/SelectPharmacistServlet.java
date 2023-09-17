package com.challenge.ehospital.servlets.patientServlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.handlers.PatientHandlers;
import com.challenge.ehospital.handlers.PharmacistHandlers;
import com.challenge.ehospital.helpers.JwtHelper;
import com.challenge.ehospital.helpers.RequestBodyUtil;
import com.challenge.ehospital.helpers.ResponseType;
import com.challenge.ehospital.helpers.ResponseEntity;
import com.challenge.ehospital.models.Patient;
import com.challenge.ehospital.models.Pharmacist;

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
            Pharmacist pharmacist = PharmacistHandlers.findPharmacist(pharmacistPhone);

            if (pharmacist == null) {
                throw new IllegalArgumentException("Pharmacist not found");
            }

            Patient result = PatientHandlers.selectPharmacist(patientUsername, pharmacist);
            ResponseType.res(res, new ResponseEntity<Patient>("Physician selected successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResponseType.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
