-- MySQL dump 10.13  Distrib 5.7.19, for Win64 (x86_64)
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
-- Table structure for table `binhluan`
--

DROP TABLE IF EXISTS `binhluan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `binhluan` (
  `idBinhLuan` int(11) NOT NULL AUTO_INCREMENT,
  `idSanPham` int(11) DEFAULT NULL,
  `idNguoiDung` int(11) DEFAULT NULL,
  `binhLuan` varchar(2048) DEFAULT NULL,
  `thoiDiem` datetime DEFAULT NULL,
  `tenNguoiBinhLuan` varchar(2018) DEFAULT NULL,
  PRIMARY KEY (`idBinhLuan`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `binhluan`
--

LOCK TABLES `binhluan` WRITE;
/*!40000 ALTER TABLE `binhluan` DISABLE KEYS */;
INSERT INTO `binhluan` VALUES (1,1,2,'Hàng tốt','2017-04-01 00:00:00',NULL),(2,2,4,'Uy tín cao','2017-06-01 00:00:00',NULL),(3,3,5,'Tốt','2017-04-01 00:00:00',NULL),(4,4,1,'Không có tiếng cho lắm','2017-01-22 00:00:00',NULL),(5,5,9,'Uy Tín','2017-02-18 00:00:00',NULL),(6,6,6,'Hơi nghi ngờ','2017-05-15 00:00:00',NULL),(7,7,2,'Có thể tin tưởng','2017-06-09 00:00:00',NULL),(8,8,8,'Không tin tưởng','2017-03-10 00:00:00',NULL),(9,9,5,'Giá và hàng đều tốt','2017-03-23 00:00:00',NULL),(10,10,1,'Thanh toán khó khăn','2017-04-28 00:00:00',NULL),(11,11,3,'Chất lượng hàng không ổn','2017-01-06 00:00:00',NULL),(12,12,3,'Có uy tín','2017-04-02 00:00:00',NULL),(13,13,7,'Vote cho bác','2017-02-11 00:00:00',NULL);
/*!40000 ALTER TABLE `binhluan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitiethoadon`
--

DROP TABLE IF EXISTS `chitiethoadon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chitiethoadon` (
  `soHoaDon` int(11) NOT NULL,
  `idSanPham` int(11) NOT NULL,
  `tenSanPham` varchar(500) DEFAULT NULL,
  `soLuong` varchar(45) DEFAULT NULL,
  `donGia` int(11) DEFAULT NULL,
  `thanhTien` int(11) DEFAULT NULL,
  PRIMARY KEY (`soHoaDon`,`idSanPham`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitiethoadon`
--

