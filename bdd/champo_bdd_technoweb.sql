-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql-champo.alwaysdata.net
-- Generation Time: May 15, 2022 at 05:00 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `Avis`
--

CREATE TABLE `Avis` (
  `idAvis` int(11) NOT NULL,
  `Commentaire` varchar(80) DEFAULT '',
  `Lieu` int(11) NOT NULL,
  `Note` int(11) DEFAULT NULL
) ;

--
-- Dumping data for table `Avis`
--

INSERT INTO `Avis` (`idAvis`, `Commentaire`, `Lieu`, `Note`) VALUES
(1, 'Très belle cathédrale, je recommande vivement, ne pas passer à côté!', 1, 4),
(2, 'J\'aime bien!', 1, 5),
(3, 'Très beau musée', 2, NULL),
(4, 'Tres joli lieu!', 4, NULL),
(5, 'Tres beau lieu!', 4, 3),
(6, 'Quel bel endroit!', 4, 5),
(7, 'Tres cher!', 15, 1),
(8, 'Trop Cher!', 15, 2),
(9, 'Sympa!', 17, 4),
(10, 'On y mange bien.', 17, 5),
(11, 'Cool', 11, 4),
(12, 'Pas mal!', 11, 4),
(13, 'Pas mal du tout, je recommande!', 6, 5),
(14, 'Sympa!', 6, 4),
(15, 'Musee sympa!', 2, 4),
(16, 'Un hotel pour dormir', 10, NULL),
(17, 'Pas mal', 10, 4),
(18, 'Peut-être mieux mais pas si mal pour un week-end.', 10, 3),
(19, 'Ok', 10, NULL),
(20, 'Un peu éloigné, mais sympa!', 14, 3),
(21, 'Belle vue!', 14, 4),
(22, 'Magnifique musée, à voir absolument !', 2, 4),
(23, 'Tres belles oeuvres de l\'artiste.', 2, 5),
(24, 'Sympa!', 7, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Events`
--

CREATE TABLE `Events` (
  `idEvent` int(11) NOT NULL,
  `nomEvent` varchar(80) DEFAULT NULL,
  `dateEventDeb` varchar(80) NOT NULL,
  `dateEventFin` varchar(80) NOT NULL,
  `actif` tinyint(1) DEFAULT 0,
  `descEvent` varchar(5000) NOT NULL,
  `pathImgEvent` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Events`
--

INSERT INTO `Events` (`idEvent`, `nomEvent`, `dateEventDeb`, `dateEventFin`, `actif`, `descEvent`, `pathImgEvent`) VALUES
(1, 'Carnaval', '2023-02-21', '2023-02-25', 0, 'Le carnaval d\'Albi est l’occasion pour le public d’admirer le talent des carnavaliers de l’association du carnaval avec notamment dix chars animés, prétexte à des caricatures et autres clins d’oeil sur la vie et le temps qui passe.', 'carnaval.jpg'),
(2, 'Marché de Noël', '2021-12-03', '2022-01-02', 0, 'Marché de Noël sur la place du Vigan bordée de chalets qui vous proposeront de nombreuses idées cadeaux : décoration, bijoux, pièces uniques de créateurs, jeux, ...sans oublier les délices de Noël tels que churros, vin chaud, aligot et autres saveurs qui raviront un large public.', 'MarcheDeNoel.jpg'),
(3, 'Urban Festival dans le rétro', '2022-05-02', '2022-05-27', 1, 'Urban Festival s\'expose avec les 21 affiches retraçant toute l\'histoire d\'un festival dédié en direction de la jeunesse et les meilleures photos du photographe Sébastien Pioch. Ambiance musicale avec DJ Albert .', 'UrbanFestival.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Frequentation`
--

CREATE TABLE `Frequentation` (
  `idFrequentation` int(11) NOT NULL,
  `dateFrequentation` varchar(80) NOT NULL,
  `nbVisites` int(11) NOT NULL DEFAULT 0,
  `Scope` varchar(80) DEFAULT 'tout'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Frequentation`
--

INSERT INTO `Frequentation` (`idFrequentation`, `dateFrequentation`, `nbVisites`, `Scope`) VALUES
(1, '2020-07-10', 150, 'tout'),
(2, '2021-05-10', 45, 'tout'),
(3, '2022-05-07', 3, 'tout'),
(4, '2022-05-08', 69, 'tout'),
(5, '2022-05-09', 49, 'tout'),
(6, '2022-05-10', 11, 'tout'),
(7, '2022-05-13', 1, 'tout'),
(8, '2022-05-14', 96, 'tout'),
(9, '2022-05-15', 19, 'tout'),
(10, '2022-05-15', 11, 'Les Moulins Albigeois'),
(11, '2022-05-15', 8, 'Pont Vieux'),
(12, '2022-05-15', 3, 'Musee Toulouse-Lautrec'),
(14, '2022-05-15', 3, 'Cathedrale Sainte-Cecile'),
(16, '2022-05-15', 3, 'Berges du Tarn'),
(17, '2022-05-15', 2, 'Cloître Saint-Salvi'),
(18, '2022-05-15', 2, 'Place du Vigan'),
(19, '2022-05-15', 2, 'Statue de Lapérouse'),
(20, '2022-05-15', 4, 'Scène Nationale d Albi'),
(24, '2022-05-15', 1, 'Oki');

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
  `caracteristque` varchar(80) DEFAULT NULL,
  `descriptionLieu` varchar(5000) DEFAULT NULL,
  `pathImgLieu` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Lieu`
--

INSERT INTO `Lieu` (`idLieu`, `lat`, `longu`, `intitule`, `caracteristque`, `descriptionLieu`, `pathImgLieu`) VALUES
(1, 43.9285, 2.1426, 'Cathedrale Sainte-Cecile', 'Culturel', 'La plus grande cathédrale en brique du monde', 'cath.jpg'),
(2, 43.9287, 2.14277, 'Musee Toulouse-Lautrec', 'Culturel', 'Musée consacré à l\'artiste Albigeois Toulouse-Lautrec', 'Toulouse-Lautrec.jpg'),
(3, 43.93, 2.14322, 'Berges du Tarn', 'Culturel', 'Promenade au bord du Tarn', 'BergesTarn.jpg'),
(4, 43.9278, 2.1453, 'Cloître Saint-Salvi', 'Culturel', 'Magnifique cloître du XIème siècle ', 'CloitreSaintSalvi.jpg'),
(5, 43.9238, 2.14547, 'Bastet Café', 'Restaurant', 'Bar à chats avec terrasse', 'BastetCafe.jpg'),
(6, 43.9246, 2.14418, 'L\'Atelier Gourmand', 'Restaurant', 'Restaurant de tacos personnalisés', 'LAtelierGourmand.jpg'),
(7, 43.9328, 2.1461, 'Hôtel Mercure Albi Bastides', 'Hotel', 'Hôtel sympathique au bord du tarn', 'HotelMercureAlbi.jpg'),
(8, 43.9256, 2.15182, 'Hôtel les Pasteliers', 'Hotel', 'Joli hôtel avec le charme de l\'ancien grâce à ses briques d\'époque', 'HotelPasteliers.jpg'),
(9, 43.9314, 2.14457, 'Pont Vieux', 'Culturel', 'Pont ancien, tout en briques et surplombant le Tarn', 'PontVieux.jpg'),
(10, 43.9251, 2.14529, 'Hôtel Lapérouse des Cordeliers', 'Hotel', 'Bel hôtel en centre ville', 'HotelLaperouseCordeliers.jpg'),
(11, 43.925, 2.15155, 'Oki', 'Restaurant', 'Restaurant Japonais, ne pas hésiter à y déjeuner', 'Oki.jpg'),
(12, 43.9241, 2.14457, 'Scène Nationale d Albi', 'Culturel', 'Théâtre d\'Albi mettant en avant tout type d\'art', 'SceneNationaleDAlbi.jpg'),
(13, 43.9259, 2.14545, 'Statue de Lapérouse', 'Culturel', 'Statue du célèbre explorateur albigeois Jean-François de Lapérouse', 'StatueLaperouse.jpg'),
(14, 43.9327, 2.14582, 'Les Moulins Albigeois', 'Culturel', 'Majestueux moulins d\'Albi datant du XIIème siècle', 'MoulinsAlbigeois.jpg'),
(15, 43.9276, 2.1476, 'Le Pontié', 'Restaurant', 'Restaurant avec des plats typiques du Sud Ouest ', 'LePontie.jpg'),
(16, 43.9271, 2.14785, 'Place du Vigan', 'Culturel', 'Place du centre ville d\'Albi, construite au XIIème siècle, c\'est le coeur même de la ville', 'PlaceVigan.jpg'),
(17, 43.9273, 2.14746, 'La Mie Câline', 'Restaurant', 'Bonne boulangerie du vigan', 'MieCalineVigan.jpg');

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
(3, 'Quel président de la république a étudié à Albi jusqu\'au baccalauréat?'),
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
(1, 'Le coton', 0),
(2, 'Le lin', 0),
(3, 'L\'orge', 0),
(4, 'Le pastel', 1),
(5, 'Le charbon', 0),
(6, 'Le fer', 0),
(7, 'La houille', 1),
(8, 'Le cuivre', 0),
(9, 'Georges Pompidou', 1),
(10, 'Alain Poher', 0),
(11, 'François Mitterrand', 0),
(12, 'René Coty', 0),
(13, 'Jean-François Lapérouse', 1),
(14, 'Jacques Cartier', 0),
(15, 'Christophe Colomb', 0),
(16, 'Francisco Pizarro', 0),
(17, 'Les Albigiens', 0),
(18, 'Les Albigeais', 0),
(19, 'Les Albigeois', 1),
(20, 'Les Albiais', 0),
(21, 'La ville rouge', 1),
(22, 'La ville rose', 0),
(23, 'La ville jaune', 0),
(24, 'La ville ocre', 0),
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
(37, 'Ses fresques', 1),
(38, 'Son absence d\'orgue', 0),
(39, 'Son absence de cloche', 0),
(40, 'Elle est la plus haute d\'occitanie', 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Indexes for table `Avis`
--
ALTER TABLE `Avis`
  ADD PRIMARY KEY (`idAvis`),
  ADD KEY `Lieux_constraint` (`Lieu`);

--
-- Indexes for table `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`idEvent`);

--
-- Indexes for table `Frequentation`
--
ALTER TABLE `Frequentation`
  ADD PRIMARY KEY (`idFrequentation`);

--
-- Indexes for table `Liaison_QuestionLReponseL`
--
ALTER TABLE `Liaison_QuestionLReponseL`
  ADD PRIMARY KEY (`idQL`,`idRL`),
  ADD KEY `Liaison_QuestionLReponseL_constraint2` (`idRL`);

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
  ADD PRIMARY KEY (`idUtilisateur`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Avis`
--
ALTER TABLE `Avis`
  MODIFY `idAvis` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Frequentation`
--
ALTER TABLE `Frequentation`
  MODIFY `idFrequentation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Avis`
--
ALTER TABLE `Avis`
  ADD CONSTRAINT `Lieux_constraint` FOREIGN KEY (`Lieu`) REFERENCES `Lieu` (`idLieu`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Liaison_QuestionLReponseL`
--
ALTER TABLE `Liaison_QuestionLReponseL`
  ADD CONSTRAINT `Liaison_QuestionLReponseL_constraint1` FOREIGN KEY (`idQL`) REFERENCES `QuestionL` (`idQuestionL`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Liaison_QuestionLReponseL_constraint2` FOREIGN KEY (`idRL`) REFERENCES `ReponseL` (`idReponseL`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
