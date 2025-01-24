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
        return "login-page/register"; // Render the registration form
    }

    @PostMapping("/register")
    public String registerUser(User user) {
        userService.registerUser(user);
        return "redirect:/login"; // Redirect to the login page after registration
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login-page/login"; // Render the login form
    }
}