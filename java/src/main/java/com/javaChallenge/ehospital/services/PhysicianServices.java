package com.javaChallenge.ehospital.services;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import com.javaChallenge.ehospital.models.Physician;
import lombok.Getter;

@Getter
public class PhysicianServices {
    private static Map<String, Physician> physicians = new LinkedHashMap<>();

    public static void createPharmacist(Physician physician) {
        if (physicians.get(physician.getEmail()) != null) {
            throw new RuntimeException("physician already Exists");
        }
        physicians.put(physician.getEmail(), physician);
    }

    public static Physician findPhysician(String email) {
        return physicians.get(email);
    }

    public static Physician[] getPhysicians() {
        List<Physician> physicianList = new ArrayList<>(physicians.values());
        return physicians.values().toArray(new Physician[physicianList.size()]);
    }

   

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

    // public static Pharmacist[] getphysicians() {
    // List<User> physicians = new ArrayList<>();
    // for (User user : users.values()) {
    // if (user.getRole().equals(UserRoles.Pharmacist)) {
    // physicians.add(user);
    // }
    // }

    // return pharmacists.toArray(new Pharmacist[pharmacists.size()]);
    // }

}
