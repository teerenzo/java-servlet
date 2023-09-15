package com.javaChallenge.ehospital.servlets.physicianServlets;

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
import com.javaChallenge.ehospital.models.Physician;
import com.javaChallenge.ehospital.models.User;
import com.javaChallenge.ehospital.services.PhysicianServices;


@WebServlet("/physician")
public class PhysiciansList extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            Physician[] physicians = PhysicianServices.getPhysicians();
            // sort last names - ascending
            Arrays.sort(physicians, new Comparator<Physician>() {
                @Override
                public int compare(Physician physician1, Physician physician2) {
                    return physician1.getName().compareTo(physician2.getName());
                }
            });
            ResFormat.res(res, new ResponseEntity<User[]>("Physicians retrieved successfully", physicians),
                    HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
