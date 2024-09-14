package com.novo3.shopfront;

import com.novo3.shopfront.api.base.UserRegistration;
import com.novo3.shopfront.config.RepairConfigProperties;
import com.novo3.shopfront.repository.ProductRepository;
import com.novo3.shopfront.repository.SchoolRepository;
import com.novo3.shopfront.repository.UserRepository;
import com.novo3.shopfront.repository.entity.FeatureEntity;
import com.novo3.shopfront.repository.entity.ProductEntity;
import com.novo3.shopfront.repository.entity.SchoolEntity;
import com.novo3.shopfront.repository.entity.UserEntity;
import com.novo3.shopfront.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@SpringBootApplication
@EnableScheduling
public class ShopfrontApplication {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private ProductRepository productRepository;

    @Value("${init.data:false}")
    private String initData;

    public static String clientId;
    public static String clientSecret;


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public static void main(String[] args) {
//        SpringApplication.run(ShopfrontApplication.class, args);
        SpringApplicationBuilder builder = new SpringApplicationBuilder(ShopfrontApplication.class);

        builder.initializers(applicationContext -> {
            
        });

        builder.run(args);
    }

    @PostConstruct
    public void setup() {


        if ("true".equals(initData)) {

            userRepository.save(UserEntity.builder().username("testuser@mail.com").password(passwordEncoder.encode("testuser@123")).role("ROLE_ADMIN").build());

            UserRegistration user = new UserRegistration();
            user.setUsername("testuser@email.com");
            user.setPassword("testuser@123");

            userService.addUser(user);

            SchoolEntity school = schoolRepository.save(SchoolEntity.builder()
                    .code("BCC23")
                    .name("Ballarat Clarendon")
                    .banner("Welcome to the Ballarat Clarendon Device Purchase Portal for 2022/23")
                    .description("Novo3 is pleased to partner with Ballarat Clarendon College to provide the One-to-One learning devices for the school community in 2022/23. The notebook package as selected by the school is comprehensive and includes the device, carry case and onsite support for your child.\n" +
                            "All device packages will be delivered directly to the school so that they can be connected to the Ballarat Clarendon network and made ready for use for your child in the school’s IT environment.\n" +
                            "Device collection dates and times will be communicated to you via the email address provided during this online purchase process.")
                            .img("bcc22.jpg")
                    .build());


            List<SchoolEntity> schools = new ArrayList<>();
            schools.add(school);

            ProductEntity product = ProductEntity.builder()
                    .name("Lenovo ThinkPad L13 Yoga Gen 4")
                    .notes("All device packages will be delivered directly to the school. Device collection dates and times will be communicated to you via the email address provided during this online purchase process")
                    .link("Lenovo.pdf")
                    .linkDescription("Lenovo Accidental Damage Protection")
                    .price(BigDecimal.valueOf(1925.00))
                    .linkedSchools(schools)
                    .img("lenovo_l13.jpg")
                    .build();

            List<FeatureEntity> features = new ArrayList<>();
            features.add(FeatureEntity.builder().name("Core i5-12th Gen/16GB/512GB SSD").product(product).build());
            features.add(FeatureEntity.builder().name("13.3in convertible touchscreen laptop").product(product).build());
            features.add(FeatureEntity.builder().name("3YR Manufacturer’s warranty 3YR Manufacturer’s warranty").product(product).build());
            features.add(FeatureEntity.builder().name("3YR Battery Warranty").product(product).build());
            features.add(FeatureEntity.builder().name("STM protective carry case").product(product).build());
            features.add(FeatureEntity.builder().name("2nd AC Adaptor").product(product).build());
            features.add(FeatureEntity.builder().name("School designed protective vinyl skin").product(product).build());
            features.add(FeatureEntity.builder().name("3YR Lenovo Accidental Damage Protection").product(product).build());
            features.add(FeatureEntity.builder().name("No cover for THEFT is provided (It is advised that the laptop device be added to your personal household insurance policy in the event it is lost or stolen)").product(product).build());

            product.setFeatures(features);

//            ProductEntity product2 = ProductEntity.builder()
//                    .name(">>>> Lenovo ThinkPad L13 Yoga Gen3")
//                    .notes(">>>> All device packages will be delivered directly to the school. Device collection dates and times will be communicated to you via the email address provided during this online purchase process")
//                    .link(">>>> xyz")
//                    .linkDescription(">>>> Lenovo Accidental Damage Protection")
//                    .price(BigDecimal.valueOf(2925.00))
//                    .linkedSchools(schools)
//                    .img("lenovo_l13_new.jpg")
//                    .build();
//
//            Set<FeatureEntity> features2 = new HashSet<>();
//            features2.add(FeatureEntity.builder().name(">>>> Core i5-12th Gen/16GB/512GB SSD").product(product2).build());
//            features2.add(FeatureEntity.builder().name(">>>> 13.3in convertible touchscreen laptop").product(product2).build());
//            features2.add(FeatureEntity.builder().name(">>>> 3YR Manufacturer’s warranty 3YR Manufacturer’s warranty").product(product2).build());
//            features2.add(FeatureEntity.builder().name(">>>> 3YR Battery Warranty").product(product2).build());
//            features2.add(FeatureEntity.builder().name(">>>> STM protective carry case").product(product2).build());
//            features2.add(FeatureEntity.builder().name(">>>> 2nd AC Adaptor").product(product2).build());
//            features2.add(FeatureEntity.builder().name(">>>> School designed protective vinyl skin").product(product2).build());
//            features2.add(FeatureEntity.builder().name(">>>> 3YR Lenovo Accidental Damage Protection").product(product2).build());
//            features2.add(FeatureEntity.builder().name(">>>> No cover for THEFT is provided (It is advised that the laptop device be added to your personal household insurance policy in the event it is lost or stolen)").product(product2).build());
//
//            product2.setFeatures(features2);
//
//            AccessoryEntity accessory = AccessoryEntity.builder()
//                    .name("Optional Full Insurance Product")
//                    .shortDescription("Protectcure 3YR Accidental Damage Cover")
//                    .linkDescription("Protecsure T&Cs - Click the link to view full PDS")
//                    .price(BigDecimal.valueOf(725.00))
//                    .img("accessory_1.jpg")
//                    .build();
//
//            Set<AccessoryFeatureEntity> accessoryFeatures = new HashSet<>();
//            accessoryFeatures.add(AccessoryFeatureEntity.builder().name("Coverage for accidental damage").accessory(accessory).build());
//            accessoryFeatures.add(AccessoryFeatureEntity.builder().name("NO COVER for theft").accessory(accessory).build());
//            accessoryFeatures.add(AccessoryFeatureEntity.builder().name("Excess : $200").accessory(accessory).build());
//
//            accessory.setAccessoryFeatures(accessoryFeatures);

//            Set<ProductEntity> products = new HashSet<>();
//            products.add(product);
//            products.add(product2);
//
//            Set<AccessoryEntity> accessories = new HashSet<>();
//            accessories.add(accessory);
//
//            accessory.setProducts(products);

//            product.setAccessories(accessories);
//            product2.setAccessories(accessories);

            ProductEntity saved = productRepository.save(product);
//            ProductEntity saved2 = productRepository.save(product2);
        }

    }

}
