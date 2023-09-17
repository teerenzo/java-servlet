package com.challenge.ehospital.servlets.physicianServlets;

import java.io.IOException;
import java.util.Comparator;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.handlers.PhysicianHandlers;
import com.challenge.ehospital.helpers.ResponseType;
import com.challenge.ehospital.helpers.ResponseEntity;
import com.challenge.ehospital.models.Physician;
import com.challenge.ehospital.models.User;


@WebServlet("/physician")
public class PhysiciansList extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            Physician[] physicians = PhysicianHandlers.getPhysicians();
            // sort last names - ascending
            Arrays.sort(physicians, new Comparator<Physician>() {
                @Override
                public int compare(Physician physician1, Physician physician2) {
                    return physician1.getName().compareTo(physician2.getName());
                }
            });
            ResponseType.res(res, new ResponseEntity<User[]>("Physicians retrieved successfully", physicians),
                    HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseType.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
