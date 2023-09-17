package com.challenge.ehospital.models;

import java.util.UUID;

import javax.naming.AuthenticationException;

import com.challenge.ehospital.helpers.ResponseEntity;
import com.challenge.ehospital.helpers.UserRolesEnum;
import com.challenge.ehospital.interfaces.UserInterface;
import com.google.gson.annotations.Expose;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class User implements UserInterface{
    public String id;
    @NonNull
    public String name;
    @NonNull
    public String gender;
    @NonNull
    protected UserRolesEnum role;
    private Integer age;
    @Expose(serialize = false)
    private String password;

    public User(String name,Integer age,String gender,UserRolesEnum role,String password) {
        id = UUID.randomUUID().toString();
        this.name = name;
        this.age = age;
        this.gender=gender;
        this.role = role;
        this.password = password;

    }

    @Override
    public ResponseEntity<User> register() throws Exception {
        throw new UnsupportedOperationException("Unimplemented method 'register'");
    }

    @Override
    public ResponseEntity<String> login(String email, String Password) throws AuthenticationException {
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }

}