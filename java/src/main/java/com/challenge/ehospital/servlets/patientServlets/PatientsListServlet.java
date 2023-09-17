package com.challenge.ehospital.servlets.patientServlets;

import java.io.IOException;
import java.util.Comparator;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.handlers.PatientHandlers;
import com.challenge.ehospital.helpers.ResponseType;
import com.challenge.ehospital.helpers.ResponseEntity;
import com.challenge.ehospital.models.Patient;


@WebServlet("/patient")
public class PatientsListServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            Patient[] patients = PatientHandlers.getPatients();
            Arrays.sort(patients, new Comparator<Patient>() {
                @Override
                public int compare(Patient patient1, Patient patient2) {
                    return patient1.getName().compareTo(patient2.getName());
                }
            });
            ResponseType.res(res, new ResponseEntity<Patient[]>("Patients retrieved successfully", patients),
                    HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseType.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
