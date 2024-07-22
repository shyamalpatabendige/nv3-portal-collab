INSERT into SCHOOL_TABLE(id, code, name, banner, description, img) values (3, 'MGS23', 'Melbourne Grammar School Device', 'Welcome to the Melbourne Grammar School Device Purchase Portal for 2022/23', 'Novo3 is pleased to partner with Melbourne Grammar School to provide the BYOD learning devices for the school community in 2022/23. The notebook packages selected to offer to the school community includes the device, carry case and onsite support for your child. Device collection dates and times will be communicated to you via the email address provided during this online purchase process.', 'MGS22.jpg');

INSERT into PRODUCT_TABLE (id, name, notes, link, link_description, price, img, PRODUCT_CODE ) values (4, 'HP ProBook x360 435 convertible laptop', 'Device comes with protective carry case and onsite technical support', 'MGS-HP-ProBook-x360-435-G9-Spec-Sheet-2023.pdf', 'Device Specification', 2290.00, 'HPPBx360435image01.jpg', 'NBP-MGS#1-2022-2023');
INSERT into SCHOOL_PRODUCT_TABLE (PRODUCT_ID ,SCHOOL_ID ) values(4,3);

INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(13, '13.3in Touchscreen with Stylus Pen', 4);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(14, 'AMD Ryzen 5 processor', 4);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(15, '16GB Memory', 4);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(16, '256GB SSD', 4);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(17, '3YR Warranty', 4);


INSERT into PRODUCT_TABLE (id, name, notes, link, link_description, price, img, PRODUCT_CODE ) values (5, 'Apple MacBook Air - M2 chip', 'Device comes with protective carry case and onsite technical support', 'MGS-Apple-MacBook-Air-Spec-Sheet-2023.pdf', 'Device Specification', 2550.00, 'AppleMBAM2image01.jpg', 'NBP-MGS#3-2022-2023');

INSERT into SCHOOL_PRODUCT_TABLE (PRODUCT_ID ,SCHOOL_ID ) values(5,3);

INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(18, '13.6 inch liquid Retina display', 5);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(19, 'Apple M2 chip', 5);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(20, '16GB Memory', 5);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(21, '256GB SSD', 5);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(22, '3YR AppleCare+ Warranty', 5);

INSERT into PRODUCT_TABLE (id, name, notes, link, link_description, price, img, PRODUCT_CODE ) values (6, 'Apple MacBook Pro - M1 chip', 'Device comes with protective carry case and onsite technical support', 'MGS-Apple-MacBook-Pro-Spec-Sheet-2023.pdf', 'Device Specification', 3350.00, 'AppleMBProM1image01.jpg', 'NBP-MGS#5-2022-2023');

INSERT into SCHOOL_PRODUCT_TABLE (PRODUCT_ID ,SCHOOL_ID ) values(6,3);

INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(23, '14.2 inch liquid Retina display', 6);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(24, 'Apple M1 Pro chip', 6);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(25, '16GB Memory', 6);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(26, '512GB SSD', 6);
INSERT INTO FEATURE_TABLE  (ID, NAME ,PRODUCT_ID ) values(27, '3YR AppleCare+ Warranty', 6);

INSERT INTO ACCESSORY_TABLE (id, name, SHORT_DESCRIPTION , link, link_description, price, img) values (1, 'OPTIONAL FULL INSURANCE PRODUCT', 'Protectcure 3YR Accidental Damage Cover', 'Protecsure-FSG-and-PDS-2021.pdf', 'Protecsure T&Cs - Click the link to view full PDS', 75.00, 'ProtecsureLogo.jpg');

INSERT INTO ACCESSORY_FEATURE_TABLE   (ID, NAME ,ACCESSORY_ID  ) values(1, 'Excess : $200', 1);
INSERT INTO ACCESSORY_FEATURE_TABLE  (ID, NAME ,ACCESSORY_ID  ) values(2, '<b>NO COVER</b> for theft', 1);
INSERT INTO ACCESSORY_FEATURE_TABLE  (ID, NAME ,ACCESSORY_ID  ) values(3, 'Coverage for accidental damage <b>ONLY</b>', 1);

INSERT INTO  PRODUCT_ACCESSORY_TABLE (ID, PRODUCT_ID ,ACCESSORY_ID , PRICE ,  PRODUCT_CODE ) values (1, 4, 1, 390.00, 'NBP-MGS#2-2022-2023');
INSERT INTO  PRODUCT_ACCESSORY_TABLE (ID, PRODUCT_ID ,ACCESSORY_ID , PRICE ,  PRODUCT_CODE ) values (2, 5, 1, 429.00, 'NBP-MGS#4-2022-2023');
INSERT INTO  PRODUCT_ACCESSORY_TABLE (ID, PRODUCT_ID ,ACCESSORY_ID , PRICE ,  PRODUCT_CODE ) values (3, 6, 1, 585.00, 'NBP-MGS#6-2022-2023');

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
