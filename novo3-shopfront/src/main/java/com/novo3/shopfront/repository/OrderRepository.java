package com.novo3.shopfront.repository;

import com.novo3.shopfront.repository.entity.OrderEntity;
import com.novo3.shopfront.repository.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {

    List<OrderEntity> findAllByUser(UserEntity user);

    Optional<OrderEntity> findByUserAndId(UserEntity user, Integer id);

    Optional<List<OrderEntity>> findAllByCreatedOnBetween(Timestamp start, Timestamp end);
}
