package com.challenge.ehospital.servlets.pharmacistServlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.handlers.PatientHandlers;
import com.challenge.ehospital.handlers.PharmacistHandlers;
import com.challenge.ehospital.helpers.JwtHelper;
import com.challenge.ehospital.helpers.ResponseType;
import com.challenge.ehospital.helpers.ResponseEntity;
import com.challenge.ehospital.models.Patient;
import com.challenge.ehospital.models.Pharmacist;

import io.jsonwebtoken.Claims;

@WebServlet("/pharmacist/patient")
public class getPharmacistPatientsServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String jwtToken = JwtHelper.extractToken(req);
            Claims claims = JwtHelper.parseJwtToken(jwtToken);

            String pharmacistPhone = claims.get("phoneNumber", String.class);
            Pharmacist pharmacist = PharmacistHandlers.findPharmacist(pharmacistPhone);

            Patient[] result = PatientHandlers.getPatientsByPharmacist(pharmacist);
            ResponseType.res(res, new ResponseEntity<Patient[]>("Patient retrieved successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResponseType.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
