package com.novo3.shopfront.service;

import com.novo3.shopfront.repository.xero.XeroClient;
import com.novo3.shopfront.repository.xero.dto.Contact;
import com.novo3.shopfront.repository.xero.dto.ContactGroup;
import com.novo3.shopfront.repository.xero.dto.ContactGroupUpdateRequest;
import com.novo3.shopfront.repository.xero.dto.ContactGroupsRequest;
import com.novo3.shopfront.repository.xero.dto.ContactGroupsResponse;
import com.novo3.shopfront.repository.xero.dto.ContactLite;
import com.novo3.shopfront.repository.xero.dto.ContactRequest;
import com.novo3.shopfront.repository.xero.dto.ContactResponse;
import com.novo3.shopfront.service.dto.ContactDetailsDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class XeroService {
    private final XeroClient xeroClient;

    public void updateXero(List<ContactDetailsDto> contactDetailsDtos) {

        String accessToken = xeroClient.getAccessToken();

        for (ContactDetailsDto c : contactDetailsDtos) {
            String name = c.getContactGroupName();
            String contactGroupId = createContactGroup(name, accessToken);
            log.info("Contact Group created name={}, id={}", name, contactGroupId);

            List<ContactLite> contactLiteList = new ArrayList<>();
            for (ContactRequest cr : c.getContactRequests()) {
                Contact contactResponse = createOrUpdateContact(cr, accessToken);
                log.info("Contact Created with  Contact email={}, id={}", contactResponse.getEmailAddress(), contactResponse.getContactID());

                contactLiteList.add(ContactLite.builder()
                        .contactId(contactResponse.getContactID())
                        .build());
            }

            ContactGroupUpdateRequest contactGroupUpdateRequest = ContactGroupUpdateRequest.builder().contacts(contactLiteList).build();

            xeroClient.addContactToContactGroup(contactGroupId, contactGroupUpdateRequest, accessToken);
            log.info("Contacts added to contact group contactGroupId={}, size={}", contactGroupId, contactLiteList.size());
        }

    }

    private String createContactGroup(String contactName, String accessToken) {

        ContactGroupsRequest request = ContactGroupsRequest.builder()
                .name(contactName)
                .build();

        ContactGroupsResponse response = xeroClient.createContactGroup(request, accessToken);

        ContactGroup contactGroup = response.getContactGroups().stream()
                .findFirst()
                .orElseThrow(NoSuchElementException::new);

        return contactGroup.getContactGroupId();
    }

    private Contact createOrUpdateContact(ContactRequest request, String serviceToken) {

        request = getContactRequest(request, serviceToken);
        ContactResponse contactResponse = xeroClient.saveContact(request, serviceToken);

        return contactResponse.getContacts().stream().findFirst().orElseThrow(NoSuchElementException::new);
    }

    private ContactRequest getContactRequest(ContactRequest request, String serviceToken) {

        ContactResponse response = getContactByEmail(request, serviceToken);
        Optional<Contact> optionalContact = response.getContacts().stream().findFirst();

        if (optionalContact.isPresent()) {
            Contact contact = optionalContact.get();
            request = ContactRequest.builder()
                    .contacts(Collections.singletonList(contact))
                    .build();

            log.info("Contact for email={}, is already available", contact.getEmailAddress());
        }

        return request;
    }

    private ContactResponse getContactByEmail(ContactRequest request, String serviceToken) {
        String emailAddress = request.getContacts().stream()
                .findFirst()
                .orElseThrow(NoSuchElementException::new)
                .getEmailAddress();

        return xeroClient.getContact(emailAddress, serviceToken);
    }
}
