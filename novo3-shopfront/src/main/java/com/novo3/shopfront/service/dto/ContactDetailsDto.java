package com.novo3.shopfront.service.dto;

import com.novo3.shopfront.repository.xero.dto.ContactRequest;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ContactDetailsDto {
    private String contactGroupName;
    private List<ContactRequest> contactRequests;
}
