package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.messages.RentACarProperties;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final RentACarProperties rentACarProperties;
    Tika tika = new Tika();

    public String saveBase64StringAsFile(String image, String targetEntity) {
        String filename = UUID.randomUUID().toString();
        Path path = getPath(targetEntity, filename);


        try {
            OutputStream outputStream = new FileOutputStream(path.toFile());
            outputStream.write(decodedImage(image));
            outputStream.close();
            return filename;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }



    private Path getUserImagePath(String filename) {
        return Paths.get(rentACarProperties.getStorage().getRoot(), rentACarProperties.getStorage().getUser(), filename);

    }


    private Path getModelImagePath(String filename) {
        return Paths.get(rentACarProperties.getStorage().getRoot(), rentACarProperties.getStorage().getModel(), filename);

    }

    public String detectType(String value) {
        return tika.detect(decodedImage(value));
    }

    private byte[] decodedImage(String encodedImage) {
        return Base64.getDecoder().decode(encodedImage.split(",")[1]);
    }

    private Path getCarImagePath(String filename) {
        return Paths.get(rentACarProperties.getStorage().getRoot(), rentACarProperties.getStorage().getCar(), filename);
    }

    public void deleteCarImage(String image,String targetEntity ) {

        if (image == null) return;
        Path path = getPath(targetEntity, image);
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private Path getPath(String targetEntity, String filename) {
        Path path = null;

        if (targetEntity.equals("car")) {
            path = getCarImagePath(filename);
        } else if (targetEntity.equals("model")) {
            path = getModelImagePath(filename);
        }else if (targetEntity.equals("user")){
            path= getUserImagePath(filename);
        }
        return path;
    }
}


