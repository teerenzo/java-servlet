package com.javaChallenge.ehospital.servlets.pharmacistServlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.javaChallenge.ehospital.helpers.JwtHelper;
import com.javaChallenge.ehospital.helpers.ResFormat;
import com.javaChallenge.ehospital.helpers.ResponseEntity;
import com.javaChallenge.ehospital.models.Patient;
import com.javaChallenge.ehospital.models.Pharmacist;
import com.javaChallenge.ehospital.services.PatientServices;
import com.javaChallenge.ehospital.services.PharmacistServices;

import io.jsonwebtoken.Claims;

@WebServlet("/pharmacist/patient")
public class getPharmacistPatientsServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String jwtToken = JwtHelper.extractToken(req);
            Claims claims = JwtHelper.parseJwtToken(jwtToken);

            String pharmacistPhone = claims.get("phoneNumber", String.class);
            Pharmacist pharmacist = PharmacistServices.findPharmacist(pharmacistPhone);

            Patient[] result = PatientServices.getPatientsByPharmacist(pharmacist);
            ResFormat.res(res, new ResponseEntity<Patient[]>("Patient retrieved successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
