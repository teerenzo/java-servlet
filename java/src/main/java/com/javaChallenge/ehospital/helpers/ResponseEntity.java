package com.javaChallenge.ehospital.helpers;


import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ResponseEntity<T> {
    String message;
    T payload;
}
