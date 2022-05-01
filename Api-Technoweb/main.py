from flask import Flask
from flask_restful import Resource, Api, reqparse
import pymysql

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
        
        for i in range(0,len(results)):
            if (results[i]["pseudo"]==user_name and results[i]["pwd"]==user_paswd):
                Login=True
        print(Login)
        return Login

class user(Resource):
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

api.add_resource(LogIN, '/userLogin/<user_name>/<user_paswd>')
api.add_resource(user, '/utilisateur')
api.add_resource(lieu, '/lieux')
api.add_resource(event, '/event')

if __name__ == '__main__':
    app.run(debug=True)
    
    
