package com.novo3.shopfront.config;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString // Lombok will automatically generate the toString() method
@Component
@ConfigurationProperties(prefix = "school.repair")
public class RepairConfigProperties {

    private Map<String, String> codes;
    private List<String> covered;
    private Map<String, Detail> details;

    @Getter
    @Setter
    @ToString // This will generate toString() for the nested Detail class too
    public static class Detail {
        private String name;
    }
}