LOCK TABLES `chitiethoadon` WRITE;
/*!40000 ALTER TABLE `chitiethoadon` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitiethoadon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giohang`
--

DROP TABLE IF EXISTS `giohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giohang` (
  `idNguoiDung` int(11) NOT NULL,
  `idSanPham` int(11) NOT NULL,
  `SoLuongSP` int(11) DEFAULT NULL,
  PRIMARY KEY (`idNguoiDung`,`idSanPham`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giohang`
--

LOCK TABLES `giohang` WRITE;
/*!40000 ALTER TABLE `giohang` DISABLE KEYS */;
/*!40000 ALTER TABLE `giohang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoadon`
--

DROP TABLE IF EXISTS `hoadon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hoadon` (
  `soHoaDon` int(11) NOT NULL AUTO_INCREMENT,
  `NgayLap` datetime DEFAULT NULL,
  `tenKhachHang` varchar(100) DEFAULT NULL,
  `tongTien` int(11) DEFAULT NULL,
  PRIMARY KEY (`soHoaDon`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadon`
--

LOCK TABLES `hoadon` WRITE;
/*!40000 ALTER TABLE `hoadon` DISABLE KEYS */;
INSERT INTO `hoadon` VALUES (2,'2055-00-00 00:00:00',NULL,NULL),(11,'2062-00-00 00:00:00',NULL,NULL);
/*!40000 ALTER TABLE `hoadon` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai`
--

LOCK TABLES `loai` WRITE;
/*!40000 ALTER TABLE `loai` DISABLE KEYS */;
INSERT INTO `loai` VALUES (1,'Sách'),(2,'Thiết bị số'),(3,'Đồ gia dụng'),(4,'Thời trang'),(5,'Làm đẹp - Sức khỏe'),(6,'Đồng hồ'),(7,'Xe cộ'),(8,'Media');
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
INSERT INTO `nguoidung` VALUES (1,'e10adc3949ba59abbe56e057f20f883e','Nguyễn Thiên Long','42/4 Nguyễn Duy Trinh, Quận 2','ntlong@gmail.com',0,0,NULL,1),(2,'e10adc3949ba59abbe56e057f20f883e','Bùi Chí Kiên','56b Nguyễn Trãi, Quận 1','bckien@gmail.com',0,0,NULL,1),(3,'e10adc3949ba59abbe56e057f20f883e','Đặng Nhật Minh','227 Nguyễn Văn Cừ, Quận 5','dnminh@gmail.com',0,0,NULL,1),(4,'e10adc3949ba59abbe56e057f20f883e','Trương Thế Kiệt','43 Nguyễn Thị Minh Khai, Quận 3','ttkiet@gmail.com',0,0,NULL,1),(5,'e10adc3949ba59abbe56e057f20f883e','Trần Hoàng Lâm','37 Nguyễn Hữu Thọ, Quận 7','thlam@gmail.com',0,0,NULL,1),(6,'e80b5017098950fc58aad83c8c14978e','Lê Anh Khôi','21 Lê Văn Việt, Quận Thủ Đức','lakhoi@gmail.com',0,0,NULL,0),(7,'e10adc3949ba59abbe56e057f20f883e','Trương Hữu Luân','31 Bùi Thị Xuân, Quận 1','thluan@gmail.com',0,0,NULL,0),(8,'e10adc3949ba59abbe56e057f20f883e','Huỳnh Công Lợi','70 Võ Thị Sáu, Quận 10','hcloi@gmail.com',0,0,NULL,0),(9,'e10adc3949ba59abbe56e057f20f883e','Ngô Văn Hùng','37 Nguyễn Thái Học, Quận 1','nvhung@gmail.com',0,0,NULL,1),(10,'e10adc3949ba59abbe56e057f20f883e','Huỳnh Bảo Lâm','63 Hùng Vương, Quận 5','hblam@gmail.com',0,0,NULL,0),(11,'e10adc3949ba59abbe56e057f20f883e','Phan Khánh Lâm','24 Nguyễn đình Chiểu, Quận 10','pklam@gmail.com',0,0,NULL,1),(12,'e10adc3949ba59abbe56e057f20f883e','Nguyễn Thế Lực','53 Nguyễn Thị Minh Khai, Quận 3','ntluc@gmail.com',0,0,NULL,1),(13,'e10adc3949ba59abbe56e057f20f883e','Trương Ngọc Nghĩa','24 Sư Vạn Hạnh, Quận 7','tnnghia@gmail.com',0,0,NULL,1),(14,'e10adc3949ba59abbe56e057f20f883e','Đoàn Minh Nhật Linh','43 Trần Hưng Đạo, Quận 1','dmnlinh@gmail.com',0,0,NULL,1),(15,'e10adc3949ba59abbe56e057f20f883e','Donald Trump','Nhà Trắng, Mỹ','dtrump@gmail.com',0,0,NULL,1);
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
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
  `giaSanPham` int(11) DEFAULT NULL,
  `giaHienTai` int(11) DEFAULT NULL,
  `daBan` int(11) DEFAULT NULL,
  `moTa` varchar(2048) DEFAULT NULL,
  `tinhTrang` int(11) DEFAULT NULL,
  `luotXem` int(11) DEFAULT NULL,
  `loai` int(11) DEFAULT NULL,
  `khoHang` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,'Sách Harry Potter',30,20,10,'Sách nổi tiếng',0,0,1,100),(2,'Truyện Doreamon',18,20,12,'Truyện vui nhộn',0,1,1,100),(3,'Samsung Galaxy Note 4',500,326,13,'Điện thoại di động đầy đủ chức năng',0,0,2,100),(4,'Laptop MSI GP62',1200,1000,10,'Laptop chơi game cấu hình cao',0,0,2,100),(5,'TV Sony 40R350D',900,800,25,'TV cao cấp',0,0,2,100),(6,'Quạt đứng PANASONIC',210,200,9,'Quạt đứng cao cấp',0,0,3,100),(7,'Áo thể thao',200,100,22,'Áo thể thao',0,0,4,100),(8,'Quần thể thao',65,60,35,'Quần thể thao',0,5,4,100),(9,'Giày thể thao',400,300,15,'Giày thể thao đẹp',0,0,4,100),(10,'Son',300,400,35,'Son môi chất lượng',0,0,5,100),(11,'Kem dưỡng da lacvert essance',500,300,95,'Kem dưỡng da cao cấp',0,1,5,100),(12,'Đồng hồ thời trang KASHMIR ROSEGOLD - SPACE',700,600,10,'Mặt kính 38 mm',0,0,6,100),(13,'Xe máy Honda Wave',1800,1600,56,'Xe máy giá rẻ',0,0,7,100),(14,'Ô tô Toyota Camry',5000000,600000,95,'Ô tô 4 chỗ cao cấp',0,0,7,500),(15,'Xe máy Air Blade',96000,96000,265,'Xe tay ga cao cấp',0,0,7,500),(16,'Điện thoại Nokia N72',645,645,56,'Điện thoại đẹp',0,0,2,500),(17,'Tủ Lạnh Inverter Toshiba ',1600,1600,35,'Ion Ag+ khử mùi diệt khuẩn tối ưu',0,0,3,500),(18,'Giày nam đen lịch lãm',500,500,12,'Kiểu dáng lịch lãm, huyền bí',0,0,4,100),(19,'Mặt dây chuyền PNJ',1200,1200,10,'VÀNG TRẮNG 10K ĐÍNH ĐÁ ECZ 77652.106',0,0,4,100),(20,'Bộ Máy Khoan 37 Chi Tiết',500,400,25,'Máy khoan động lực công suất 710W',0,0,3,100),(21,'Smart Tivi 4K Skyworth 50 inch',1000,900,34,'Tivi 4k 50 inch',0,0,2,100),(22,'Smart Tivi Cong 4K Samsung',1000,865,19,'Tivi cong 4k 49 inch',0,0,2,100),(23,'Tivi Sony 4K',500,425,28,'Tivi 55 inch',0,0,2,100),(24,'Bộ Dàn Mini Denon',1800,1650,19,'Loa bass/mid 12 cm và loa treble doem 2.0 cm',0,6,2,100),(25,'Samsung Galaxy S8 Plus',2000,1980,22,'Công nghệ màn hình: Super AMOLED 6.2\"',0,0,2,100),(26,'Máy Ảnh Canon PowerShot',1000,900,55,'Zoom quang học 45x (24 - 1080 mm) với ZoomPlus 90x, Cảm biến 20.0 megapixel',0,0,2,100),(27,'Giày Thể Thao Biti\'s Nữ Hunter',1000,800,31,'Đế Fylong cao cấp siêu nhẹ, đàn hồi tốt đem lại cảm giác êm ái khi di chuyển',0,4,4,100),(28,'Giày Thể Thao - Nữ Hoàng',800,700,16,'Có điểm nhấn là hình ảnh 2 chị em Elsa và Anna',0,0,4,100),(29,'Combo 6 Ly Làm Đá Inox',120,100,48,'Ly làm đá cực nhanh',0,0,3,100),(30,'Bình Giữ Nhiệt Carlmann',100,95,22,'Giữ nhiệt 8 - 10 tiếng',0,0,3,100),(31,'Bộ Bình Ly 7 Món Arc Salto',140,120,74,'Chịu được nhiệt độ cao, hạn chế sự nứt vỡ do tác động của nhiệt',0,0,3,100),(32,'Bộ Chén Đĩa Thủy Tinh Ronda',200,190,9,'Cứng cáp chống bụi bẩn',0,0,3,100),(33,'Đốt Tinh Dầu 3 Chân Gốm Sứ',200,200,15,'Chống bụi bẩn',0,6,3,100),(34,'Balo Thời Trang Huy Hoàng',450,460,12,'Bền bị, chống bụi',0,0,4,100),(35,'Ví Nữ Da Cá Sấu Cao Cấp',900,650,10,'Da cá sấu nguyên chất',0,0,4,100),(36,'Đồng Hồ Nam Dây Da Limit',700,648,24,'Mặt kính khoáng cứng cáp, bóng sáng và chống trầy hiệu quả',0,0,6,100),(37,'Mắt Kính Unisex Levi’s LS',800,800,28,'Trọng lượng siêu nhẹ,Gọng Plastic chống gỉ',0,0,4,100),(38,'Mặt Nạ Ngủ Cung Cấp Nước',400,262,20,'Cung cấp nước tức thì',0,0,5,100),(39,'Sữa Rửa Mặt Tẩy Trang',400,364,12,'Hàng cao cấp chất lượng cao',0,7,5,100),(40,'Máy Đo Huyết Áp Bắp Tay',200,199,12,'Công nghệ Gentle+: Thông minh hơn, nhanh hơn, thoải mái hơn',0,0,5,100),(41,'Thang Nhôm Gấp Chữ A',300,299,14,'Khung thang và các bậc bằng nhôm nên bền, không bị gỉ sét hay ăn mòn',0,0,3,100),(42,'Thiết Bị Đuổi Côn Trùng',150,129,15,'Không dùng hóa chất, an toàn khi sử dụng',0,0,3,100),(43,'Máy Quay Phim Sony FDR',6700,6500,45,'Quay phim 4k',0,0,2,100),(44,'Thực phẩm bồi bổ',450,450,12,'Dùng để tăng cường sức khỏe, giảm stress, chống mệt mỏi...',0,0,5,100),(45,'Tony Buổi sáng',200,199,12,'Cafe sách cùng Tony',0,0,1,100),(46,'Sách Trò chơi sinh tử',200,199,12,'Truyện cực hay',0,0,1,100),(47,'Xe Yamaha 150i',1700,1650,32,'Xe 150 phân khối yamaha',0,0,7,100),(48,'Xe yamaha sirius fi 2017 ',200,1900,24,'Xe yamaha sirius',0,0,7,100),(49,'Xe MERCEDES S400L',100000,100000,29,'Xe ô tô 4 chỗ hiệu MERCEDES',0,0,7,100),(50,'Đồng hồ thời trang  KASHMIR SILVER - PORCINI',30000,29000,28,'Thép không gỉ 316L',0,9,6,100);
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
INSERT INTO `sessions` VALUES ('9hwyrxFOb_GTJfoGuh2cyhSCiUp4ZVNQ',1526912297,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('v576QSBivOktwysaGGxAcXvUTK45rdJG',1526842771,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');
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

-- Dump completed on 2018-05-20 21:23:52
