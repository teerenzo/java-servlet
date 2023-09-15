package com.javaChallenge.ehospital.servlets.pharmacistServlets;

import java.io.IOException;
import java.util.Comparator;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.javaChallenge.ehospital.helpers.ResFormat;
import com.javaChallenge.ehospital.helpers.ResponseEntity;
import com.javaChallenge.ehospital.models.Pharmacist;
import com.javaChallenge.ehospital.services.PharmacistServices;


@WebServlet("/pharmacist")
public class PharmacistList extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            Pharmacist[] pharmacists = PharmacistServices.getPharmacists();
            // sort last names - ascending
            Arrays.sort(pharmacists, new Comparator<Pharmacist>() {
                @Override
                public int compare(Pharmacist pharmacist1, Pharmacist pharmacist2) {
                    return pharmacist1.getAge().compareTo(pharmacist2.getAge());
                }
            });
            ResFormat.res(res, new ResponseEntity<Pharmacist[]>("Pharmacists retrieved successfully", pharmacists),
                    HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
