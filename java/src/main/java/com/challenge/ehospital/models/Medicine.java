package com.challenge.ehospital.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Medicine {

    private String medName;
    private String medPrice;
    private String expiration;

    public Medicine(String name, String price, String expiration ) {
        this.medName = name;
        this.medPrice = price;
        this.expiration = expiration;
    }
}
