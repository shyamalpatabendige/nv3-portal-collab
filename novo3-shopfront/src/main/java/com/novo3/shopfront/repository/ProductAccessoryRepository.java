package com.novo3.shopfront.repository;

import com.novo3.shopfront.repository.entity.ProductAccessoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductAccessoryRepository extends JpaRepository<ProductAccessoryEntity, Integer> {
}
