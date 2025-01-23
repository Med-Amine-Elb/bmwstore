package com.bmw.store.models;


import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


@Setter
@Getter
public class ProductDto {
    private Long id; // Add this field

    @NotEmpty(message = "The name is required")
    private String name;

    @NotEmpty(message = "The brand is required")
    private String brand;

    @NotEmpty(message = "The category is required")
    private String category;

    @Min(value = 0, message = "Price must be greater than or equal to 0")
    private double price;

    @Size(min =10, message = "The description should be at least 10 characters")
    @Size(max =2000, message = "The description cannot exceed 2000 characters")
    private String description;

    private MultipartFile imageFile;

    private boolean status = true; // Par défaut, le statut est true

}
