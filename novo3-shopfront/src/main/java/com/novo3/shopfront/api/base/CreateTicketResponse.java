package com.novo3.shopfront.api.base;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateTicketResponse {
    private Boolean isRepair;
}
