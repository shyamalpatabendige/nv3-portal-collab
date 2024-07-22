package com.novo3.shopfront.service;

import com.novo3.shopfront.api.base.Accessory;
import com.novo3.shopfront.api.base.Product;
import com.novo3.shopfront.repository.SchoolRepository;
import com.novo3.shopfront.repository.entity.AccessoryEntity;
import com.novo3.shopfront.repository.entity.AccessoryFeatureEntity;
import com.novo3.shopfront.repository.entity.FeatureEntity;
import com.novo3.shopfront.repository.entity.ProductAccessoryEntity;
import com.novo3.shopfront.repository.entity.ProductEntity;
import com.novo3.shopfront.repository.entity.SchoolEntity;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class ProductService {

    private final SchoolRepository schoolRepository;

    public List<Product> getProductsBySchoolCode(String code) {

        List<Product> products = null;
        SchoolEntity school = schoolRepository.findSchoolEntityByCode(code);

        if (school != null) {
            products = school.getProducts().stream().map(this::getProduct).collect(Collectors.toList());
        }

        return products;
    }

    private Product getProduct(ProductEntity product) {

        return Product.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .features(product.getFeatures().stream().map(FeatureEntity::getName).collect(Collectors.toList()))
                .accessories(getAccessories(product.getProductAccessoryEntities()))
                .notes(product.getNotes())
                .link(product.getLink())
                .linkDescription(product.getLinkDescription())
                .price(product.getPrice())
                .img(product.getImg())
                .build();
    }

    private List<Accessory> getAccessories(List<ProductAccessoryEntity> productAccessories) {

        return productAccessories.stream()
                .map(e -> getAccessory(e.getAccessory(), e))
                .collect(Collectors.toList());
    }

    private Accessory getAccessory(AccessoryEntity accessory, ProductAccessoryEntity productAccessory) {
        BigDecimal price = productAccessory.getPrice();
        return Accessory.builder()
                .id(productAccessory.getId())
                .name(accessory.getName())
                .description(accessory.getDescription())
                .price(price != null ? price : accessory.getPrice())
                .shortDescription(accessory.getShortDescription())
                .link(accessory.getLink())
                .linkDescription(accessory.getLinkDescription())
                .features(accessory.getAccessoryFeatures().stream().map(AccessoryFeatureEntity::getName).collect(Collectors.toList()))
                .img(accessory.getImg())
                .build();
    }

}
