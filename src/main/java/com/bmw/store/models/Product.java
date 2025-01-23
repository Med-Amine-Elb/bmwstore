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

    @Column(name = "status", nullable = false)
    private boolean status = true; // Par défaut, le statut est true

}