package com.challenge.ehospital.models;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Consultation {
    private Physician physician;
    private String diseaseName;
    private String description;

    public Consultation(String diseaseName, Physician physician, String description) {
        this.diseaseName = diseaseName;
        this.physician = physician;
        this.description = description;
    }
}
