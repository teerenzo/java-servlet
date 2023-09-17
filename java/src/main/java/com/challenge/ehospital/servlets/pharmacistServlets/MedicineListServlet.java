package com.challenge.ehospital.servlets.pharmacistServlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.handlers.MedicineHandlers;
import com.challenge.ehospital.handlers.PharmacistHandlers;
import com.challenge.ehospital.helpers.JwtHelper;
import com.challenge.ehospital.helpers.ResponseType;
import com.challenge.ehospital.helpers.ResponseEntity;
import com.challenge.ehospital.models.Medicine;
import com.challenge.ehospital.models.Pharmacist;

import io.jsonwebtoken.Claims;

@WebServlet("/pharmacist/get-medicine")
public class MedicineListServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String jwtToken = JwtHelper.extractToken(req);
            Claims claims = JwtHelper.parseJwtToken(jwtToken);

            String pharmacistPhone = claims.get("phoneNumber", String.class);
            Pharmacist pharmacist = PharmacistHandlers.findPharmacist(pharmacistPhone);

            if (pharmacist == null) {
                throw new IllegalArgumentException("Unauthorized");
            }

            Medicine[] results = MedicineHandlers.getMedicines();
            ResponseType.res(res, new ResponseEntity<Medicine[]>("Medicines retrieved successfully", results),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResponseType.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
    
}
