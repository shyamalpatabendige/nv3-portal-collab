package com.novo3.shopfront.controller;

import com.novo3.shopfront.api.base.Order;
import com.novo3.shopfront.api.base.Product;
import com.novo3.shopfront.api.base.School;
import com.novo3.shopfront.config.RepairConfigProperties;
import com.novo3.shopfront.service.OrderService;
import com.novo3.shopfront.service.ProductService;
import com.novo3.shopfront.service.ReportService;
import com.novo3.shopfront.service.SchoolService;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "api")
@Slf4j
@Validated
@CrossOrigin
@AllArgsConstructor
public class ShopfrontController {

    private final SchoolService schoolService;
    private final OrderService orderService;
    private final ProductService productService;
    private final ReportService reportService;
    private final RepairConfigProperties repairProperties;

    @GetMapping(value = "/school/{code}", produces = "application/json")
    public ResponseEntity<School> getSchoolId(@PathVariable @NotNull String code) {

        log.info("Search school using code={}", code);
        School school;
        if (code.equals("BCC-NRP") || code.equals("MGS-NRP")) {
            String codeValue = repairProperties.getCodes().get(code);
            log.info("codeValue={}", codeValue);
            log.info("covered={}", repairProperties.getCovered());
            School s = schoolService.getSchool(codeValue);
            school = School.builder()
                    .isRepair(Boolean.TRUE)
                    .img(s.getImg())
                    .name(s.getName() + " - Repair Program")
                    .coveredList(repairProperties.getCovered())
                    .build();
        } else {
            school = schoolService.getSchool(code.toUpperCase());
        }
        if (school != null) {
            return new ResponseEntity<>(school, HttpStatus.OK);

        } else {
            log.error("Invalid code provided, code=\"{}\"", code);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping(value = "/order", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Integer> addOrder(Authentication auth, @Valid @RequestBody Order order) {

        if (auth == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String user = auth.getName();
        return new ResponseEntity<>(orderService.submitOrder(order, user), HttpStatus.OK);
    }

    @GetMapping(value = "/order", produces = "application/json")
    public ResponseEntity<List<Order>> getOrders(Authentication auth) {

        if (auth == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String user = auth.getName();
        return new ResponseEntity<>(orderService.getOrdersByUser(user), HttpStatus.OK);
    }

    @GetMapping(value = "/order/{order_id}", produces = "application/json")
    public ResponseEntity<Order> getOrder(Authentication auth, @PathVariable @NotNull Integer order_id) {

        if (auth == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        log.debug("getOrder() order_id={}", order_id);
        String user = auth.getName();
        return new ResponseEntity<>(orderService.getOrderByUserAndId(user, order_id), HttpStatus.OK);

    }

    @GetMapping(value = "/product/{school_code}", produces = "application/json")
    public ResponseEntity<List<Product>> getOrder(@PathVariable @NotNull String school_code) {

        log.debug("getOrder() school_id={}", school_code);

        List<Product> products = productService.getProductsBySchoolCode(school_code.toUpperCase());

        if (products != null && !products.isEmpty()) {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }

        log.error("getOrder() no products found for school_id={}", school_code);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/report", produces = "application/json")
    public ResponseEntity<String> sendReport(Authentication auth) {

        if (auth == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        if (!reportService.processReport().booleanValue()) {
            return new ResponseEntity<>("Failed", HttpStatus.OK);
        }
        String user = auth.getName();

        log.info("sendReport() by user={}", user);
        return new ResponseEntity<>("Sent", HttpStatus.OK);

    }

    //    private static final SimpleDateFormat DATE_FORMATTER = new SimpleDateFormat("dd-MM-yyyy");

    @GetMapping(value = "/report/{date}", produces = "application/json")
    public ResponseEntity<String> sendReportToDate(Authentication auth, @NotNull String date) {

        if (auth == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        if (!reportService.processReport().booleanValue()) {
            log.error("Failed to process report");
            return new ResponseEntity<>("Failed to process report", HttpStatus.OK);
        }

        String user = auth.getName();

        log.info("sendReport({}) by user={}", date, user);
        return new ResponseEntity<>("Sent", HttpStatus.OK);

    }
}