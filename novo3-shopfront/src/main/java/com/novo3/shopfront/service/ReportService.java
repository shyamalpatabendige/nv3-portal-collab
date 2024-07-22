package com.novo3.shopfront.service;

import com.novo3.shopfront.api.base.Accessory;
import com.novo3.shopfront.api.base.Address;
import com.novo3.shopfront.api.base.Attachment;
import com.novo3.shopfront.api.base.Email;
import com.novo3.shopfront.api.base.Order;
import com.novo3.shopfront.api.base.Parent;
import com.novo3.shopfront.api.base.Product;
import com.novo3.shopfront.api.base.Student;
import com.novo3.shopfront.repository.xero.dto.Contact;
import com.novo3.shopfront.repository.xero.dto.ContactPerson;
import com.novo3.shopfront.repository.xero.dto.ContactRequest;
import com.novo3.shopfront.repository.xero.dto.Phone;
import com.novo3.shopfront.service.dto.ContactDetailsDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
public class ReportService {

    private static final String DELIMITER = ",";
    private static final String ADDRESS_TYPE_STREET = "STREET";
    private static final String PHONE_TYPE_DEFAULT = "DEFAULT";
    @Value("${report.sender.email}")
    private String senderEmail;
    @Value("${report.sender.name}")
    private String senderName;
    @Value("${report.receivers:test}")
    private String receivers;
    @Value("${report.subject:test}")
    private String subject;
    @Value("${report.message:test}")
    private String message;

    @Value("${xero.update.toggle:false}")
    private boolean updateXero;

    private static final SimpleDateFormat DATE_FORMATTER = new SimpleDateFormat("dd-MM-yyyy");

    private static final SimpleDateFormat DATE_FORMATTER_XERO_CONT_GRP = new SimpleDateFormat("yyyyMMdd");
    private static final SimpleDateFormat MONTH_FORMATTER = new SimpleDateFormat("yyyy-MM");
    private static final String FILE_TYPE_CSV = ".csv";
    private static final String[] HEADERS = {"ID", "Status", "School", "Product Id", "Product Code", "Product Name", "Accessory", "Parent First Name", "Parent Surname", "Parent Contact Number", "Parent Email", "Address 1", "Address 2", "Suburb", "State", "Postcode", "Student First Name", "Student Surname", "Student Preferred Name", "Student Id", "Student Year in 2023", "Created On", "Updated On"};

    @Autowired
    private OrderService orderService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private XeroService xeroService;


    public Boolean processReport() {

        final Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, -1);

