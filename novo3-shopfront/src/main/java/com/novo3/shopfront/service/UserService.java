package com.novo3.shopfront.service;


import com.novo3.shopfront.api.base.UserRegistration;
import com.novo3.shopfront.repository.UserRepository;
import com.novo3.shopfront.repository.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository repository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = repository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("INVALID USERNAME"));
        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(user.getRole());

        UserDetails userDetails = new User(user.getUsername(), user.getPassword(), authorities);
        return userDetails;
    }

    public Boolean addUser(UserRegistration user) {
        log.debug("Adding user={}" + user);

        if (repository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username is already registered.");
        }

        repository.save(
                UserEntity.builder()
                        .username(user.getUsername())
                        .password(passwordEncoder.encode(saltedPassword(user.getPassword(), user.getUsername())))
                        .role("USER")
                        .build());
        log.debug("Added user={}" + user);

        return Boolean.TRUE;
    }

    public String saltedPassword(String password, String salt) {
        return password + salt;
    }
}
