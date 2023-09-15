package com.javaChallenge.ehospital.interfaces;

import javax.naming.AuthenticationException;

import com.javaChallenge.ehospital.helpers.ResponseEntity;
import com.javaChallenge.ehospital.models.User;

public interface UserInterface {
    public abstract ResponseEntity<User> register() throws Exception;
    public abstract ResponseEntity<String> login(String email, String Password) throws AuthenticationException;
}
