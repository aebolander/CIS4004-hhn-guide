--
-- Table structure for table `hhn_shows`
--

DROP TABLE IF EXISTS `hhn_shows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hhn_shows` (
  `show_id` int NOT NULL AUTO_INCREMENT,
  `show_name` varchar(200) NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`show_id`),
  KEY `show_name_key` (`show_name`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hhn_shows`
--

LOCK TABLES `hhn_shows` WRITE;
/*!40000 ALTER TABLE `hhn_shows` DISABLE KEYS */;
INSERT INTO `hhn_shows` VALUES (1,'Halloween Nightmare Fuel',2),(2,'Marathon of Mayhem: Carnage Factory',2),(3,'Halloween Nightmare Fuel: Wildfire',3),(4,'Ghoulish! A Halloween Tale',3),(5,'Halloween Nightmare Fuel Revenge Dream',4),(6,'Halloween Nightmare Fuel: Nocturnal Circus',5);
/*!40000 ALTER TABLE `hhn_shows` ENABLE KEYS */;
UNLOCK TABLES;