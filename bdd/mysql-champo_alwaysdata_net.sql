-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql-champo.alwaysdata.net
-- Generation Time: May 07, 2022 at 08:05 PM
-- Server version: 10.6.5-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `champo_bdd_technoweb`
--
CREATE DATABASE IF NOT EXISTS `champo_bdd_technoweb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `champo_bdd_technoweb`;

-- --------------------------------------------------------

--
-- Table structure for table `Commentaire`
--

CREATE TABLE `Commentaire` (
  `UtilisateurCom` int(11) NOT NULL,
  `LieuCom` int(11) NOT NULL,
  `texte` varchar(5000) NOT NULL,
  `dat` date NOT NULL,
  `tps` time NOT NULL,
  `noteCom` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Commentaire`
--

INSERT INTO `Commentaire` (`UtilisateurCom`, `LieuCom`, `texte`, `dat`, `tps`, `noteCom`) VALUES
(1, 1, 'Mashallah', '2022-05-07', '17:12:44', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Events`
--

CREATE TABLE `Events` (
  `idEvent` int(11) NOT NULL,
  `nomEvent` varchar(80) DEFAULT NULL,
  `dateEventDeb` date NOT NULL,
  `dateEventFin` date NOT NULL,
  `actif` tinyint(1) DEFAULT 0,
  `descEvent` varchar(5000) NOT NULL,
  `pathImgEvent` varchar(1000) DEFAULT NULL
) ;

--
-- Dumping data for table `Events`
--

INSERT INTO `Events` (`idEvent`, `nomEvent`, `dateEventDeb`, `dateEventFin`, `actif`, `descEvent`, `pathImgEvent`) VALUES
(1, 'Carnaval', '2023-02-21', '2023-02-25', 0, 'Voici le carnaval d albi!', 'carnaval.jpg'),
(2, 'Marché de Noël', '2021-12-03', '2022-01-02', 0, 'Marché de Noël sur la place du Vigan', 'MarcheDeNoel.jpg'),
(3, 'Urban Festival dans le rétro', '2022-05-02', '2022-05-27', 1, 'Urban Festival s\'expose avec les 21 affiches retraçant toute l\'histoire d\'un festival dédié en direction de la jeunesse et les meilleures photos du photographe Sébastien Pioch. Ambiance musicale avec DJ Albert .', 'UrbanFestival.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Frequentation`
--

CREATE TABLE `Frequentation` (
  `dateFrequentation` varchar(80) NOT NULL,
  `nbVisites` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Frequentation`
--

INSERT INTO `Frequentation` (`dateFrequentation`, `nbVisites`) VALUES
('2020-07-10', 150),
('2021-05-10', 45),
('2022-05-07', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Liaison_QuestionLReponseL`
--

CREATE TABLE `Liaison_QuestionLReponseL` (
  `idQL` int(11) NOT NULL,
  `idRL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Liaison_QuestionLReponseL`
--

INSERT INTO `Liaison_QuestionLReponseL` (`idQL`, `idRL`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(3, 9),
(3, 10),
(3, 11),
(3, 12),
(4, 13),
(4, 14),
(4, 15),
(4, 16),
(5, 17),
(5, 18),
(5, 19),
(5, 20),
(6, 21),
(6, 22),
(6, 23),
(6, 24),
(7, 25),
(7, 26),
(7, 27),
(7, 28),
(8, 29),
(8, 30),
(8, 31),
(8, 32),
(9, 33),
(9, 34),
(9, 35),
(9, 36),
(10, 37),
(10, 38),
(10, 39),
(10, 40);

-- --------------------------------------------------------

--
-- Table structure for table `Lieu`
--

CREATE TABLE `Lieu` (
  `idLieu` int(11) NOT NULL,
  `lat` float NOT NULL,
  `longu` float NOT NULL,
  `intitule` varchar(80) NOT NULL,
  `caracteristque` enum('Culturel','Restaurant','Hotel') DEFAULT NULL,
  `note` float DEFAULT NULL,
  `descriptionLieu` varchar(5000) DEFAULT NULL,
  `pathImgLieu` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Lieu`
--

INSERT INTO `Lieu` (`idLieu`, `lat`, `longu`, `intitule`, `caracteristque`, `note`, `descriptionLieu`, `pathImgLieu`) VALUES
(1, 43.9285, 2.1426, 'Cathedrale Sainte-Cecile', 'Culturel', NULL, 'Une Cathedrale.', 'cath.jpg'),
(2, 43.9287, 2.14277, 'Musee Toulouse-Lautrec', 'Culturel', NULL, 'Musee ', 'Toulouse-Lautrec.jpg'),
(3, 43.93, 2.14322, 'Berges du Tarn', 'Culturel', NULL, 'Promenade au bord du Tarn', 'BergesTarn.jpg'),
(4, 2.14458, 43.9277, 'Cloître Saint-Salvi', 'Culturel', NULL, 'Beau cloître avec terrasse', 'CloitreSaintSalvi.jpg'),
(5, 43.9238, 2.14547, 'Bastet Café', 'Restaurant', NULL, 'Bar à chats avec terrasse', 'BastetCafe.jpg'),
(6, 43.9246, 2.14418, 'L\'Atelier Gourmand', 'Restaurant', NULL, 'Restaurant de tacos personnalisés', 'LAtelierGourmand.jpg'),
(7, 43.9328, 2.1461, 'Hôtel Mercure Albi Bastides', 'Hotel', NULL, 'Hôtel sympathique au bord du tarn', 'HotelMercureAlbi.jpg'),
(8, 43.9256, 2.15182, 'Hôtel les Pasteliers', 'Hotel', NULL, 'Hôtel', 'HotelPasteliers.jpg'),
(9, 43.9314, 2.14457, 'Pont Vieux', 'Culturel', NULL, 'Je suis un pont et je suis vieux', 'PontVieux.jpg'),
(10, 43.9251, 2.14529, 'Hôtel Lapérouse des Cordeliers', 'Hotel', NULL, 'Je suis un autre hôtel', 'HotelLaperouseCordeliers.jpg'),
(11, 43.925, 2.15155, 'Oki', 'Restaurant', NULL, 'Restaurant Japonais', 'Oki.jpg'),
(12, 43.9241, 2.14457, 'Scène Nationale d Albi', 'Culturel', NULL, 'Le théâtre d Albi', 'SceneNationaleDAlbi.jpg'),
(13, 43.9259, 2.14545, 'Statue de Lapérouse', 'Culturel', NULL, 'Statue de Lapérouse', 'StatueLaperouse.jpg'),
(14, 43.9327, 2.14582, 'Les Moulins Albigeois', 'Culturel', NULL, 'Les moulins d Albi', 'MoulinsAlbigeois.jpg'),
(15, 43.9276, 2.1476, 'Le Pontié', 'Restaurant', NULL, 'Le Pontié est un resto', 'LePontie.jpg'),
(16, 43.9271, 2.14785, 'Place du Vigan', 'Culturel', NULL, 'Place du centre ville', 'PlaceVigan.jpg'),
(17, 43.9273, 2.14746, 'La Mie Câline', 'Restaurant', NULL, 'Mie Caline du vigan', 'MieCalineVigan.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `QuestionL`
--

CREATE TABLE `QuestionL` (
  `idQuestionL` int(11) NOT NULL,
  `texteQuestionL` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `QuestionL`
--

INSERT INTO `QuestionL` (`idQuestionL`, `texteQuestionL`) VALUES
(1, 'Quelle plante a permis à Albi de s\'enrichir?'),
(2, 'Quel minerai était extrait à Carmaux, à proximité d\'Albi?'),
(3, 'Quel minerai était extrait à Carmaux, à proximité d\'Albi?'),
(4, 'Quel explorateur français célèbre est né à Albi?'),
(5, 'Quel est le nom des habitants d\'Albi?'),
(6, 'Quel est le surnom d\'Albi?'),
(7, 'Quel est le nom de la cathédrale d\'Albi?'),
(8, 'Quel peintre est né à Albi?'),
(9, 'Quand débute la construction de la cathédrale d\'Albi?'),
(10, 'Quelle est la particularité de la cathédrale d\'Albi?');

-- --------------------------------------------------------

--
-- Table structure for table `ReponseL`
--

CREATE TABLE `ReponseL` (
  `idReponseL` int(11) NOT NULL,
  `texteReponseL` varchar(1000) DEFAULT NULL,
  `bonneRep` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ReponseL`
--

INSERT INTO `ReponseL` (`idReponseL`, `texteReponseL`, `bonneRep`) VALUES
(1, 'le coton', 0),
(2, 'le lin', 0),
(3, 'l\'orge', 0),
(4, 'le pastel', 1),
(5, 'le charbon', 0),
(6, 'le fer', 0),
(7, 'la houille', 1),
(8, 'le cuivre', 0),
(9, 'Georges Pompidou', 1),
(10, 'Alain Poher', 0),
(11, 'François Mitterrand', 0),
(12, 'René Coty', 0),
(13, 'Jean-François Lapérouse', 1),
(14, 'Jacques Cartier', 0),
(15, 'Christophe Colomb', 0),
(16, 'Francisco Pizarro', 0),
(17, 'les Albigiens', 0),
(18, 'les Albigeais', 0),
(19, 'les Albigeois', 1),
(20, 'les Albiais', 0),
(21, 'la ville rouge', 1),
(22, 'La ville rose', 0),
(23, 'la ville jaune', 0),
(24, 'la ville ocre', 0),
(25, 'Sainte-Marie', 0),
(26, 'Sainte-Cécile', 1),
(27, 'Sainte-Anne', 0),
(28, 'Sainte-Sophie', 0),
(29, 'Cézanne', 0),
(30, 'Renoir', 0),
(31, 'Toulouse-Lautrec', 1),
(32, 'Van Gogh', 0),
(33, '1282', 1),
(34, '1255', 0),
(35, '1309', 0),
(36, '1328', 0),
(37, 'ses fresques', 1),
(38, 'son absence d\'orgue', 0),
(39, 'n a jamais eu de cloche', 0),
(40, 'est la cathédrale la plus haute', 0);

-- --------------------------------------------------------

--
-- Table structure for table `seqEvents`
--

CREATE TABLE `seqEvents` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) UNSIGNED NOT NULL,
  `cycle_option` tinyint(1) UNSIGNED NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB;

--
-- Dumping data for table `seqEvents`
--

INSERT INTO `seqEvents` (`next_not_cached_value`, `minimum_value`, `maximum_value`, `start_value`, `increment`, `cache_size`, `cycle_option`, `cycle_count`) VALUES
(1, 1, 9223372036854775806, 1, 1, 1000, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `seqLieu`
--

CREATE TABLE `seqLieu` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) UNSIGNED NOT NULL,
  `cycle_option` tinyint(1) UNSIGNED NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB;

--
-- Dumping data for table `seqLieu`
--

INSERT INTO `seqLieu` (`next_not_cached_value`, `minimum_value`, `maximum_value`, `start_value`, `increment`, `cache_size`, `cycle_option`, `cycle_count`) VALUES
(1, 1, 9223372036854775806, 1, 1, 1000, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `seqUtilisateur`
--

CREATE TABLE `seqUtilisateur` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) UNSIGNED NOT NULL,
  `cycle_option` tinyint(1) UNSIGNED NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB;

--
-- Dumping data for table `seqUtilisateur`
--

INSERT INTO `seqUtilisateur` (`next_not_cached_value`, `minimum_value`, `maximum_value`, `start_value`, `increment`, `cache_size`, `cycle_option`, `cycle_count`) VALUES
(1, 1, 9223372036854775806, 1, 1, 1000, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Utilisateur`
--

CREATE TABLE `Utilisateur` (
  `idUtilisateur` int(11) NOT NULL,
  `administrateur` tinyint(1) DEFAULT 0,
  `nom` varchar(40) NOT NULL,
  `prenom` varchar(40) NOT NULL,
  `pseudo` varchar(80) NOT NULL,
  `pwd` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Utilisateur`
--

INSERT INTO `Utilisateur` (`idUtilisateur`, `administrateur`, `nom`, `prenom`, `pseudo`, `pwd`) VALUES
(1, 1, 'Cros', 'Arnaud', 'Seyka', '528d1283adf7db598d26f8ad0505cfe634cdb3ca68b792cd47aa02fbe1af13c38131442adea3d190062b02e52dab2807bd8cda80e84de3ca4a72c049c18f4465'),
(2, 1, 'SOUFFLET', 'Amadéo', 'ACE25', '528d1283adf7db598d26f8ad0505cfe634cdb3ca68b792cd47aa02fbe1af13c38131442adea3d190062b02e52dab2807bd8cda80e84de3ca4a72c049c18f4465'),
(3, 1, 'PIDET', 'Antonin', 'Antonin81', '528d1283adf7db598d26f8ad0505cfe634cdb3ca68b792cd47aa02fbe1af13c38131442adea3d190062b02e52dab2807bd8cda80e84de3ca4a72c049c18f4465'),
(4, 0, 'EXEMPLE', 'Gerant', 'GerantLambda', 'a67394270779dbb4e13923dafd1e9c8b2250eabf1f12121adc962ea17790a3c9bd12a93d6fd21fbe14072f2ffa344d7ad8dcef2c119ad3dd8b481e8c68110090');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Commentaire`
--
ALTER TABLE `Commentaire`
  ADD PRIMARY KEY (`UtilisateurCom`,`LieuCom`,`dat`,`tps`),
  ADD KEY `fk_LieuCom` (`LieuCom`);

--
-- Indexes for table `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`idEvent`);

--
-- Indexes for table `Frequentation`
--
ALTER TABLE `Frequentation`
  ADD PRIMARY KEY (`dateFrequentation`);

--
-- Indexes for table `Liaison_QuestionLReponseL`
--
ALTER TABLE `Liaison_QuestionLReponseL`
  ADD PRIMARY KEY (`idQL`,`idRL`),
  ADD KEY `Liaison_QuestionLReponseL_ibfk_2` (`idRL`);

--
-- Indexes for table `Lieu`
--
ALTER TABLE `Lieu`
  ADD PRIMARY KEY (`idLieu`);

--
-- Indexes for table `QuestionL`
--
ALTER TABLE `QuestionL`
  ADD PRIMARY KEY (`idQuestionL`);

--
-- Indexes for table `ReponseL`
--
ALTER TABLE `ReponseL`
  ADD PRIMARY KEY (`idReponseL`);

--
-- Indexes for table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  ADD PRIMARY KEY (`idUtilisateur`),
  ADD UNIQUE KEY `pseudo` (`pseudo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Events`
--
ALTER TABLE `Events`
  MODIFY `idEvent` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Lieu`
--
ALTER TABLE `Lieu`
  MODIFY `idLieu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `QuestionL`
--
ALTER TABLE `QuestionL`
  MODIFY `idQuestionL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ReponseL`
--
ALTER TABLE `ReponseL`
  MODIFY `idReponseL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  MODIFY `idUtilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Commentaire`
--
ALTER TABLE `Commentaire`
  ADD CONSTRAINT `UtiCom` FOREIGN KEY (`UtilisateurCom`) REFERENCES `Utilisateur` (`idUtilisateur`),
  ADD CONSTRAINT `fk_LieuCom` FOREIGN KEY (`LieuCom`) REFERENCES `Lieu` (`idLieu`);

--
-- Constraints for table `Liaison_QuestionLReponseL`
--
ALTER TABLE `Liaison_QuestionLReponseL`
  ADD CONSTRAINT `Liaison_QuestionLReponseL_ibfk_1` FOREIGN KEY (`idQL`) REFERENCES `QuestionL` (`idQuestionL`),
  ADD CONSTRAINT `Liaison_QuestionLReponseL_ibfk_2` FOREIGN KEY (`idRL`) REFERENCES `ReponseL` (`idReponseL`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
