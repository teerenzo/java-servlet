package com.challenge.ehospital.handlers;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Collection;
import java.util.Map;

import com.challenge.ehospital.contraints.AppContraints;
import com.challenge.ehospital.helpers.ResponseEntity;
import com.challenge.ehospital.models.Medicine;

public class MedicineHandlers {

   static DataStore storeServices= new DataStore();
   static AppContraints appConstraint = new AppContraints();
     
 
    public static ResponseEntity<Medicine> addMedicine(Medicine med) {
    
        if (storeServices.medicines.get(med.getMedName()) != null) {
            throw new RuntimeException("Medicine with the same name already exists.");
        }
        storeServices.medicines.put(med.getMedName(), med);
        saveToFile();
        return new ResponseEntity<Medicine>("Medicine added successfully", med);
    }

    public static Medicine[] getMedicines() {
        Collection<Medicine> medValues = storeServices.medicines.values();
        return medValues.toArray(new Medicine[storeServices.medicines.size()]);
    }

    public static Medicine findMedicine(String name) {
        return storeServices.medicines.get(name);
    }

    private static void saveToFile() {
  
        File file = new File(appConstraint.getFILE_NAME());
        FileWriter writer = null;

        try {
            if (!file.exists()) {
                file.createNewFile();
            }

            writer = new FileWriter(file);

            for (int i = 0; i < appConstraint.getHEADER().length; i++) {
                writer.append(appConstraint.getHEADER()[i]);
                if (i < appConstraint.getHEADER().length - 1) {
                    writer.append(",");
                }
            }
            writer.append("\n");

        
            for (Map.Entry<String, Medicine> entry : storeServices.medicines.entrySet()) {
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