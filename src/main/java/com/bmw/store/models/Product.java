package com.bmw.store.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String brand;
    private String category;
    private double price;

    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(name = "create_date")
    private Date createDate;
    @Column(name = "image_file_name")
    private String imageFileName;

    @Column(name = "model_year")
    private Integer modelYear; // Use Integer (wrapper)

    @Column(name = "mileage")
    private String mileage; // String is fine, can be null

    @Column(name = "horsepower")
    private String horsepower; // String is fine, can be null

    @Column(name = "automatic")
    private Boolean automatic; // Use Boolean (wrapper)

    @Column(name = "engines") // Keep the case consistent with the CSV
    private String engines;

    @Column(name = "cc_battery_capacity")
    private String ccBatteryCapacity; // Use camelCase

    @Column(name = "total_speed")
    private String totalSpeed; // Use camelCase

    @Column(name = "performance")
    private String performance;

    @Column(name = "fuel_types") // Keep the case consistent with the CSV
    private String fuelTypes;  // Use camelCase

    @Column(name = "seats")
    private String seats;

    @Column(name = "torque")
    private String torque;

    @Column(name = "featured")
    private Boolean featured = true; // Use Boolean (wrapper)

    @Column(name = "status", nullable = false)
    private boolean status = true; // Primitive is okay here, has a default

}