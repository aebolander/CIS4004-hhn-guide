--
-- Table structure for table `hhn_shows_by_person`
--

DROP TABLE IF EXISTS `hhn_shows_by_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hhn_shows_by_person` (
  `person_id` int NOT NULL,
  `show_id` int NOT NULL,
  `visit_count` int DEFAULT NULL,
  PRIMARY KEY (`person_id`,`show_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;