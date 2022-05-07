from flask import Flask
from flask_restful import Resource, Api, reqparse
import pymysql
import os
from flask import send_file
import werkzeug

db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
app = Flask(__name__)
api = Api(app)
path = "./images"


class LogIN(Resource):

    def get(self,user_name,user_paswd):
        cursor = db.cursor()
        sql = "SELECT * FROM Utilisateur"
        cursor.execute(sql)
        results = cursor.fetchall()
        Login=False
        user_name=str(user_name)
        user_paswd=str(user_paswd)
        
        for i in range(0,len(results)):
            if (results[i]["pseudo"]==user_name and results[i]["pwd"]==user_paswd):
                Login=True
        print(Login)
        return Login

class utilisateur(Resource):
    def get(self):
        cursor = db.cursor()
        sql = "SELECT idUtilisateur,pathImgUtilisateur,prenom,nom,pseudo,administrateur FROM Utilisateur"
        cursor.execute(sql)  
        results = cursor.fetchall()

        return results

class lieu(Resource):
    def get(self):
        cursor = db.cursor()
        sql = "SELECT idLieu,pathImgLieu,lat,longi,caracteristque,descriptionLieu FROM Lieu"
        cursor.execute(sql)
        results = cursor.fetchall()
        return results

class event(Resource):
    def get(self):
        cursor = db.cursor()
        sql = "SELECT idEvent,pathImgEvent,nomEvent,dateEventDeb,dateEventFin,descEvent,actif FROM Events"
        cursor.execute(sql)
        results = cursor.fetchall()
        return results   

class user(Resource):
    def get(self,user_name):
        print(user_name)
        cursor = db.cursor()
        
        sql ="SELECT prenom,nom,pseudo,administrateur FROM Utilisateur WHERE pseudo="+"'"+str(user_name)+"'"
        cursor.execute(sql)
        results = cursor.fetchall()
        return results

class listQuestionsReponses(Resource):
    def get(self):
        cursor = db.cursor()
        
        sql ="SELECT QuestionL.idQuestionL,QuestionL.texteQuestionL,ReponseL.idReponseL,ReponseL.texteReponseL,ReponseL.bonneRep  FROM QuestionL INNER JOIN Liaison_QuestionLReponseL ON QuestionL.idQuestionL=Liaison_QuestionLReponseL.idQL INNER JOIN ReponseL ON Liaison_QuestionLReponseL.idRL=ReponseL.idReponseL "
        cursor.execute(sql)
        results = cursor.fetchall()
        return results

class userAdd(Resource):
    def post(self, user_admin,user_name,user_firstname,user_pseudo,user_password):
        cursor = db.cursor()
        sql = "INSERT INTO Utilisateur (administrateur,nom,prenom,pseudo,pwd) VALUES (%s, %s, %s, %s, %s)"
        data=(user_admin, user_name, user_firstname, user_pseudo, user_password)
        cursor.execute(sql, data)
        db.commit()
        #results = cursor.fetchall()
        return True

class placeAdd(Resource):
    def post(self, place_lat,place_lon,place_nom,place_car,place_desc):
        cursor = db.cursor()
        sql = "INSERT INTO Lieu (lat, longu, intitule, caracteristque, descriptionLieu, pathImgLieu) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        data=(place_lat,place_lon,place_nom,place_car,place_desc, "cath.jpg")
        cursor.execute(sql, data)
        db.commit()
        #results = cursor.fetchall()
        return True

class eventAdd(Resource):
    def post(self, event_nom,event_debut,event_fin, event_desc, event_file):
        cursor = db.cursor()
        sql = "INSERT INTO Events (nomEvent, dateEventDeb, dateEventFin, actif, descEvent, pathImgEvent) VALUES (%s, %s, %s, %s, %s, %s)"
        data=(event_nom,event_debut,event_fin, 1, event_desc, event_file)
        cursor.execute(sql, data)
        db.commit()
        #results = cursor.fetchall()
        return True

class Graph(Resource):
    def get(self):
        cursor = db.cursor()
        sql ="SELECT * FROM Frequentation"
        cursor.execute(sql)
        results = cursor.fetchall()
        print(results[0]["dateFrequentation"])
        for i in range(0,len(results)):
            results[i]["dateFrequentation"]=str(results[0]["dateFrequentation"])
        
        return results

class ProfileImg(Resource):
    def get(self, pathImg):
        try:
            try:
                imgAEnvoi = path + '/profile/' + pathImg +'.jpg'
                return send_file(imgAEnvoi, mimetype='image/gif')
            except:
                imgAEnvoi = path + '/profile/' + pathImg +'.png'
                return send_file(imgAEnvoi, mimetype='image/gif')
        except Exception:
            imgAEnvoi=path+'/profile/notfound.png'
            return send_file(imgAEnvoi, mimetype='image/gif')

class MapInfo(Resource):
    def get(self):
      
        cursor = db.cursor()
        sql ="SELECT * FROM Lieu"
        cursor.execute(sql)
        results = cursor.fetchall()

        return results
    

api.add_resource(LogIN, '/userLogin/<user_name>/<user_paswd>')
api.add_resource(utilisateur, '/utilisateur')
api.add_resource(lieu, '/lieux')
api.add_resource(event, '/event')
api.add_resource(user, '/user/<user_name>')
api.add_resource(Graph, '/graph')
api.add_resource(MapInfo, '/map')
api.add_resource(listQuestionsReponses, '/listQuestionsReponses')
api.add_resource(ProfileImg, '/getImgProfile/<pathImg>')
api.add_resource(userAdd, '/userAdd/<user_admin>/<user_name>/<user_firstname>/<user_pseudo>/<user_password>')
api.add_resource(placeAdd,'/placeAdd/<place_lat>/<place_lon>/<place_nom>/<place_car>/<place_desc>')
api.add_resource(eventAdd,'/eventAdd/<event_nom>/<event_debut>/<event_fin>/<event_desc>/<event_file>');
if __name__ == '__main__':
    app.run(debug=True)
    
    
