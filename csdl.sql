CREATE DATABASE  IF NOT EXISTS `autionweb_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `autionweb_db`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: autionweb_db
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `idAdmin` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`idAdmin`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin1','123456'),(2,'admin2','abcd'),(3,'admin3','qwerty');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camdaugia`
--

DROP TABLE IF EXISTS `camdaugia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `camdaugia` (
  `idNguoiDung` int(11) NOT NULL,
  `idSanPham` int(11) NOT NULL,
  PRIMARY KEY (`idNguoiDung`,`idSanPham`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camdaugia`
--

LOCK TABLES `camdaugia` WRITE;
/*!40000 ALTER TABLE `camdaugia` DISABLE KEYS */;
/*!40000 ALTER TABLE `camdaugia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietdanhgia`
--

DROP TABLE IF EXISTS `chitietdanhgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chitietdanhgia` (
  `idSanPham` int(11) NOT NULL,
  `idNguoiDanhGia` int(11) NOT NULL,
  `idNguoiDuocDanhGia` int(11) NOT NULL,
  `congHayTru` tinyint(4) DEFAULT NULL,
  `nhanXet` varchar(2048) DEFAULT NULL,
  `thoiDiemDanhGia` datetime DEFAULT NULL,
  PRIMARY KEY (`idSanPham`,`idNguoiDanhGia`,`idNguoiDuocDanhGia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdanhgia`
--

LOCK TABLES `chitietdanhgia` WRITE;
/*!40000 ALTER TABLE `chitietdanhgia` DISABLE KEYS */;
INSERT INTO `chitietdanhgia` VALUES (1,2,1,1,'Hàng tốt','2017-04-01 00:00:00'),(2,4,1,1,'Uy tín cao','2017-06-01 00:00:00'),(3,5,1,1,'Tốt','2017-04-01 00:00:00'),(4,1,2,0,'Không có tiếng cho lắm','2017-01-22 00:00:00'),(5,9,2,0,'Uy Tín','2017-02-18 00:00:00'),(6,6,2,0,'Hơi nghi ngờ','2017-05-15 00:00:00'),(7,2,3,1,'Có thể tin tưởng','2017-06-09 00:00:00'),(8,8,3,0,'Không tin tưởng','2017-03-10 00:00:00'),(9,5,3,1,'Giá và hàng đều tốt','2017-03-23 00:00:00'),(10,1,4,0,'Thanh toán khó khăn','2017-04-28 00:00:00'),(11,3,4,0,'Chất lượng hàng không ổn','2017-01-06 00:00:00'),(12,3,4,1,'Có uy tín','2017-04-02 00:00:00'),(13,7,5,1,'Vote cho bác','2017-02-11 00:00:00');
/*!40000 ALTER TABLE `chitietdanhgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhsachdaugia`
--

DROP TABLE IF EXISTS `danhsachdaugia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `danhsachdaugia` (
  `idSanPham` int(11) NOT NULL,
  `idNguoiDung` int(11) NOT NULL,
  PRIMARY KEY (`idSanPham`,`idNguoiDung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhsachdaugia`
--

LOCK TABLES `danhsachdaugia` WRITE;
/*!40000 ALTER TABLE `danhsachdaugia` DISABLE KEYS */;
INSERT INTO `danhsachdaugia` VALUES (2,1),(11,2);
/*!40000 ALTER TABLE `danhsachdaugia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhsachyeuthich`
--

DROP TABLE IF EXISTS `danhsachyeuthich`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `danhsachyeuthich` (
  `idSanPham` int(11) NOT NULL,
  `idNguoiDung` int(11) NOT NULL,
  PRIMARY KEY (`idSanPham`,`idNguoiDung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhsachyeuthich`
--

LOCK TABLES `danhsachyeuthich` WRITE;
/*!40000 ALTER TABLE `danhsachyeuthich` DISABLE KEYS */;
INSERT INTO `danhsachyeuthich` VALUES (1,4),(2,4),(3,2),(4,5),(5,1),(6,3),(7,5),(8,7),(9,1),(10,2),(11,7),(12,9),(13,3),(14,7),(15,1);
/*!40000 ALTER TABLE `danhsachyeuthich` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichsumota`
--

DROP TABLE IF EXISTS `lichsumota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lichsumota` (
  `idSanPham` int(11) NOT NULL,
  `thoiDiemCapNhat` datetime NOT NULL,
  `noiDungCapNhat` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`idSanPham`,`thoiDiemCapNhat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichsumota`
--

LOCK TABLES `lichsumota` WRITE;
/*!40000 ALTER TABLE `lichsumota` DISABLE KEYS */;
/*!40000 ALTER TABLE `lichsumota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichsuragia`
--

DROP TABLE IF EXISTS `lichsuragia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lichsuragia` (
  `idSanPham` int(11) NOT NULL,
  `idNguoiDung` int(11) NOT NULL,
  `thoiDiemRaGia` datetime NOT NULL,
  `giaDau` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSanPham`,`idNguoiDung`,`thoiDiemRaGia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichsuragia`
--

LOCK TABLES `lichsuragia` WRITE;
/*!40000 ALTER TABLE `lichsuragia` DISABLE KEYS */;
INSERT INTO `lichsuragia` VALUES (2,1,'2018-05-15 23:21:22',55000),(11,2,'2018-05-15 17:32:40',620000);
/*!40000 ALTER TABLE `lichsuragia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loai`
--

DROP TABLE IF EXISTS `loai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loai` (
  `idLoaiSanPham` int(11) NOT NULL AUTO_INCREMENT,
  `tenLoaiSanPham` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idLoaiSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai`
--

LOCK TABLES `loai` WRITE;
/*!40000 ALTER TABLE `loai` DISABLE KEYS */;
INSERT INTO `loai` VALUES (1,'Sách'),(2,'Thiết bị số'),(3,'Đồ gia dụng'),(4,'Thời trang'),(5,'Làm đẹp - Sức khỏe'),(6,'Đồng hồ'),(7,'Xe cộ');
/*!40000 ALTER TABLE `loai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nguoidung` (
  `idNguoiDung` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) DEFAULT NULL,
  `hoTen` varchar(45) DEFAULT NULL,
  `diaChi` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `diemDanhGiaCong` int(11) DEFAULT '0',
  `diemDanhGiaTru` int(11) DEFAULT '0',
  `viTri` tinyint(1) DEFAULT NULL,
  `coQuyenBan` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idNguoiDung`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT INTO `nguoidung` VALUES (1,'e10adc3949ba59abbe56e057f20f883e','Nguyễn Thiên Long','42/4 Nguyễn Duy Trinh, Quận 2','ntlong@gmail.com',0,0,NULL,1),(2,'e10adc3949ba59abbe56e057f20f883e','Bùi Chí Kiên','56b Nguyễn Trãi, Quận 1','bckien@gmail.com',0,0,NULL,1),(3,'e10adc3949ba59abbe56e057f20f883e','Đặng Nhật Minh','227 Nguyễn Văn Cừ, Quận 5','dnminh@gmail.com',0,0,NULL,1),(4,'e10adc3949ba59abbe56e057f20f883e','Trương Thế Kiệt','43 Nguyễn Thị Minh Khai, Quận 3','ttkiet@gmail.com',0,0,NULL,1),(5,'e10adc3949ba59abbe56e057f20f883e','Trần Hoàng Lâm','37 Nguyễn Hữu Thọ, Quận 7','thlam@gmail.com',0,0,NULL,1),(6,'e10adc3949ba59abbe56e057f20f883e','Lê Anh Khôi','21 Lê Văn Việt, Quận Thủ Đức','lakhoi@gmail.com',0,0,NULL,0),(7,'e10adc3949ba59abbe56e057f20f883e','Trương Hữu Luân','31 Bùi Thị Xuân, Quận 1','thluan@gmail.com',0,0,NULL,0),(8,'e10adc3949ba59abbe56e057f20f883e','Huỳnh Công Lợi','70 Võ Thị Sáu, Quận 10','hcloi@gmail.com',0,0,NULL,0),(9,'e10adc3949ba59abbe56e057f20f883e','Ngô Văn Hùng','37 Nguyễn Thái Học, Quận 1','nvhung@gmail.com',0,0,NULL,0),(10,'e10adc3949ba59abbe56e057f20f883e','Huỳnh Bảo Lâm','63 Hùng Vương, Quận 5','hblam@gmail.com',0,0,NULL,0),(11,'e10adc3949ba59abbe56e057f20f883e','Phan Khánh Lâm','24 Nguyễn đình Chiểu, Quận 10','pklam@gmail.com',0,0,NULL,1),(12,'e10adc3949ba59abbe56e057f20f883e','Nguyễn Thế Lực','53 Nguyễn Thị Minh Khai, Quận 3','ntluc@gmail.com',0,0,NULL,1),(13,'e10adc3949ba59abbe56e057f20f883e','Trương Ngọc Nghĩa','24 Sư Vạn Hạnh, Quận 7','tnnghia@gmail.com',0,0,NULL,1),(14,'e10adc3949ba59abbe56e057f20f883e','Đoàn Minh Nhật Linh','43 Trần Hưng Đạo, Quận 1','dmnlinh@gmail.com',0,0,NULL,1),(15,'e10adc3949ba59abbe56e057f20f883e','Donald Trump','Nhà Trắng, Mỹ','dtrump@gmail.com',0,0,NULL,1);
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidungxinban`
--

DROP TABLE IF EXISTS `nguoidungxinban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nguoidungxinban` (
  `idNguoiDung` int(11) NOT NULL,
  `thoiDiemXinBan` datetime NOT NULL,
  PRIMARY KEY (`idNguoiDung`,`thoiDiemXinBan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidungxinban`
--

LOCK TABLES `nguoidungxinban` WRITE;
/*!40000 ALTER TABLE `nguoidungxinban` DISABLE KEYS */;
INSERT INTO `nguoidungxinban` VALUES (7,'2017-06-20 00:00:00'),(9,'2017-06-10 00:00:00');
/*!40000 ALTER TABLE `nguoidungxinban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sanpham` (
  `idSanPham` int(11) NOT NULL AUTO_INCREMENT,
  `tenSanPham` varchar(255) DEFAULT NULL,
  `giaHienTai` int(11) DEFAULT NULL,
  `giaMuaNgay` int(11) DEFAULT NULL,
  `idNguoiBan` int(11) DEFAULT NULL,
  `idNguoiGiaCaoNhat` int(11) DEFAULT NULL,
  `thoiDiemDang` datetime DEFAULT NULL,
  `thoiDiemKetThuc` datetime DEFAULT NULL,
  `buocGia` int(11) DEFAULT NULL,
  `moTa` varchar(2048) DEFAULT NULL,
  `tinhTrang` int(11) DEFAULT NULL,
  `luotBid` int(11) DEFAULT NULL,
  `loai` int(11) DEFAULT NULL,
  `tuDongGiaHan` int(11) DEFAULT '0',
  PRIMARY KEY (`idSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,'Sách Harry Potter',5,20,1,0,'2017-03-21 00:00:00','2018-08-28 00:00:00',1,'Sách nổi tiếng',0,0,1,1),(2,'Truyện Doreamon',2,20,1,10,'2017-02-13 00:00:00','2019-09-20 00:00:00',1,'Truyện vui nhộn',0,1,1,0),(3,'Samsung Galaxy Note 4',150,326,1,0,'2017-02-07 00:00:00','2018-08-10 00:00:00',3,'Điện thoại di động đầy đủ chức năng',0,0,2,0),(4,'Laptop MSI GP62',700,1000,2,0,'2017-04-21 00:00:00','2018-08-25 00:00:00',10,'Laptop chơi game cấu hình cao',0,0,2,0),(5,'TV Sony 40R350D',500,800,2,0,'2017-01-27 00:00:00','2019-08-05 00:00:00',25,'TV cao cấp',0,0,2,1),(6,'Quạt đứng PANASONIC',50,200,2,0,'2017-03-04 00:00:00','2019-08-30 00:00:00',5,'Quạt đứng cao cấp',0,0,3,1),(7,'Áo thể thao',10,100,3,0,'2017-02-05 00:00:00','2018-09-20 00:00:00',2,'Áo thể thao',0,0,4,0),(8,'Quần thể thao',9,60,3,8,'2017-04-24 00:00:00','2018-09-10 00:00:00',2,'Quần thể thao',0,5,4,1),(9,'Giày thể thao',75,300,3,0,'2017-05-26 00:00:00','2018-08-10 00:00:00',5,'Giày thể thao đẹp',0,0,4,0),(10,'Son',95,400,4,0,'2017-01-15 00:00:00','2019-08-25 00:00:00',5,'Son môi chất lượng',0,0,5,0),(11,'Kem dưỡng da lacvert essance',64,300,4,11,'2017-03-16 00:00:00','2018-08-16 00:00:00',10,'Kem dưỡng da cao cấp',0,1,5,0),(12,'Đồng hồ thời trang KASHMIR ROSEGOLD - SPACE',96,600,4,0,'2017-03-18 00:00:00','2018-06-04 00:00:00',5,'Mặt kính 38 mm',0,0,6,1),(13,'Xe máy Honda Wave',735,1600,5,0,'2017-01-11 00:00:00','2019-09-16 00:00:00',50,'Xe máy giá rẻ',0,0,7,0),(14,'Ô tô Toyota Camry',50000,600000,5,0,'2017-05-13 00:00:00','2018-09-27 00:00:00',100,'Ô tô 4 chỗ cao cấp',0,0,7,1),(15,'Xe máy Air Blade',18000,96000,5,0,'2017-03-10 00:00:00','2018-08-15 00:00:00',500,'Xe tay ga cao cấp',0,0,7,0),(16,'Điện thoại Nokia N72',150,645,6,0,'2017-06-24 00:00:00','2018-08-04 00:00:00',5,'Điện thoại đẹp',0,0,2,0),(17,'Tủ Lạnh Inverter Toshiba ',649,1600,6,0,'2017-03-15 00:00:00','2018-08-22 00:00:00',10,'Ion Ag+ khử mùi diệt khuẩn tối ưu',0,0,3,1),(18,'Giày nam đen lịch lãm',69,500,6,0,'2017-02-10 00:00:00','2018-08-02 00:00:00',12,'Kiểu dáng lịch lãm, huyền bí',0,0,4,0),(19,'Mặt dây chuyền PNJ',300,1200,10,0,'2017-03-02 00:00:00','2018-08-15 00:00:00',10,'VÀNG TRẮNG 10K ĐÍNH ĐÁ ECZ 77652.106',0,0,4,0),(20,'Bộ Máy Khoan 37 Chi Tiết',19,400,7,0,'2017-05-07 00:00:00','2019-08-16 00:00:00',10,'Máy khoan động lực công suất 710W',0,0,3,0),(21,'Smart Tivi 4K Skyworth 50 inch',260,900,7,0,'2017-05-26 00:00:00','2018-08-22 00:00:00',5,'Tivi 4k 50 inch',0,0,2,1),(22,'Smart Tivi Cong 4K Samsung',345,865,8,0,'2017-04-25 00:00:00','2018-10-02 00:00:00',8,'Tivi cong 4k 49 inch',0,0,2,1),(23,'Tivi Sony 4K',64,425,8,0,'2017-04-14 00:00:00','2018-08-06 00:00:00',8,'Tivi 55 inch',0,0,2,0),(24,'Bộ Dàn Mini Denon',530,1650,8,6,'2017-03-16 00:00:00','2018-08-01 00:00:00',10,'Loa bass/mid 12 cm và loa treble doem 2.0 cm',0,6,2,0),(25,'Samsung Galaxy S8 Plus',700,1980,9,0,'2017-04-25 00:00:00','2018-08-02 00:00:00',12,'Công nghệ màn hình: Super AMOLED 6.2\"',0,0,2,0),(26,'Máy Ảnh Canon PowerShot',168,900,9,0,'2017-05-25 00:00:00','2018-08-04 00:00:00',12,'Zoom quang học 45x (24 - 1080 mm) với ZoomPlus 90x, Cảm biến 20.0 megapixel',0,0,2,1),(27,'Giày Thể Thao Biti\'s Nữ Hunter',26,800,9,9,'2017-02-16 00:00:00','2018-08-08 00:00:00',22,'Đế Fylong cao cấp siêu nhẹ, đàn hồi tốt đem lại cảm giác êm ái khi di chuyển',0,4,4,1),(28,'Giày Thể Thao - Nữ Hoàng',34,700,10,0,'2017-05-05 00:00:00','2018-08-05 00:00:00',16,'Có điểm nhấn là hình ảnh 2 chị em Elsa và Anna',0,0,4,1),(29,'Combo 6 Ly Làm Đá Inox',1,100,10,0,'2017-03-08 00:00:00','2018-08-02 00:00:00',2,'Ly làm đá cực nhanh',0,0,3,0),(30,'Bình Giữ Nhiệt Carlmann',1,95,10,0,'2017-02-13 00:00:00','2018-08-13 00:00:00',2,'Giữ nhiệt 8 - 10 tiếng',0,0,3,0),(31,'Bộ Bình Ly 7 Món Arc Salto',4,120,11,0,'2017-05-11 00:00:00','2018-08-24 00:00:00',4,'Chịu được nhiệt độ cao, hạn chế sự nứt vỡ do tác động của nhiệt',0,0,3,0),(32,'Bộ Chén Đĩa Thủy Tinh Ronda',10,190,11,0,'2017-01-10 00:00:00','2018-08-27 00:00:00',5,'Cứng cáp chống bụi bẩn',0,0,3,0),(33,'Đốt Tinh Dầu 3 Chân Gốm Sứ',2,200,11,7,'2017-02-17 00:00:00','2018-08-27 00:00:00',15,'Chống bụi bẩn',0,6,3,0),(34,'Balo Thời Trang Huy Hoàng',32,460,11,0,'2017-03-13 00:00:00','2018-08-18 00:00:00',12,'Bền bị, chống bụi',0,0,4,0),(35,'Ví Nữ Da Cá Sấu Cao Cấp',42,650,12,0,'2017-05-19 00:00:00','2018-08-16 00:00:00',10,'Da cá sấu nguyên chất',0,0,4,0),(36,'Đồng Hồ Nam Dây Da Limit',16,648,12,0,'2017-01-29 00:00:00','2018-08-15 00:00:00',24,'Mặt kính khoáng cứng cáp, bóng sáng và chống trầy hiệu quả',0,0,6,0),(37,'Mắt Kính Unisex Levi’s LS',29,800,12,0,'2017-02-22 00:00:00','2018-08-15 00:00:00',28,'Trọng lượng siêu nhẹ,Gọng Plastic chống gỉ',0,0,4,0),(38,'Mặt Nạ Ngủ Cung Cấp Nước',20,262,12,0,'2017-04-23 00:00:00','2018-08-13 00:00:00',20,'Cung cấp nước tức thì',0,0,5,0),(39,'Sữa Rửa Mặt Tẩy Trang',36,364,13,5,'2017-01-25 00:00:00','2018-08-22 00:00:00',12,'Hàng cao cấp chất lượng cao',0,7,5,0),(40,'Máy Đo Huyết Áp Bắp Tay',50,199,13,0,'2017-02-14 00:00:00','2018-08-26 00:00:00',12,'Công nghệ Gentle+: Thông minh hơn, nhanh hơn, thoải mái hơn',0,0,5,0),(41,'Thang Nhôm Gấp Chữ A',49,299,13,0,'2017-04-13 00:00:00','2018-08-25 00:00:00',14,'Khung thang và các bậc bằng nhôm nên bền, không bị gỉ sét hay ăn mòn',0,0,3,0),(42,'Thiết Bị Đuổi Côn Trùng',5,129,13,0,'2017-03-16 00:00:00','2018-08-24 00:00:00',15,'Không dùng hóa chất, an toàn khi sử dụng',0,0,3,0),(43,'Máy Quay Phim Sony FDR',852,6500,14,0,'2017-05-13 00:00:00','2018-08-18 00:00:00',50,'Quay phim 4k',0,0,2,0),(44,'Thực phẩm bồi bổ',65,450,14,0,'2017-05-12 00:00:00','2018-08-17 00:00:00',50,'Dùng để tăng cường sức khỏe, giảm stress, chống mệt mỏi...',0,0,5,0),(45,'Tony Buổi sáng',6,199,14,0,'2017-04-15 00:00:00','2018-08-16 00:00:00',12,'Cafe sách cùng Tony',0,0,1,0),(46,'Sách Trò chơi sinh tử',4,199,4,0,'2017-04-17 00:00:00','2018-08-25 00:00:00',12,'Truyện cực hay',0,0,1,0),(47,'Xe Yamaha 150i',254,1650,2,0,'2017-01-24 00:00:00','2018-08-15 00:00:00',50,'Xe 150 phân khối yamaha',0,0,7,0),(48,'Xe yamaha sirius fi 2017 ',296,1900,3,0,'2017-05-24 00:00:00','2018-08-13 00:00:00',50,'Xe yamaha sirius',0,0,7,0),(49,'Xe MERCEDES S400L',54000,100000,1,0,'2017-04-26 00:00:00','2018-08-02 00:00:00',500,'Xe ô tô 4 chỗ hiệu MERCEDES',0,0,7,0),(50,'Đồng hồ thời trang  KASHMIR SILVER - PORCINI',960,29000,15,4,'2017-03-25 00:00:00','2018-08-03 00:00:00',120,'Thép không gỉ 316L',0,9,6,0);
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('DeuU6ekQcEm_KIDbFqX7-7jcQifGEVbQ',1526487694,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isLogged\":true,\"user\":{\"idNguoiDung\":1,\"password\":\"e10adc3949ba59abbe56e057f20f883e\",\"hoTen\":\"Nguyễn Thiên Long\",\"diaChi\":\"42/4 Nguyễn Duy Trinh, Quận 2\",\"email\":\"ntlong@gmail.com\",\"diemDanhGiaCong\":0,\"diemDanhGiaTru\":0,\"viTri\":null,\"coQuyenBan\":1}}'),('Df5vBTdVsJzYHUw-fgsVqM61ZBGXyaKA',1526502255,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('HTPJXLaW3MxHqZb6GLQaYClx1A-Azwyp',1526573110,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-16 23:32:12
