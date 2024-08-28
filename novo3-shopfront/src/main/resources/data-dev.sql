INSERT into SCHOOL_TABLE(id, code, name, banner, description, img) values (5, 'MGS23', 'Melbourne Grammar School Device', 'Welcome to the Melbourne Grammar School Device Purchase Portal for 2022/23', 'Novo3 is pleased to partner with Melbourne Grammar School to provide the BYOD learning devices for the school community in 2022/23. The notebook packages selected to offer to the school community includes the device, carry case and onsite support for your child. Device collection dates and times will be communicated to you via the email address provided during this online purchase process.', 'MGS22.jpg');

INSERT into PRODUCT_TABLE (id, name, notes, link, link_description, price, img, PRODUCT_CODE ) values (10, 'HP ProBook x360 435 convertible laptop', 'Device comes with protective carry case and onsite technical support', 'MGS-HP-ProBook-x360-435-G9-Spec-Sheet-2023.pdf', 'Device Specification', 2290.00, 'HPPBx360435image01.jpg', 'NBP-MGS#1-2022-2023');
INSERT into SCHOOL_PRODUCT_TABLE (PRODUCT_ID ,SCHOOL_ID ) values(10,5);

INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(14, '13.3in Touchscreen with Stylus Pen', 10);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(15, 'AMD Ryzen 5 processor', 10);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(16, '16GB Memory', 10);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(17, '256GB SSD', 10);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(18, '3YR Warranty', 10);


INSERT into PRODUCT_TABLE (id, name, notes, link, link_description, price, img, PRODUCT_CODE ) values (11, 'Apple MacBook Air - M2 chip', 'Device comes with protective carry case and onsite technical support', 'MGS-Apple-MacBook-Air-Spec-Sheet-2023.pdf', 'Device Specification', 2550.00, 'AppleMBAM2image01.jpg', 'NBP-MGS#3-2022-2023');

INSERT into SCHOOL_PRODUCT_TABLE (PRODUCT_ID ,SCHOOL_ID ) values(11,5);

INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(19, '13.6 inch liquid Retina display', 11);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(20, 'Apple M2 chip', 11);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(21, '16GB Memory', 11);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(22, '256GB SSD', 11);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(23, '3YR AppleCare+ Warranty', 11);

INSERT into PRODUCT_TABLE (id, name, notes, link, link_description, price, img, PRODUCT_CODE ) values (12, 'Apple MacBook Pro - M1 chip', 'Device comes with protective carry case and onsite technical support', 'MGS-Apple-MacBook-Pro-Spec-Sheet-2023.pdf', 'Device Specification', 3350.00, 'AppleMBProM1image01.jpg', 'NBP-MGS#5-2022-2023');

INSERT into SCHOOL_PRODUCT_TABLE (PRODUCT_ID ,SCHOOL_ID ) values(12,5);

INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(24, '14.2 inch liquid Retina display', 12);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(25, 'Apple M1 Pro chip', 12);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(26, '16GB Memory', 12);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(27, '512GB SSD', 12);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(28, '3YR AppleCare+ Warranty', 12);

INSERT INTO ACCESSORY_TABLE (id, name, SHORT_DESCRIPTION , link, link_description, price, img) values (1, 'OPTIONAL FULL INSURANCE PRODUCT', 'Protectcure 3YR Accidental Damage Cover', 'Protecsure-FSG-and-PDS-2021.pdf', 'Protecsure T&Cs - Click the link to view full PDS', 75.00, 'ProtecsureLogo.jpg');

INSERT INTO ACCESSORY_FEATURE_TABLE   (ID, NAME ,ACCESSORY_ID  ) values(1, 'Excess : $200', 1);
INSERT INTO ACCESSORY_FEATURE_TABLE  (ID, NAME ,ACCESSORY_ID  ) values(2, '<b>NO COVER</b> for theft', 1);
INSERT INTO ACCESSORY_FEATURE_TABLE  (ID, NAME ,ACCESSORY_ID  ) values(3, 'Coverage for accidental damage <b>ONLY</b>', 1);

INSERT INTO  PRODUCT_ACCESSORY_TABLE (ID, PRODUCT_ID ,ACCESSORY_ID , PRICE ,  PRODUCT_CODE ) values (1, 10, 1, 390.00, 'NBP-MGS#2-2022-2023');
INSERT INTO  PRODUCT_ACCESSORY_TABLE (ID, PRODUCT_ID ,ACCESSORY_ID , PRICE ,  PRODUCT_CODE ) values (2, 11, 1, 429.00, 'NBP-MGS#4-2022-2023');
INSERT INTO  PRODUCT_ACCESSORY_TABLE (ID, PRODUCT_ID ,ACCESSORY_ID , PRICE ,  PRODUCT_CODE ) values (3, 12, 1, 585.00, 'NBP-MGS#6-2022-2023');

--------####################---------
--INSERT INTO ACCESSORY_TABLE (id, name, SHORT_DESCRIPTION , link, link_description, price, img) values (2, 'OPTIONAL *** FULL INSURANCE PRODUCT', 'Protectcure 3YR Accidental Damage Cover', 'Protecsure-FSG-and-PDS-2021.pdf', 'Protecsure T&Cs - Click the link to view full PDS', 100.00, 'ProtecsureLogo.jpg');
--
--INSERT INTO ACCESSORY_FEATURE_TABLE   (ID, NAME ,ACCESSORY_ID  ) values(4, 'Excess ** : $200', 2);
--INSERT INTO ACCESSORY_FEATURE_TABLE  (ID, NAME ,ACCESSORY_ID  ) values(5, '<b>NO COVER</b> for ** theft', 2);
--INSERT INTO ACCESSORY_FEATURE_TABLE  (ID, NAME ,ACCESSORY_ID  ) values(6, 'Coverage for ** accidental damage <b>ONLY</b>', 2);
--
--INSERT INTO  PRODUCT_ACCESSORY_TABLE (id, PRODUCT_ID ,ACCESSORY_ID , PRICE ,  PRODUCT_CODE  ) values (4, 2);

Update PRODUCT_TABLE set link='Lenovo.pdf' where id=3;

UPDATE  ACCESSORY_FEATURE_TABLE SET NAME='FULL Comprehensive Insurance Cover' where id=1;
UPDATE  ACCESSORY_FEATURE_TABLE SET NAME='Covers Accidental Damage, theft and loss' where id=2;
UPDATE  ACCESSORY_FEATURE_TABLE SET NAME='Excess: $200' where id=3;
