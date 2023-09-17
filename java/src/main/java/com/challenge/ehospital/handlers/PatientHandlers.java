package com.challenge.ehospital.handlers;

import java.util.ArrayList;
import java.util.List;


import javax.naming.AuthenticationException;

import com.challenge.ehospital.models.Consultation;
import com.challenge.ehospital.models.Medicine;
import com.challenge.ehospital.models.Patient;
import com.challenge.ehospital.models.Pharmacist;
import com.challenge.ehospital.models.Physician;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientHandlers {

    static DataStore storeServices= new DataStore();

    
    public static void createPatient(Patient patient) {
        if (storeServices.patients.get(patient.getUsername()) != null) {
            throw new RuntimeException("patient already Exists");
        }
        storeServices.patients.put(patient.getUsername(), patient);
    }

    public static Patient findPatient(String username) {
        return storeServices.patients.get(username);
    }

    // update selectedPhysician with the physician selected by the patient
    public static Patient selectPhysician(String username, Physician selectedPhysician) throws AuthenticationException {
        Patient patient = storeServices.patients.get(username);
        patient.setSelectedPhysician(selectedPhysician);
        storeServices.patients.put(username, patient);

        return patient;
    }

    public static Patient selectPharmacist(String username, Pharmacist selectedPharmacist)
            throws AuthenticationException {
        Patient patient = storeServices.patients.get(username);
        patient.setSelectedPharmacist(selectedPharmacist);
        storeServices.patients.put(username, patient);

        return patient;
    }

    public static Patient[] getPatients() {
        List<Patient> patientList = new ArrayList<>(storeServices.patients.values());
        return storeServices.patients.values().toArray(new Patient[patientList.size()]);
    }

    // get patient by selected physician
    public static Patient[] getPatientsByPhysician(Physician physician) {
        List<Patient> patientList = new ArrayList<>();
        for (Patient patient : storeServices.patients.values()) {
            if (patient.getSelectedPhysician() == null)
                continue;
            if (patient.getSelectedPhysician().equals(physician)) {
                patientList.add(patient);
            }
        }

        return patientList.toArray(new Patient[patientList.size()]);
    }

    public static Patient[] getPatientsByPharmacist(Pharmacist pharmacist) {
        List<Patient> patientList = new ArrayList<>();
        for (Patient patient : storeServices.patients.values()) {
            if (patient.getSelectedPharmacist() == null)
                continue;
            if (patient.getSelectedPharmacist().equals(pharmacist)) {
                patientList.add(patient);
            }
        }

        return patientList.toArray(new Patient[patientList.size()]);
    }

    // give consultation to patient
    public static Patient getConsultation(String username, Consultation consultation)
            throws AuthenticationException {
        Patient patient = storeServices.patients.get(username);
        patient.setConsultation(consultation);
        storeServices.patients.put(username, patient);

        return patient;
    }

    public static Patient getPerscription(String username, Medicine prescription)
            throws AuthenticationException {
        Patient patient = storeServices.patients.get(username);
        patient.setPrescription(prescription);
        storeServices.patients.put(username, patient);

        return patient;
    }

    // get consultation by patient
    public static Consultation getConsultationByPatient(Patient patient) {
        return patient.getConsultation();
    }

    //get prescription by patient
    public static Medicine[] getPrescriptionByPatient(Patient patient) {
        return patient.getPrescription();
    }

    
}
