package com.challenge.ehospital.handlers;

import java.util.ArrayList;
import java.util.List;


import com.challenge.ehospital.models.Pharmacist;

import lombok.Getter;

@Getter
public class PharmacistHandlers {

    static DataStore storeServices= new DataStore();

    

    public static void createPharmacist(Pharmacist pharmacist) {
        if (storeServices.pharmacists.get(pharmacist.getPhoneNumber()) != null) {
            throw new RuntimeException("pharmacist already Exists");
        }
        storeServices.pharmacists.put(pharmacist.getPhoneNumber(), pharmacist);
    }

    public static Pharmacist findPharmacist(String phoneNumber) {
        return storeServices.pharmacists.get(phoneNumber);
    }

    public static Pharmacist[] getPharmacists() {
        List<Pharmacist> physicianList = new ArrayList<>(storeServices.pharmacists.values());
        return storeServices.pharmacists.values().toArray(new Pharmacist[physicianList.size()]);
    }

   // getPrescription by pharmacist
   

}
