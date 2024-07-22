package com.novo3.shopfront.config;

import com.novo3.shopfront.ShopfrontApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.MutablePropertySources;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class PropertyConfig {

    private final ConfigurableEnvironment environment;

    public PropertyConfig(ConfigurableEnvironment environment) {
        this.environment = environment;
    }

    @PostConstruct
    public void setUpProperties() {
        Map<String, Object> properties = new HashMap<>();
        properties.put("xero.oauth2.clientId", ShopfrontApplication.clientId);
        properties.put("xero.oauth2.clientSecret", ShopfrontApplication.clientSecret);

        MutablePropertySources propertySources = environment.getPropertySources();
        propertySources.addFirst(new MapPropertySource("programmaticallySetProperties", properties));
    }
}
