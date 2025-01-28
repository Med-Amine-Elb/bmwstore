package com.bmw.store.controllers;

import com.bmw.store.models.User;
import com.bmw.store.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AuthController {

    @Autowired
    private UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        return "login-page/login"; // Utilisez la même page pour le login et l'inscription
    }

    @PostMapping("/register")
    public String registerUser(User user, Model model) {
        userService.registerUser(user);
        model.addAttribute("successMessage", "User registered successfully!");
        return "login-page/login"; // Redirige vers la même page avec un message de succès
    }

    @GetMapping("/login")
    public String showLoginPage(Model model) {
        model.addAttribute("user", new User()); // Replace 'User' with your user class
        return "login-page/login";
    }

}