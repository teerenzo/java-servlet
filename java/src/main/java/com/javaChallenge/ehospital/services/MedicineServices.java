package com.javaChallenge.ehospital.services;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

import com.javaChallenge.ehospital.helpers.ResponseEntity;
import com.javaChallenge.ehospital.models.Medicine;

public class MedicineServices {
    private static final String FILE_NAME = "medicines.csv";
    private static final String[] HEADER = { "MedName", "MedPrice", "expirationDate" };
    private static Map<String, Medicine> medicines = new LinkedHashMap<>();

    public static ResponseEntity<Medicine> addMedicine(Medicine med) {
        if (medicines.get(med.getMedName()) != null) {
            throw new RuntimeException("Medicine with the same name already exists.");
        }
        medicines.put(med.getMedName(), med);
        saveToFile();
        return new ResponseEntity<Medicine>("Medicine added successfully", med);
    }

    public static Medicine[] getMedicines() {
        Collection<Medicine> medValues = medicines.values();
        return medValues.toArray(new Medicine[medicines.size()]);
    }

    public static Medicine findMedicine(String name) {
        return medicines.get(name);
    }

    private static void saveToFile() {
        File file = new File(FILE_NAME);
        FileWriter writer = null;

        try {
            if (!file.exists()) {
                file.createNewFile();
            }

            writer = new FileWriter(file);

            for (int i = 0; i < HEADER.length; i++) {
                writer.append(HEADER[i]);
                if (i < HEADER.length - 1) {
                    writer.append(",");
                }
            }
            writer.append("\n");

            // Write the medicines
            for (Map.Entry<String, Medicine> entry : medicines.entrySet()) {
                writer.append(entry.getValue().getMedName());
                writer.append(",");
                writer.append(entry.getValue().getMedPrice());
                writer.append(",");
                writer.append(entry.getValue().getExpiration());
                writer.append("\n");
            }

            writer.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (writer != null) {
                    writer.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}