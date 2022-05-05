-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql-champo.alwaysdata.net
-- Generation Time: Apr 30, 2022 at 03:46 PM
-- Server version: 10.6.5-MariaDB
-- PHP Version: 7.4.19
DROP TABLE IF EXISTS Liaison_QuestionLReponseL;
DROP TABLE IF EXISTS ReponseL;
DROP TABLE IF EXISTS QuestionL;
DROP TABLE IF EXISTS Liaison_QuestionCReponseC;
DROP TABLE IF EXISTS ReponseC;
DROP TABLE IF EXISTS QuestionC;
DROP TABLE IF EXISTS Liaison_LieuEvents;
DROP TABLE IF EXISTS Liaison_LieuFrequentation;
DROP TABLE IF EXISTS Commentaire;
DROP TABLE IF EXISTS Utilisateur;
DROP TABLE IF EXISTS Lieu;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Frequentation;

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
(1, 1, 'Grande, bien placée! :)', '2022-05-10', '15:24:19', 5);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Events`
--

INSERT INTO `Events` (`idEvent`, `nomEvent`, `dateEventDeb`, `dateEventFin`, `actif`, `descEvent`, `pathImgEvent`) VALUES
(1, 'Carnaval', '2023-02-21', '2023-02-25', 0, 'Voici le carnaval d albi!', './images/events/carnaval.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Frequentation`
--

