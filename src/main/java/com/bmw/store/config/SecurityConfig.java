package com.bmw.store.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/home", "/register", "/login", "/css/**", "/js/**", "/image/**","/products" ,"/fonts/**").permitAll() // Allow access to public resources
                        .anyRequest().authenticated() // Require authentication for all other requests
                )
                .formLogin(form -> form
                        .loginPage("/login") // Specify the login page
                        .defaultSuccessUrl("/home") // Redirect to home page after successful login
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/login") // Redirect to login page after logout
                        .permitAll()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Use BCrypt for password hashing
    }
}