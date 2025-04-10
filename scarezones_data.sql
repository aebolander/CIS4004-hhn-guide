-- Table structure for table `hhn_scarezones`
--

DROP TABLE IF EXISTS `hhn_scarezones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hhn_scarezones` (
  `scarezone_id` int NOT NULL AUTO_INCREMENT,
  `scarezone_name` varchar(200) NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`scarezone_id`),
  KEY `scarezone_name_key` (`scarezone_name`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hhn_scarezones`
--

LOCK TABLES `hhn_scarezones` WRITE;
/*!40000 ALTER TABLE `hhn_scarezones` DISABLE KEYS */;
INSERT INTO `hhn_scarezones` VALUES (1,'Crypt TV',2),(2,'30 Years 30 Fears',2),(3,'Seek and Destroy',2),(4,'Gorewood Forrest',2),(5,'Lights Camera Hacktion: Eddie’s Revenge',2),(6,'Horrors of Halloween',3),(7,'Sweet Revenge',3),(8,'Conjure the Dark',3),(9,'Scarecrow: Cursed Soil',3),(10,'Graveyard: Deadly Unrest',3),(11,'Dr. Oddfellow’s Collection of Horror',4),(12,'Dark Zodiac',4),(13,'Jungle of Doom: Expedition Horror',4),(14,'Vamp ‘69: Summer of Blood',4),(15,'Shipyard 32: Horrors Unhinged',4),(16,'Duality of Fear',5),(17,'Demon Queens',5),(18,'Swamp of the Undead',5),(19,'Torture Faire',5),(20,'Enter the Blumhouse',5);
/*!40000 ALTER TABLE `hhn_scarezones` ENABLE KEYS */;
UNLOCK TABLES;