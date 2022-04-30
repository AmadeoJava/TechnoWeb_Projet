
USE champo_bdd_technoweb;

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

CREATE TABLE Utilisateur 
(idUtilisateur int not null AUTO_INCREMENT ,
    administrateur boolean default false,
    nom varchar(40) not null,
    prenom varchar(40) not null,
    pseudo varchar(80) not null UNIQUE,
    pwd varchar(40) not null,
    pathImgUtilisateur varchar(1000),
	constraint cle_utilisateur primary key(idUtilisateur)
);

CREATE TABLE Lieu 
(idLieu int not null AUTO_INCREMENT,
    lat float not null,
    longu float not null,
    intitule varchar(80) not null,
    caracteristque ENUM ('Culturel', 'Restaurant', 'Hotel'),
    note float,
    descriptionLieu varchar(5000),
    pathImgLieu varchar(1000),
	constraint cle_lieu primary key(idLieu)
);

CREATE TABLE Commentaire 
(UtilisateurCom int not null,
    FOREIGN KEY(UtilisateurCom) references Utilisateur(idUtilisateur),
    LieuCom int not null,
    FOREIGN KEY(LieuCom) references Lieu(idLieu),
    texte varchar(5000)not null,
    dat date not null,
    tps time not null,
    noteCom int,
    constraint cle_com primary key (UtilisateurCom,LieuCom,dat,tps)
);

CREATE TABLE Events 
(idEvent int not null AUTO_INCREMENT,
    nomEvent varchar(80),
    dateEvent date not null,
    actif boolean default false,
    descEvent varchar(5000) not null,
    pathImgEvent varchar(1000),
    constraint cle_event primary key (idEvent)
);

CREATE TABLE Liaison_LieuEvents
(idL int not null,
    FOREIGN KEY (idL) references Lieu(idLieu),
    idE int not null,
    FOREIGN KEY(idE) references Events(idEvent),
    constraint cle_Liaison_LieuEvents primary key (idL,idE)
);

CREATE TABLE Frequentation
(idFrequentation int not null AUTO_INCREMENT,
    dateFrequentation date,
    nbVisites int not null default 0,
    constraint cle_Frequentation primary key (idFrequentation)
);

CREATE TABLE Liaison_LieuFrequentation
(idL int not null,
    FOREIGN KEY(idL) references Lieu(idLieu),
    idF int not null,
    FOREIGN KEY(idF) references Frequentation(idFrequentation),
    constraint cle_Liaison_LieuFrequentation primary key (idL,idF)
);

CREATE TABLE QuestionC
(idQuestionC int not null AUTO_INCREMENT,
    texteQuestionC varchar(1000),
    pathImgQuestionC varchar(1000),
    constraint cle_QuestionC primary key (idQuestionC)
);

CREATE TABLE ReponseC
(idReponseC int not null AUTO_INCREMENT,
    texteReponseC varchar(1000),
    RepC ENUM ('Culturel', 'Restaurant', 'Hotel'),
    constraint cle_ReponseC primary key (idReponseC)
);/*peut etre ajout image*/

CREATE TABLE Liaison_QuestionCReponseC
(idQC int not null,
    FOREIGN KEY(idQC) references QuestionC(idQuestionC),
    idRC int not null,
    FOREIGN KEY(idRC) references ReponseC(idReponseC),
    constraint cle_Liaison_QuestionCReponseC primary key (idQC,idRC)
);

CREATE TABLE QuestionL
(idQuestionL int not null AUTO_INCREMENT,
    texteQuestionL varchar(1000),
    pathImgQuestionL varchar(1000),
    constraint cle_QuestionL primary key (idQuestionL)
);

CREATE TABLE ReponseL
(idReponseL int not null AUTO_INCREMENT,
    texteReponseL varchar(1000),
    RepL int not null,
    FOREIGN KEY(RepL) references Lieu(idLieu),
    constraint cle_ReponseL primary key (idReponseL)
);/*peut etre ajout image*/

CREATE TABLE Liaison_QuestionLReponseL
(idQL int not null,
    FOREIGN KEY (idQL) references QuestionL(idQuestionL),
    idRL int not null,
    FOREIGN KEY(idRL) references ReponseL(idReponseL),
    constraint cle_Liaison_QuestionCReponseL primary key (idQL,idRL)
);


