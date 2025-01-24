package com.bmw.store.controllers;

import com.bmw.store.models.ProductDto;
import jakarta.validation.Valid;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.domain.Sort;
import org.springframework.ui.Model;
import com.bmw.store.Repositories.ProductRepository;
import com.bmw.store.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.*;

import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;

@Controller
@ComponentScan("com.bmw.store")

public class ProductController {

    @Autowired
    private ProductRepository productRepository;



    @GetMapping({"","/products"})
    public String listProducts(Model model) {
        List<Product> products = productRepository.findByStatusTrue(Sort.by(Sort.Direction.DESC, "id"));
        model.addAttribute("listProducts", products);
        return "products/list"; // Assurez-vous que le nom de la vue correspond au fichier HTML
    }

    @GetMapping("index")
    public String index(Model model) {
        return "index";
    }

    @GetMapping("*/create")
    public String showCreatePage(Model model) {
        ProductDto productDto = new ProductDto();
        model.addAttribute("productDto", productDto);
        return "products/create-product"; // Change to match your template name exactly
    }

    // Add POST mapping for form submission
    @PostMapping("/products/save")
    public String createProduct(@Valid @ModelAttribute ProductDto productDto, BindingResult result, Model model) {
        // Validation for image file (only required for new products)
        if (productDto.getId() == null && productDto.getImageFile().isEmpty()) {
            result.addError(new FieldError("productDto", "imageFile", "Image file is required"));
        }

        // If there are validation errors, return to the appropriate form
        if (result.hasErrors()) {
            if (productDto.getId() != null) { // Editing an existing product
                Product product = productRepository.findById(productDto.getId()).orElseThrow();
                model.addAttribute("product", product); // Add product to model for the edit page
                return "products/edit-product"; // Return to the edit page with errors
            } else { // Creating a new product
                return "products/create-product"; // Return to the create page with errors
            }
        }

        // Save or update the product
        Product product;
        Date createdAt = new Date();

        if (productDto.getId() != null) { // Update existing product
            product = productRepository.findById(productDto.getId()).orElseThrow();
            product.setName(productDto.getName());
            product.setBrand(productDto.getBrand());
            product.setCategory(productDto.getCategory());
            product.setPrice(productDto.getPrice());
            product.setDescription(productDto.getDescription());
        } else { // Create new product
            product = new Product();
            product.setCreateDate(createdAt);
            product.setStatus(true);
            product.setName(productDto.getName());
            product.setBrand(productDto.getBrand());
            product.setCategory(productDto.getCategory());
            product.setPrice(productDto.getPrice());
            product.setDescription(productDto.getDescription());
        }

        // Handle image upload (only if a new file is provided)
        if (!productDto.getImageFile().isEmpty()) {
            MultipartFile image = productDto.getImageFile();
            String storageFileName = createdAt.getTime() + "_" + image.getOriginalFilename();

            try {
                String uploadDir = "public/image/";
                Path uploadPath = Paths.get(uploadDir);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                Files.copy(image.getInputStream(), Paths.get(uploadDir + storageFileName), StandardCopyOption.REPLACE_EXISTING);
                product.setImageFileName(storageFileName);
            } catch (Exception ex) {
                System.out.println("Exception: " + ex.getMessage());
            }
        }

        productRepository.save(product);
        return "redirect:/products";
    }

    @GetMapping("/products/edit-product")
    public String showEditPage(Model model,@RequestParam Long id) {

        try {

            Product product = productRepository.findById(id).get();
            model.addAttribute("product", product);

            ProductDto productDto = new ProductDto();
            productDto.setId(product.getId());
            productDto.setName (product.getName() );
            productDto.setBrand (product.getBrand () );
            productDto.setCategory (product.getCategory());
            productDto.setPrice (product.getPrice());
            productDto.setDescription (product.getDescription());
            model.addAttribute("productDto", productDto) ;


            return "products/edit-product"; // Changed from EditProduct to edit
        } catch (Exception ex) {
            System.out.println("Exception: " + ex.getMessage());
            return "redirect:/products";
        }
      }

    @GetMapping("/products/delete")
    public String deleteProduct(@RequestParam Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setStatus(false);
        productRepository.save(product);
        return "redirect:/products";
    }

}