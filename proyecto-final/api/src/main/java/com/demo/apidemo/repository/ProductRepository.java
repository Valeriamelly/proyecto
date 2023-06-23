package com.demo.apidemo.repository;

import com.demo.apidemo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.name LIKE %?1%")
    List<Product> findByNameLike(String name);
    List<Product> findByNameContainingIgnoreCase(String name);
}

