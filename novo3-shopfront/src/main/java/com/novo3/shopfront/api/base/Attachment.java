package com.novo3.shopfront.api.base;

import lombok.Builder;
import lombok.Data;

import java.io.InputStream;

@Data
@Builder
public class Attachment {
    private String name;
    private String file;
}
