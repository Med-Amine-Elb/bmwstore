package com.bmw.store.Repositories;

import com.bmw.store.models.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

//import java.lang.ScopedValue;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Find products with status = true
    List<Product> findByStatusTrue(Sort sort);

    // Find 8 random featured products (for MySQL)
    @Query(nativeQuery = true, value = "SELECT * FROM products WHERE featured = TRUE AND status = TRUE ORDER BY RAND() LIMIT 6")
    List<Product> findFeaturedProductsRandomly();

    // Find all featured products
    List<Product> findByFeaturedTrueAndStatusTrue();

    // Find top 8 featured products by ID
    List<Product> findTop8ByFeaturedTrueAndStatusTrueOrderByIdDesc();

    Optional<Product> findByName(String name);
}