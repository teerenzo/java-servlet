package com.challenge.ehospital.servlets.pharmacistServlets;

import java.io.IOException;
import java.util.Comparator;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.handlers.PharmacistHandlers;
import com.challenge.ehospital.helpers.ResponseType;
import com.challenge.ehospital.helpers.ResponseEntity;
import com.challenge.ehospital.models.Pharmacist;


@WebServlet("/pharmacist")
public class PharmacistList extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            Pharmacist[] pharmacists = PharmacistHandlers.getPharmacists();
            // sort last names - ascending
            Arrays.sort(pharmacists, new Comparator<Pharmacist>() {
                @Override
                public int compare(Pharmacist pharmacist1, Pharmacist pharmacist2) {
                    return pharmacist1.getAge().compareTo(pharmacist2.getAge());
                }
            });
            ResponseType.res(res, new ResponseEntity<Pharmacist[]>("Pharmacists retrieved successfully", pharmacists),
                    HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseType.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
