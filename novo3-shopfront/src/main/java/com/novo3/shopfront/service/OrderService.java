package com.novo3.shopfront.service;

import com.novo3.shopfront.api.base.Accessory;
import com.novo3.shopfront.api.base.Address;
import com.novo3.shopfront.api.base.Order;
import com.novo3.shopfront.api.base.Parent;
import com.novo3.shopfront.api.base.Product;
import com.novo3.shopfront.api.base.School;
import com.novo3.shopfront.api.base.Student;
import com.novo3.shopfront.repository.OrderRepository;
import com.novo3.shopfront.repository.ProductAccessoryRepository;
import com.novo3.shopfront.repository.ProductRepository;
import com.novo3.shopfront.repository.SchoolRepository;
import com.novo3.shopfront.repository.UserRepository;
import com.novo3.shopfront.repository.entity.AccessoryEntity;
import com.novo3.shopfront.repository.entity.ItemEntity;
import com.novo3.shopfront.repository.entity.OrderEntity;
import com.novo3.shopfront.repository.entity.ProductAccessoryEntity;
import com.novo3.shopfront.repository.entity.ProductEntity;
import com.novo3.shopfront.repository.entity.SchoolEntity;
import com.novo3.shopfront.repository.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class OrderService {

    private static final SimpleDateFormat DATE_TIME_FORMATTER = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
    private static final SimpleDateFormat DATE_FORMATTER = new SimpleDateFormat("dd-MM-yyyy");


    private static final String STATUS_IN_PROGRESS = "IN PROGRESS";

    private final UserRepository userRepository;

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    private final SchoolRepository schoolRepository;

    private final ProductAccessoryRepository productAccessoryRepository;

    public Integer submitOrder(Order order, String username) {

        Optional<UserEntity> user = userRepository.findByUsername(username);
        SchoolEntity school = schoolRepository.findSchoolEntityByCode(order.getSchool().getCode().toUpperCase());

        if (school == null) {
            log.error("submitOrder() could not find any school with code={}", order.getSchool().getCode());
            throw new IllegalArgumentException("Invalid School code");
        }

        OrderEntity orderEntity = getOrderEntity(order, user, school);

        OrderEntity saved = orderRepository.save(orderEntity);

        log.info("order successfully submitted, order-id={}", saved.getId());
        return saved.getId();
    }

    @NotNull
    private OrderEntity getOrderEntity(Order order, Optional<UserEntity> user, SchoolEntity school) {
        Parent parent = order.getParent();
        Address address = parent.getAddress();
        Student student = order.getStudent();
        OrderEntity orderEntity = OrderEntity.builder()
                .parentFirstName(parent.getFirstName())
                .parentLastName(parent.getLastName())
                .address1(address.getAddress1())
                .address2(address.getAddress2())
                .suburb(address.getSuburb())
                .state(address.getState())
                .postcode(address.getPostcode())
                .email(parent.getEmail())
                .contactNumber(parent.getContactNumber())
                .studentFirstName(student.getFirstName())
                .studentPreferredName(student.getPreferredName())
                .studentLastName(student.getLastName())
                .studentId(student.getId())
                .level(student.getLevel())
                .user(user.get())
                .school(school)
                .status(STATUS_IN_PROGRESS)
                .build();

        orderEntity.setItems(getItems(order, orderEntity));
        return orderEntity;
    }


    public Order getOrder(Integer id) {

        OrderEntity order = orderRepository.findById(id).get();

        return getOrder(order);
    }

    public List<Order> getOrdersByUser(String username) {

        UserEntity user = userRepository.findByUsername(username).orElseThrow(
                () -> new IllegalArgumentException("Invalid User"));

        List<OrderEntity> orders = orderRepository.findAllByUser(user);

        List<Order> orderList = orders.stream()
                .map(order -> getOrder(order))
                .collect(Collectors.toList());

        return orderList.stream().map(order -> {
                    order.setProductNames(
                            order.getProducts().stream()
                                    .map(product -> product.getName())
                                    .collect(Collectors.toList()));
                    order.setAccessoryNames(
                            order.getAccessories().stream()
                                    .map(accessory -> accessory.getName())
                                    .collect(Collectors.toList()));
                    return order;
                })
                .collect(Collectors.toList());
    }

    public Order getOrderByUserAndId(String username, Integer id) {

        UserEntity user = userRepository.findByUsername(username).orElseThrow(
                () -> new IllegalArgumentException("Invalid User"));

        return getOrder(orderRepository.findByUserAndId(user, id).orElseThrow(
                () -> new IllegalArgumentException("Invalid Order Id for the given user")
        ));
    }

    public List<Order> getOrdersByDate(String startDate) {

        log.info("getOrdersByDate(), date,{}", startDate);
        Date date;
        try {
            date = DATE_FORMATTER.parse(startDate);
        } catch (ParseException e) {
            log.error("Invalid date format, startDate={}", startDate);
            throw new RuntimeException(e);
        }

        Optional<List<OrderEntity>> orders = queryOrdersByDate(date);

        return orders.
                orElseThrow(() -> new RuntimeException("No orders found for the given Date=" + startDate))
                .stream()
                .map(order -> getOrder(order))
                .collect(Collectors.toList());
    }

    private Optional<List<OrderEntity>> queryOrdersByDate(Date startDate) {

        Date endDateTime;

        Calendar cal = Calendar.getInstance();
        cal.setTime(startDate);
        cal.add(Calendar.DATE, 1);
        endDateTime = cal.getTime();

        Timestamp start = new Timestamp(startDate.getTime());
        Timestamp end = new Timestamp(endDateTime.getTime());

        Optional<List<OrderEntity>> orders = orderRepository.findAllByCreatedOnBetween(start, end);
        return orders;
    }

    private List<ItemEntity> getItems(Order order, OrderEntity orderEntity) {

        List<ProductEntity> products = productRepository.findAllById(
                order.getProductIds()
                        .stream()
                        .map(id -> Integer.parseInt(id))
                        .collect(Collectors.toList()));

        List<ItemEntity> productItems = products.stream()
                .map(product -> ItemEntity.builder()
                        .product(product)
                        .price(product.getPrice())
                        .order(orderEntity)
                        .productCode(product.getProductCode())
                        .build()
                ).collect(Collectors.toList());


        List<String> accessoryIds = order.getAccessoryIds();
        if (accessoryIds != null && !accessoryIds.isEmpty()) {
            List<ProductAccessoryEntity> productAccessories = productAccessoryRepository.findAllById(
                    accessoryIds
                            .stream()
                            .map(id -> Integer.parseInt(id))
                            .collect(Collectors.toList()));

            List<ItemEntity> accessoryItems = productAccessories.stream()
                    .map(productAccessory -> ItemEntity.builder()
                            .productAccessory(productAccessory)
                            .price(productAccessory.getPrice())
                            .order(orderEntity)
                            .productCode(productAccessory.getProductCode())
                            .build()
                    ).collect(Collectors.toList());

            log.info("No of accessories added={}", accessoryItems.size());


            productItems.addAll(accessoryItems);
        } else {
            log.info("No accessories added to this order");
        }

        return productItems;
    }

    private Order getOrder(OrderEntity order) {

        return Order.builder()
                .id(order.getId())
                .parent(getParent(order))
                .student(getStudent(order))
                .products(getProducts(order.getItems()))
                .accessories(getAccessories(order.getItems()))
                .school(getSchool(order.getSchool()))
                .status(order.getStatus())
                .createdOn(getDateTime(order.getCreatedOn()))
                .updatedOn(getDateTime(order.getUpdatedOn()))
                .build();
    }

    private Parent getParent(OrderEntity order) {

        return Parent.builder()
                .firstName(order.getParentFirstName())
                .lastName(order.getParentLastName())
                .email(order.getEmail())
                .contactNumber(order.getContactNumber())
                .address(getAddress(order))
                .build();
    }

    private Address getAddress(OrderEntity order) {
        return Address.builder()
                .address1(order.getAddress1())
                .address2(order.getAddress2())
                .suburb(order.getSuburb())
                .state(order.getState())
                .postcode(order.getPostcode())
                .build();
    }

    private Student getStudent(OrderEntity order) {
        return Student.builder()
                .firstName(order.getStudentFirstName())
                .lastName(order.getStudentLastName())
                .preferredName(order.getStudentPreferredName())
                .level(order.getLevel())
                .id(order.getStudentId())
                .build();
    }

    private List<Product> getProducts(List<ItemEntity> items) {

        return items.stream()
                .filter(item -> item.getProduct() != null)
                .map(item -> getProduct(item))
                .collect(Collectors.toList());
    }

    private Product getProduct(ItemEntity item) {
        ProductEntity product = item.getProduct();
        return Product.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .features(product.getFeatures().stream().map(feature -> feature.getName()).collect(Collectors.toList()))
                .notes(product.getNotes())
                .link(product.getLink())
                .linkDescription(product.getLinkDescription())
                .price(item.getPrice())
                .img(product.getImg())
                .productCode(item.getProductCode())
                .build();
    }

    private List<Accessory> getAccessories(List<ItemEntity> items) {

        return items.stream()
                .filter(item -> item.getProductAccessory() != null)
                .map(item -> getAccessory(item))
                .collect(Collectors.toList());

    }

    private Accessory getAccessory(ItemEntity item) {
        AccessoryEntity accessory = item.getProductAccessory().getAccessory();
        return Accessory.builder()
                .id(accessory.getId())
                .name(accessory.getName())
                .description(accessory.getDescription())
                .features(accessory.getAccessoryFeatures().stream().map(feature -> feature.getName()).collect(Collectors.toList()))
                .notes(accessory.getNotes())
                .link(accessory.getLink())
                .linkDescription(accessory.getLinkDescription())
                .price(item.getPrice())
                .img(accessory.getImg())
                .productCode(item.getProductCode())
                .build();
    }

    private School getSchool(SchoolEntity school) {

        return School.builder()
                .name(school.getName())
                .code(school.getCode())
                .build();
    }

    private String getDateTime(Timestamp createdOn) {

        Date date = new Date(createdOn.getTime());

        return DATE_TIME_FORMATTER.format(date);

    }
}
