package com.bmw.store.services;

import com.bmw.store.Repositories.UserRepository;
import com.bmw.store.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        if (userRepository.findByemail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email déjà utilisé");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedDate(LocalDateTime.now());
        user.setStatus("active");
        user.setRole("VISITOR");
        user.setLastLogin(LocalDateTime.now());

        return userRepository.save(user);
    }
}