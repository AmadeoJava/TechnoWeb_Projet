
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
DROP TYPE IF EXISTS carac;


DROP DATABASE IF EXISTS BDD_Technoweb;

CREATE DATABASE BDD_Technoweb ENCODING 'UTF8';

CREATE TYPE carac AS ENUM ('Culturel', 'Restaurant');

CREATE TABLE Utilisateur 
(idUtilisateur int not null,
    administrateur boolean default false,
    nom varchar(40) not null,
    prenom varchar(40) not null,
    pseudo varchar(80) not null UNIQUE,
    pwd varchar(40) not null,
	constraint cle_utilisateur primary key(idUtilisateur)
);
/*ajouter l'image*/

DROP SEQUENCE IF EXISTS seqUtilisateur;
CREATE SEQUENCE seqUtilisateur MINVALUE 1;

CREATE TABLE Lieu 
(idLieu int not null,
    lat float not null,
    long float not null,
    intitulé varchar(80) not null,
    caractéristque carac,
    note float,
    descriptionLieu varchar(5000),
    pathImgLieu varchar(1000),
	constraint cle_lieu primary key(idLieu)
);

DROP SEQUENCE IF EXISTS seqLieu;
CREATE SEQUENCE seqLieu MINVALUE 1;

CREATE TABLE Commentaire 
(UtilisateurCom int not null constraint UtiCom references Utilisateur(idUtilisateur),
LieuCom int not null constraint fk_LieuCom references Lieu(idLieu),
texte varchar(5000)not null,
dat date not null,
tps time not null,
noteCom int,
constraint cle_com primary key (UtilisateurCom,LieuCom,dat,tps)
);

CREATE TABLE Events 
(idEvent int not null,
nomEvent varchar(80),
dateEvent date not null,
actif boolean default false,
descEvent varchar(5000) not null,
pathImgEvent varchar(1000),
constraint cle_event primary key (idEvent)
);

DROP SEQUENCE IF EXISTS seqEvents;
CREATE SEQUENCE seqEvents MINVALUE 1;

CREATE TABLE Liaison_LieuEvents
(idL int not null constraint fk_idL references Lieu(idLieu),
idE int not null constraint fk_idE references Events(idEvent),
constraint cle_Liaison_LieuEvents primary key (idL,idE)
);

CREATE TABLE Frequentation
(idFrequentation int not null,
dateFrequentation date,
nbVisites int not null default 0,
constraint cle_Frequentation primary key (idFrequentation)
);

DROP SEQUENCE IF EXISTS seqFrequentation;
CREATE SEQUENCE seqFrequentation MINVALUE 1;

CREATE TABLE Liaison_LieuEvents
(idL int not null constraint fk_idL references Lieu(idLieu),
idE int not null constraint fk_idE references Events(idEvent),
constraint cle_Liaison_LieuEvents primary key (idL,idE)
);

CREATE TABLE Liaison_LieuFrequentation
(idL int not null constraint fk_idL references Lieu(idLieu),
idF int not null constraint fk_idF references Frequentation(idFrequentation),
constraint cle_Liaison_LieuFrequentation primary key (idL,idF)
);

CREATE TABLE QuestionC
(idQuestionC int not null,
texteQuestionC varchar(1000),
pathImgQuestionC varchar(1000),
constraint cle_QuestionC primary key (idQuestionC)
);


DROP SEQUENCE IF EXISTS seqQuestionC;
CREATE SEQUENCE seqQuestionC MINVALUE 1;

CREATE TABLE ReponseC
(idReponseC int not null,
texteReponseC varchar(1000),
RepC carac,
constraint cle_ReponseC primary key (idReponseC)
);/*peut etre ajout image*/

DROP SEQUENCE IF EXISTS seqReponseC;
CREATE SEQUENCE seqReponseC MINVALUE 1;

CREATE TABLE Liaison_QuestionCReponseC
(idQC int not null constraint fk_idQC references QuestionC(idQuestionC),
idRC int not null constraint fk_idRC references ReponseC(idReponseC),
constraint cle_Liaison_QuestionCReponseC primary key (idQC,idRC)
);

CREATE TABLE QuestionL
(idQuestionL int not null,
texteQuestionL varchar(1000),
pathImgQuestionL varchar(1000),
constraint cle_QuestionL primary key (idQuestionL)
);


