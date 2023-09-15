package com.javaChallenge.ehospital.services;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.naming.AuthenticationException;

import com.javaChallenge.ehospital.models.Consultation;
import com.javaChallenge.ehospital.models.Medicine;
import com.javaChallenge.ehospital.models.Patient;
import com.javaChallenge.ehospital.models.Pharmacist;
import com.javaChallenge.ehospital.models.Physician;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientServices {
    private static Map<String, Patient> patients = new LinkedHashMap<>();

    public static void createPatient(Patient patient) {
        if (patients.get(patient.getUsername()) != null) {
            throw new RuntimeException("patient already Exists");
        }
        patients.put(patient.getUsername(), patient);
    }

    public static Patient findPatient(String username) {
        return patients.get(username);
    }

    // update selectedPhysician with the physician selected by the patient
    public static Patient selectPhysician(String username, Physician selectedPhysician) throws AuthenticationException {
        Patient patient = patients.get(username);
        patient.setSelectedPhysician(selectedPhysician);
        patients.put(username, patient);

        return patient;
    }

    public static Patient selectPharmacist(String username, Pharmacist selectedPharmacist)
            throws AuthenticationException {
        Patient patient = patients.get(username);
        patient.setSelectedPharmacist(selectedPharmacist);
        patients.put(username, patient);

        return patient;
    }

    public static Patient[] getPatients() {
        List<Patient> patientList = new ArrayList<>(patients.values());
        return patients.values().toArray(new Patient[patientList.size()]);
    }

    // get patient by selected physician
    public static Patient[] getPatientsByPhysician(Physician physician) {
        List<Patient> patientList = new ArrayList<>();
        for (Patient patient : patients.values()) {
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
        for (Patient patient : patients.values()) {
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
        Patient patient = patients.get(username);
        patient.setConsultation(consultation);
        patients.put(username, patient);

        return patient;
    }

    public static Patient getPerscription(String username, Medicine prescription)
            throws AuthenticationException {
        Patient patient = patients.get(username);
        patient.setPrescription(prescription);
        patients.put(username, patient);

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
