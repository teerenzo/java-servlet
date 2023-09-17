package com.challenge.ehospital.interfaces;

import javax.naming.AuthenticationException;

import com.challenge.ehospital.helpers.ResponseEntity;
import com.challenge.ehospital.models.User;

public interface UserInterface {
    public abstract ResponseEntity<User> register() throws Exception;
    public abstract ResponseEntity<String> login(String email, String Password) throws AuthenticationException;
}