CREATE TABLE `Frequentation` (
  `idFrequentation` int(11) NOT NULL,
  `dateFrequentation` date DEFAULT NULL,
  `nbVisites` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Frequentation`
--

INSERT INTO `Frequentation` (`idFrequentation`, `dateFrequentation`, `nbVisites`) VALUES
(1, '2022-05-10', 45);

-- --------------------------------------------------------

--
-- Table structure for table `Liaison_LieuEvents`
--

CREATE TABLE `Liaison_LieuEvents` (
  `idL` int(11) NOT NULL,
  `idE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Liaison_LieuEvents`
--

INSERT INTO `Liaison_LieuEvents` (`idL`, `idE`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Liaison_LieuFrequentation`
--

CREATE TABLE `Liaison_LieuFrequentation` (
  `idL` int(11) NOT NULL,
  `idF` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Liaison_LieuFrequentation`
--

INSERT INTO `Liaison_LieuFrequentation` (`idL`, `idF`) VALUES
(1, 1);

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
(2, 8);

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
(1, 43.9285, 2.1426, 'Cathedrale Sainte-Cecile', 'Culturel', NULL, 'Une Cathedrale.', './images/places/cath.jpg'),
(2, 43.9287, 2.14277, 'Musee Toulouse-Lautrec', 'Culturel', 5, 'Musee ', './images/places/Toulouse-Lautrec.jpg');

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
(1, 'Quelle plante a permis à Albi de s enrichir?'),
(2, 'Quel minerai était extrait à Carmaux, à proximité d Albi?');

-- --------------------------------------------------------

--
-- Table structure for table `ReponseL`
--

CREATE TABLE `ReponseL` (
  `idReponseL` int(11) NOT NULL,
  `texteReponseL` varchar(1000) DEFAULT NULL,
  `pathImgReponseL` varchar(80) NOT NULL,
  `bonneRep` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ReponseL`
--

INSERT INTO `ReponseL` (`idReponseL`, `texteReponseL`, `pathImgReponseL`, `bonneRep`) VALUES
(1, 'Le Pastel', './images/places/pastel.jpg', 1),
(2, 'Le Lin', './images/places/lin.jpg', 0),
(3, 'Le Coton', './images/places/coton.jpg', 0),
(4, 'L Orge', './images/places/orge.jpg', 0),
(5, 'Le Charbon', './images/places/pastel.jpg', 0),
(6, 'Le Fer', './images/places/lin.jpg', 0),
(7, 'La Houille', './images/places/coton.jpg', 1),
(8, 'Le Cuivre', './images/places/orge.jpg', 0);

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
  `pwd` varchar(40) NOT NULL,
  `pathImgUtilisateur` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Utilisateur`
--

INSERT INTO `Utilisateur` (`idUtilisateur`, `administrateur`, `nom`, `prenom`, `pseudo`, `pwd`, `pathImgUtilisateur`) VALUES
(1, 1, 'Cros', 'Arnaud', 'Seyka', 'TechnoWeb4', './images/faces/notfound.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Commentaire`
--
ALTER TABLE `Commentaire`
  ADD PRIMARY KEY (`UtilisateurCom`,`LieuCom`,`dat`,`tps`),
  ADD KEY `LieuCom` (`LieuCom`);

--
-- Indexes for table `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`idEvent`),
  ADD CONSTRAINT `checkDate` CHECK (( `dateEventFin` > `dateEventDeb` ));

--
-- Indexes for table `Frequentation`
--
ALTER TABLE `Frequentation`
  ADD PRIMARY KEY (`idFrequentation`);

--
-- Indexes for table `Liaison_LieuEvents`
--
ALTER TABLE `Liaison_LieuEvents`
  ADD PRIMARY KEY (`idL`,`idE`),
  ADD KEY `idE` (`idE`);

--
-- Indexes for table `Liaison_LieuFrequentation`
--
ALTER TABLE `Liaison_LieuFrequentation`
  ADD PRIMARY KEY (`idL`,`idF`),
  ADD KEY `idF` (`idF`);

--
-- Indexes for table `Liaison_QuestionLReponseL`
--
ALTER TABLE `Liaison_QuestionLReponseL`
  ADD PRIMARY KEY (`idQL`,`idRL`),
  ADD KEY `idRL` (`idRL`);

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
  MODIFY `idEvent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Frequentation`
--
ALTER TABLE `Frequentation`
  MODIFY `idFrequentation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Lieu`
--
ALTER TABLE `Lieu`
  MODIFY `idLieu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `QuestionL`
--
ALTER TABLE `QuestionL`
  MODIFY `idQuestionL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ReponseL`
--
ALTER TABLE `ReponseL`
  MODIFY `idReponseL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  MODIFY `idUtilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Commentaire`
--
ALTER TABLE `Commentaire`
  ADD CONSTRAINT `Commentaire_ibfk_1` FOREIGN KEY (`UtilisateurCom`) REFERENCES `Utilisateur` (`idUtilisateur`),
  ADD CONSTRAINT `Commentaire_ibfk_2` FOREIGN KEY (`LieuCom`) REFERENCES `Lieu` (`idLieu`);

--
-- Constraints for table `Liaison_LieuEvents`
--
ALTER TABLE `Liaison_LieuEvents`
  ADD CONSTRAINT `Liaison_LieuEvents_ibfk_1` FOREIGN KEY (`idL`) REFERENCES `Lieu` (`idLieu`),
  ADD CONSTRAINT `Liaison_LieuEvents_ibfk_2` FOREIGN KEY (`idE`) REFERENCES `Events` (`idEvent`);

--
-- Constraints for table `Liaison_LieuFrequentation`
--
ALTER TABLE `Liaison_LieuFrequentation`
  ADD CONSTRAINT `Liaison_LieuFrequentation_ibfk_1` FOREIGN KEY (`idL`) REFERENCES `Lieu` (`idLieu`),
  ADD CONSTRAINT `Liaison_LieuFrequentation_ibfk_2` FOREIGN KEY (`idF`) REFERENCES `Frequentation` (`idFrequentation`);

--
-- Constraints for table `Liaison_QuestionLReponseL`
--
ALTER TABLE `Liaison_QuestionLReponseL`
  ADD CONSTRAINT `Liaison_QuestionLReponseL_ibfk_1` FOREIGN KEY (`idQL`) REFERENCES `QuestionL` (`idQuestionL`),
  ADD CONSTRAINT `Liaison_QuestionLReponseL_ibfk_2` FOREIGN KEY (`idRL`) REFERENCES `ReponseL` (`idReponseL`);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
