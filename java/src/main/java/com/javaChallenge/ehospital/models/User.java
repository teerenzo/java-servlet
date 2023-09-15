package com.javaChallenge.ehospital.models;

import java.util.UUID;

import javax.naming.AuthenticationException;

import com.google.gson.annotations.Expose;
import com.javaChallenge.ehospital.helpers.ResponseEntity;
import com.javaChallenge.ehospital.helpers.UserRolesEnum;
import com.javaChallenge.ehospital.interfaces.UserInterface;

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
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'register'");
    }

    @Override
    public ResponseEntity<String> login(String email, String Password) throws AuthenticationException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }

}