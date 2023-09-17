package com.challenge.ehospital.servlets.patientServlets;

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
import com.challenge.ehospital.models.Patient;
import com.challenge.ehospital.models.Physician;

import io.jsonwebtoken.Claims;

@WebServlet("/patient/select-physician")
public class SelectPhysicianServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String requestBody = RequestBodyUtil.getBody(req);
            String physicianEmail = RequestBodyUtil.getKeyFromJson(requestBody, "physicianEmail");

            Physician physician = PhysicianHandlers.findPhysician(physicianEmail);

            String jwtToken = JwtHelper.extractToken(req);
            Claims claims = JwtHelper.parseJwtToken(jwtToken);

            String patientUsername = claims.get("username", String.class);

            if (physician == null) {
                throw new IllegalArgumentException("Physician not found");
            }
            Patient result = PatientHandlers.selectPhysician(patientUsername, physician);
            ResponseType.res(res, new ResponseEntity<Patient>("Physician selected successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResponseType.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