DROP SEQUENCE IF EXISTS seqQuestionL;
CREATE SEQUENCE seqQuestionL MINVALUE 1;

CREATE TABLE ReponseL
(idReponseL int not null,
texteReponseL varchar(1000),
RepL int not null constraint fk_RepL references Lieu(idLieu),
constraint cle_ReponseL primary key (idReponseL)
);/*peut etre ajout image*/

DROP SEQUENCE IF EXISTS seqReponseL;
CREATE SEQUENCE seqReponseL MINVALUE 1;

CREATE TABLE Liaison_QuestionLReponseL
(idQL int not null constraint fk_idQL references QuestionL(idQuestionL),
idRL int not null constraint fk_idRL references ReponseL(idReponseL),
constraint cle_Liaison_QuestionCReponseL primary key (idQL,idRL)
);



/*Premier jeu de test*/


INSERT INTO Utilisateur VALUES (NEXTVAL('seqUtilisateur'),true,'PIDET','Antonin','Moutmout','youpi');
INSERT INTO Utilisateur(idUtilisateur,nom,prenom,pseudo,pwd) VALUES (NEXTVAL('seqUtilisateur'),'CROS','Arnaud','Aboubou','hello');
INSERT INTO Utilisateur(idUtilisateur,nom,prenom,pseudo,pwd) VALUES (NEXTVAL('seqUtilisateur'),'SOUFFLET','Amadéo','ProjetPro','lesgensavecquijebossesontdesfeignasses');

INSERT INTO Lieu(idLieu,lat,long,intitulé,caractéristque,descriptionLieu,pathImgLieu) VALUES(NEXTVAL('seqLieu'),43.928470611572,2.1426000595093,'Cathédrale','Culturel','Cest de la brique','/site/resources/img/batiment/cathedrale.moutmout');

INSERT INTO Commentaire Values (1,1,'Mashallah',NOW(),NOW(),0);

INSERT INTO Events Values(NEXTVAL('seqEvents'),'Carnaval dAlbi',NOW(),true,'Globalement de la merde','/site/resources/img/event/carnaval.coucou');

INSERT INTO Liaison_LieuEvents Values(1,1);

INSERT INTO Frequentation Values(NEXTVAL('seqFrequentation'),NOW(),532);

INSERT INTO Liaison_LieuFrequentation Values(1,1);

INSERT INTO QuestionC VALUES(NEXTVAL('seqQuestionC'),'kétupréfèr?','/site/resources/img/questionC/q1.jpg');

INSERT INTO ReponseC Values(NEXTVAL('seqReponseC'),'La Kultur','Culturel');
INSERT INTO ReponseC Values(NEXTVAL('seqReponseC'),'La BOUFFE','Restaurant');

INSERT INTO Liaison_QuestionCReponseC Values (1,1);
INSERT INTO Liaison_QuestionCReponseC Values (1,2);

INSERT INTO QuestionL VALUES(NEXTVAL('seqQuestionL'),'kétupréfèr?','/site/resources/img/questionL/q1.jpg');

INSERT INTO ReponseL Values(NEXTVAL('seqReponseL'),'La cathédrale',1);
INSERT INTO ReponseL Values(NEXTVAL('seqReponseL'),'La cathédrale (grande originalité)',1);

INSERT INTO Liaison_QuestionLReponseL Values (1,1);
INSERT INTO Liaison_QuestionLReponseL Values (1,2);





select * from Utilisateur;
select * from Lieu;
select * from Events;
select * from Frequentation;
select * from Commentaire;
select * from Lieu inner join Commentaire on LieuCom=idLieu inner join Utilisateur on idUtilisateur=UtilisateurCom;
select * from Lieu inner join Liaison_LieuFrequentation on idL=idLieu inner join Frequentation on idF=idFrequentation;
select * from Lieu inner join Liaison_LieuEvents on idL=idLieu inner join Events on idE=idEvent;
select * from QuestionC;
select * from ReponseC;
select * from QuestionC inner join Liaison_QuestionCReponseC on idQuestionC=idQC inner join ReponseC on idReponseC=idRC;
select * from QuestionL;
select * from ReponseL;
select * from QuestionL inner join Liaison_QuestionLReponseL on idQuestionL=idQL inner join ReponseL on idReponseL=idRL;