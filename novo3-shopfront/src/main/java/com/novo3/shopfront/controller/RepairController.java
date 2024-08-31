package com.novo3.shopfront.controller;

import com.novo3.shopfront.api.base.CreateTicketResponse;
import com.novo3.shopfront.api.base.Ticket;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "api/repair")
@Slf4j
@Validated
@CrossOrigin
@AllArgsConstructor
public class RepairController {

    @PostMapping(value = "/ticket", consumes = "application/json", produces = "application/json")
    public ResponseEntity<CreateTicketResponse> add(@Valid @RequestBody Ticket ticket) {

        return new ResponseEntity<>(CreateTicketResponse.builder()
                .isRepair(Boolean.TRUE)
                .build(), HttpStatus.OK);
    }
}
