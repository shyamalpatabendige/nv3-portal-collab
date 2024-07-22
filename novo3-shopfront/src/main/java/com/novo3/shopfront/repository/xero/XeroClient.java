package com.novo3.shopfront.repository.xero;

import com.novo3.shopfront.exception.ServiceException;
import com.novo3.shopfront.repository.xero.dto.AccessToken;
import com.novo3.shopfront.repository.xero.dto.ContactGroupUpdateRequest;
import com.novo3.shopfront.repository.xero.dto.ContactGroupsRequest;
import com.novo3.shopfront.repository.xero.dto.ContactGroupsResponse;
import com.novo3.shopfront.repository.xero.dto.ContactRequest;
import com.novo3.shopfront.repository.xero.dto.ContactResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collections;

@Component
@Slf4j
@RequiredArgsConstructor
public class XeroClient {

   

    public String getAccessToken() {

       

        return "getAccessToken";

    }

    public ContactGroupsResponse createContactGroup(ContactGroupsRequest request, String accessToken) {

        return null;

    }

    public ContactResponse addContactToContactGroup(String contactGroupId, ContactGroupUpdateRequest request, String accessToken) {

        return null;

    }

    public ContactResponse saveContact(ContactRequest request, String accessToken) {

        return null;

    }

    public ContactResponse getContact(String emailAddress, String accessToken) {

//        RestTemplate restTemplate = getRestTemplate();
return null;

    }
}
