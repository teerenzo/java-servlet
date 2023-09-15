package com.javaChallenge.ehospital.servlets.userServlets;

import java.io.IOException;

import javax.naming.AuthenticationException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.javaChallenge.ehospital.helpers.JSONUtil;
import com.javaChallenge.ehospital.helpers.RequestBodyUtil;
import com.javaChallenge.ehospital.helpers.ResFormat;
import com.javaChallenge.ehospital.helpers.ResponseEntity;
import com.javaChallenge.ehospital.models.Patient;
import com.javaChallenge.ehospital.models.Pharmacist;
import com.javaChallenge.ehospital.models.Physician;
import com.javaChallenge.ehospital.models.User;

@WebServlet("/signup")
public class SignUpServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String requestBody = RequestBodyUtil.getBody(req);
            String role = RequestBodyUtil.getKeyFromJson(requestBody, "role");
            User user = null;

            if (role.equals("Patient")) {
                user = new JSONUtil().fromJson(requestBody, Patient.class);
            } else if (role.equals("Physician")) {
                user = new JSONUtil().fromJson(requestBody, Physician.class);
            } else if (role.equals("Pharmacist")) {
                user = new JSONUtil().fromJson(requestBody, Pharmacist.class);
            } else {
                throw new IllegalArgumentException("Invalid user role ");
            }

            ResponseEntity<User> result = user.register();
            ResFormat.res(res, result, HttpServletResponse.SC_OK);

        } catch (AuthenticationException e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_BAD_REQUEST);
        }
    }

}
