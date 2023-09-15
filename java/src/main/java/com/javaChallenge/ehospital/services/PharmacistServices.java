package com.javaChallenge.ehospital.services;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.javaChallenge.ehospital.models.Pharmacist;

import lombok.Getter;

@Getter
public class PharmacistServices {
    private static Map<String, Pharmacist> pharmacists = new LinkedHashMap<>();

    public static void createPharmacist(Pharmacist pharmacist) {
        if (pharmacists.get(pharmacist.getPhoneNumber()) != null) {
            throw new RuntimeException("pharmacist already Exists");
        }
        pharmacists.put(pharmacist.getPhoneNumber(), pharmacist);
    }

    public static Pharmacist findPharmacist(String phoneNumber) {
        return pharmacists.get(phoneNumber);
    }

    public static Pharmacist[] getPharmacists() {
        List<Pharmacist> physicianList = new ArrayList<>(pharmacists.values());
        return pharmacists.values().toArray(new Pharmacist[physicianList.size()]);
    }

    // upload medicine in medicine.csv
    

    

    // public static List<User> findAllUsers() {
    // return new ArrayList<>(users.values());
    // }

    // public static User[] getPhysicians() {
    // List<User> physicians = new ArrayList<>();
    // for (User user : users.values()) {
    // if (user.getRole().equals(UserRoles.Physician)) {
    // physicians.add(user);
    // }
    // }

    // return physicians.toArray(new User[physicians.size()]);
    // }

    // public static Pharmacist[] getPharmacists() {
    // List<User> pharmacists = new ArrayList<>();
    // for (User user : users.values()) {
    // if (user.getRole().equals(UserRoles.Pharmacist)) {
    // pharmacists.add(user);
    // }
    // }

    // return pharmacists.toArray(new Pharmacist[pharmacists.size()]);
    // }

}