        return processReport(DATE_FORMATTER.format(cal.getTime()));
    }

    public Boolean processReport(String date) {

        try {
            String location = createReport(date);
            Email email = getEmail(date, location);
            emailService.sendEmailWithAttachment(email);
            return Boolean.TRUE;

        } catch (IOException e) {
            log.error("Unexpected error occurred while creating to report, {}", e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

    private Email getEmail(String date, String location) throws IOException {

        String[] receiverList = receivers.split(DELIMITER);
        Email email = Email.builder()
                .senderEmail(senderEmail)
                .senderName(senderName)
                .receivers(receiverList)
                .subject(String.format(subject, date))
                .message(String.format(message, date))
                .attachment(Attachment.builder()
                        .file(location)
                        .name(date + FILE_TYPE_CSV)
                        .build())
                .build();
        return email;
    }

    private String createReport(String date) throws IOException {

        List<Order> orders = orderService.getOrdersByDate(date);
        List<String[]> reportCSV = createReportCSV(orders);
        updateXero(orders);

        Date dateForMonth = new Date();
        String month = MONTH_FORMATTER.format(dateForMonth);

        File currDir = new File(month);
        if (!currDir.exists()) {
            log.info("directory creation status={}", currDir.mkdir());
        }
        String path = currDir.getAbsolutePath();

        String fileLocation = path + "/" + date + FILE_TYPE_CSV;
        log.info("path={}", path);
        log.info("fileLocation={}", fileLocation);

        try (PrintWriter pw = new PrintWriter(fileLocation)) {
            reportCSV.stream()
                    .map(this::convertToCSV)
                    .forEach(pw::println);
        }

        log.info("Report created for, date={}, location={}", date, fileLocation);

        return fileLocation;

    }

    private void updateXero(List<Order> orders) {

        if (updateXero) {
            log.info("Xero update turned on..");
            List<ContactDetailsDto> contactDetailsDtos = getContactDetailsDto(orders);
            if (!contactDetailsDtos.isEmpty()) {
                try {
                    xeroService.updateXero(contactDetailsDtos);
                } catch (Exception e) {
                    log.error("!!!! Error while updating Xero !!!... {}", e.getMessage(), e);
                }
            }
        } else {
            log.info("Xero update turned off..");
        }
    }

    private List<ContactDetailsDto> getContactDetailsDto(List<Order> orders) {

        List<ContactDetailsDto> contactDetailsDtos = new ArrayList<>();

        for (Order order : orders) {
            List<Product> products = order.getProducts();
            for (Product product : products) {
                Parent parent = order.getParent();
                Address address = parent.getAddress();

                String schoolCode = order.getSchool().getCode();
                String productCode = getProductCode(product.getProductCode(), order.getAccessories());

                final Calendar cal = Calendar.getInstance();
                cal.add(Calendar.DATE, -1);

                if (productCode != null && !productCode.isBlank()) {
                    productCode = "_" + productCode;
                } else {
                    productCode = "";
                }
                String date = DATE_FORMATTER_XERO_CONT_GRP.format(cal.getTime());
                String contactGroupName = schoolCode + "_" + date + productCode;

                Optional<ContactDetailsDto> optionalContactDetailsDto = contactDetailsDtos.stream()
                        .filter(c -> contactGroupName.equals(c.getContactGroupName()))
                        .findFirst();

                ContactDetailsDto contactDetailsDto = optionalContactDetailsDto
                        .orElseGet(() -> ContactDetailsDto.builder()
                                .contactGroupName(contactGroupName)
                                .build());

                List<ContactRequest> contactRequests = contactDetailsDto.getContactRequests();

                if (contactRequests == null) {
                    contactRequests = new ArrayList<>();
                }

                contactRequests.add(
                        ContactRequest.builder()
                                .contacts(Collections.singletonList(Contact.builder()
                                        .name(parent.getFirstName() + " " + parent.getLastName())
                                        .firstName(parent.getFirstName())
                                        .lastName(parent.getLastName())
                                        .emailAddress(parent.getEmail())
                                        .addresses(Collections.singletonList(com.novo3.shopfront.repository.xero.dto.Address.builder()
                                                .addressType(ADDRESS_TYPE_STREET)
                                                .addressLine1(address.getAddress1())
                                                .addressLine2(address.getAddress2())
                                                .city(address.getSuburb())
                                                .region(address.getState())
                                                .postalCode(address.getPostcode())
                                                .build()))
                                        .contactPersons(Collections.singletonList(ContactPerson.builder()
                                                .firstName(parent.getFirstName())
                                                .lastName(parent.getLastName())
                                                .emailAddress(parent.getEmail())
                                                .build()))
                                        .phones(Collections.singletonList(Phone.builder()
                                                .phoneType(PHONE_TYPE_DEFAULT)
                                                .phoneNumber(parent.getContactNumber())
                                                .build()))
                                        .build()))
                                .build()
                );

                contactDetailsDto.setContactRequests(contactRequests);

                contactDetailsDtos.add(contactDetailsDto);
            }
        }

        return contactDetailsDtos;
    }

    private List<String[]> createReportCSV(List<Order> orders) {


        List<String[]> dataLines = new ArrayList<>();
        dataLines.add(HEADERS);
        for (Order order : orders) {
            List<Product> products = order.getProducts();
            for (Product product : products) {
                Parent parent = order.getParent();
                Address address = parent.getAddress();
                Student student = order.getStudent();

                dataLines.add(new String[]{
                        order.getId().toString(),
                        order.getStatus(),
                        order.getSchool().getName(),
                        //Product
                        product.getId().toString(),
                        getProductCode(product.getProductCode(), order.getAccessories()),
                        product.getName(),
                        getAccessories(order.getAccessories()),

                        parent.getFirstName(),
                        parent.getLastName(),
                        parent.getContactNumber(),
                        parent.getEmail(),

                        address.getAddress1(),
                        address.getAddress2(),
                        address.getSuburb(),
                        address.getState(),
                        address.getPostcode(),

                        student.getFirstName(),
                        student.getLastName(),
                        student.getPreferredName(),
                        student.getId(),
                        student.getLevel(),

                        order.getCreatedOn(),
                        order.getUpdatedOn()
                });
            }
        }
        return dataLines;
    }

    private String getProductCode(String productCode, List<Accessory> accessories) {
        if (accessories == null || accessories.isEmpty()) {
            return productCode;
        } else {
            List<String> productCodes = accessories.stream()
                    .map(e -> e.getProductCode())
                    .collect(Collectors.toList());

            return productCodes.get(0);
        }
    }

    private String getAccessories(List<Accessory> accessories) {
        return accessories.stream()
                .map(Accessory::getName)
                .collect(Collectors.joining(","));
    }

    public String convertToCSV(String[] data) {
        return Stream.of(data)
                .map(this::escapeSpecialCharacters)
                .collect(Collectors.joining(","));
    }

    public String escapeSpecialCharacters(String data) {
        if (data == null) {
            return "";
        }
        String escapedData = data.replaceAll("\\R", " ");
        if (data.contains(",") || data.contains("\"") || data.contains("'")) {
            data = data.replace("\"", "\"\"");
            escapedData = "\"" + data + "\"";
        }
        return escapedData;
    }
}
