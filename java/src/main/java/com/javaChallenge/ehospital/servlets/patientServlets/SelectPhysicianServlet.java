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
import com.javaChallenge.ehospital.models.Physician;
import com.javaChallenge.ehospital.services.PatientServices;
import com.javaChallenge.ehospital.services.PhysicianServices;

import io.jsonwebtoken.Claims;

@WebServlet("/patient/select-physician")
public class SelectPhysicianServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String requestBody = RequestBodyUtil.getBody(req);
            String physicianEmail = RequestBodyUtil.getKeyFromJson(requestBody, "physicianEmail");

            Physician physician = PhysicianServices.findPhysician(physicianEmail);

            String jwtToken = JwtHelper.extractToken(req);
            Claims claims = JwtHelper.parseJwtToken(jwtToken);

            String patientUsername = claims.get("username", String.class);

            if (physician == null) {
                throw new IllegalArgumentException("Physician not found");
            }
            Patient result = PatientServices.selectPhysician(patientUsername, physician);
            ResFormat.res(res, new ResponseEntity<Patient>("Physician selected successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
