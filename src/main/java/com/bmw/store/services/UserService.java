package com.bmw.store.services;

import com.bmw.store.Repositories.UserRepository;
import com.bmw.store.models.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    @Autowired
    private UserRepository userRepository;


    public User registerUser(User user) {

        // Log registration attempt
        logger.info("Registering user: {}", user.getEmail());

        // Step 2: Set additional properties
        user.setCreatedDate(LocalDateTime.now());
        user.setStatus("active");
        user.setRole("visitor");
        logger.info("User details: {}", user);
        // Step 3: Save the user to the database
        return userRepository.save(user);
    }

    public User findByfirstName(String firstName) {
        return userRepository.findByfirstName(firstName)
                .orElseThrow(() -> new RuntimeException("User not found: " + firstName));
    }

    public User findBylastName(String lastName) {
        return userRepository.findBylastName(lastName)
                .orElseThrow(() -> new RuntimeException("User not found: " + lastName));
    }

    public User findByemail(String email) {
        return userRepository.findByemail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }
}