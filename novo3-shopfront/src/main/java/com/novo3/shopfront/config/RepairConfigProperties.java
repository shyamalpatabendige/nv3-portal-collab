package com.novo3.shopfront.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "school.repair")
public class RepairConfigProperties {

    private Map<String, String> codes;
    private List<String> covered;

    // Getters and setters

    public void setCodes(Map<String, String> codes) {
        this.codes = codes;
    }

    public void setCovered(List<String> covered) {
        this.covered = covered;
    }
}