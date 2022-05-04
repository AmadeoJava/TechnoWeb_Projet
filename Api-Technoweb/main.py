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
        cursor.execute(sql)  # Il y a une erreur ici
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
        
        sql ="SELECT pathImgUtilisateur,prenom,nom,pseudo,administrateur FROM Utilisateur WHERE pseudo="+"'"+str(user_name)+"'"
        cursor.execute(sql)
        results = cursor.fetchall()
        return results

class userAdd(Resource):
    def get(self):
        cursor = db.cursor()
        sql = "INSERT INTO Utilisateur (pathImgUtilisateur,prenom,nom,pseudo,pwd,administrateur) VALUES (%s, %s, %s, %s, %s, %s)"
        data=('none.png', 'amadeo', 'soufflet', 'pentester', 'motDePasse', 1)
        cursor.execute(sql, data)
        #results = cursor.fetchall()
        return True

api.add_resource(LogIN, '/userLogin/<user_name>/<user_paswd>')
api.add_resource(utilisateur, '/utilisateur')
api.add_resource(lieu, '/lieux')
api.add_resource(event, '/event')
api.add_resource(user, '/user/<user_name>')
api.add_resource(userAdd, '/userAdd/<user_firstname>/<user_name>/<user_pseudo>/<user_path>/<user_admin>')

if __name__ == '__main__':
    app.run(debug=True)
    
    
