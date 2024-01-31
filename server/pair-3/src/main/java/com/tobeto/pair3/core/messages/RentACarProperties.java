package com.tobeto.pair3.core.messages;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "rent-a-car")
@Configuration
@Data
public class RentACarProperties {

    private Storage storage= new Storage();

    @Data
    public static  class Storage{

        String root="uploads";
        String car="car";
    }
}
