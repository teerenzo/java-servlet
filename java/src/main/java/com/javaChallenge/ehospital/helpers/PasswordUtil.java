package com.javaChallenge.ehospital.helpers;

public class PasswordUtil {
    public static boolean isValidPassword(String password, int minLength, int maxLength) {
        // Check length requirements
        if (password.length() < minLength || password.length() > maxLength) {
            return false;
        }
        return true;
    }

}