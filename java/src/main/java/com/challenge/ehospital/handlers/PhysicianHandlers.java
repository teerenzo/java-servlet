package com.challenge.ehospital.handlers;

import java.util.ArrayList;
import java.util.List;


import com.challenge.ehospital.models.Physician;

import lombok.Getter;

@Getter
public class PhysicianHandlers {

    static DataStore storeServices= new DataStore();

 
    public static void createPharmacist(Physician physician) {
        if (storeServices.physicians.get(physician.getEmail()) != null) {
            throw new RuntimeException("physician already Exists");
        }
        storeServices.physicians.put(physician.getEmail(), physician);
    }

    public static Physician findPhysician(String email) {
        return storeServices.physicians.get(email);
    }

    public static Physician[] getPhysicians() {
        List<Physician> physicianList = new ArrayList<>(storeServices.physicians.values());
        return storeServices.physicians.values().toArray(new Physician[physicianList.size()]);
    }


}
