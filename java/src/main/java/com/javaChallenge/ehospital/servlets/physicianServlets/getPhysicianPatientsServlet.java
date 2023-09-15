package com.javaChallenge.ehospital.servlets.physicianServlets;

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
import com.javaChallenge.ehospital.models.Physician;
import com.javaChallenge.ehospital.services.PatientServices;
import com.javaChallenge.ehospital.services.PhysicianServices;

import io.jsonwebtoken.Claims;

@WebServlet("/physician/patient")
public class getPhysicianPatientsServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String jwtToken = JwtHelper.extractToken(req);
            Claims claims = JwtHelper.parseJwtToken(jwtToken);

            String physicianEmail = claims.get("email", String.class);
            Physician physician = PhysicianServices.findPhysician(physicianEmail);

            Patient[] result = PatientServices.getPatientsByPhysician(physician);
            ResFormat.res(res, new ResponseEntity<Patient[]>("Patient retrieved successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
