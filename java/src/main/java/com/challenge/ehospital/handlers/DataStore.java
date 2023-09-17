package com.challenge.ehospital.handlers;

import java.util.LinkedHashMap;
import java.util.Map;

import com.challenge.ehospital.models.Medicine;
import com.challenge.ehospital.models.Patient;
import com.challenge.ehospital.models.Pharmacist;
import com.challenge.ehospital.models.Physician;

public class DataStore {

    public  Map<String, Medicine> medicines = new LinkedHashMap<>();

    public  Map<String, Patient> patients = new LinkedHashMap<>();

    public  Map<String, Pharmacist> pharmacists = new LinkedHashMap<>();

    public  Map<String, Physician> physicians = new LinkedHashMap<>();



    
    
}
