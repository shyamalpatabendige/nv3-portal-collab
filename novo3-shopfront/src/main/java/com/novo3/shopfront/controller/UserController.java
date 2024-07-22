package com.novo3.shopfront.controller;

import com.novo3.shopfront.api.base.BaseUser;
import com.novo3.shopfront.api.base.UserRegistration;
import com.novo3.shopfront.helper.TokenHelper;
import com.novo3.shopfront.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping(value = "user")
@Slf4j
@Validated
@CrossOrigin
@AllArgsConstructor
public class UserController {

    private final TokenHelper tokenHelper;

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@Valid @RequestBody BaseUser user) {

        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(),
                        userService.saltedPassword(user.getPassword(), user.getUsername())));


        if (authenticate.isAuthenticated()) {
            User user1 = (User) authenticate.getPrincipal();
            return new ResponseEntity<>(tokenHelper.generateToken(user1.getUsername(), (Collection<GrantedAuthority>) authenticate.getAuthorities()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("INVALID USERNAME/PASSWORD", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> register(@Valid @RequestBody UserRegistration user) {

        userService.addUser(user);
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(),
                        userService.saltedPassword(user.getPassword(), user.getUsername())));

        if (authenticate.isAuthenticated()) {
            User user1 = (User) authenticate.getPrincipal();
            return new ResponseEntity<>(tokenHelper.generateToken(user1.getUsername(), (Collection<GrantedAuthority>) authenticate.getAuthorities()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("INVALID USERNAME/PASSWORD", HttpStatus.BAD_REQUEST);
        }
    }
}
