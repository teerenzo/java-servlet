package com.challenge.ehospital.contraints;
import lombok.Getter;


@Getter
public class AppContraints {

    public  final String FILE_NAME = "medicines.csv";
    public  final String[] HEADER = { "med-name", "med-price", "med-expiration" };

    public String secretKey = "mysecretkeymysecretkeymysecretkey";


    
}
