from flask import Flask
from flask_restful import Resource, Api, reqparse
import pymysql
import os
from flask import send_file
import werkzeug
from datetime import date


app = Flask(__name__)
api = Api(app)
path = "./images"


class LogIN(Resource):

    def get(self,user_name,user_paswd):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
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
        #print(Login)
        db.close()
        return Login

class utilisateur(Resource):
    def get(self):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql = "SELECT administrateur,nom,prenom,pseudo FROM Utilisateur"
        cursor.execute(sql)  
        results = cursor.fetchall()
        db.close()
        return results

class lieu(Resource):
    def get(self):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql = "SELECT * FROM Lieu"
        cursor.execute(sql)  
        results = cursor.fetchall()
        db.close()
        return results

class event(Resource):
    def get(self):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql = "SELECT idEvent,pathImgEvent,nomEvent,dateEventDeb,dateEventFin,descEvent,actif FROM Events"
        cursor.execute(sql)
        results = cursor.fetchall()
        db.close()
        return results   

class user(Resource):
    
    def get(self,user_name):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        #print(user_name)
        cursor = db.cursor()
        
        sql ="SELECT prenom,nom,pseudo,administrateur FROM Utilisateur WHERE pseudo="+"'"+str(user_name)+"'"
        cursor.execute(sql)
        results = cursor.fetchall()
        db.close()
        return results

class listQuestionsReponses(Resource):
    def get(self):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        
        sql ="SELECT QuestionL.idQuestionL,QuestionL.texteQuestionL,ReponseL.idReponseL,ReponseL.texteReponseL,ReponseL.bonneRep  FROM QuestionL INNER JOIN Liaison_QuestionLReponseL ON QuestionL.idQuestionL=Liaison_QuestionLReponseL.idQL INNER JOIN ReponseL ON Liaison_QuestionLReponseL.idRL=ReponseL.idReponseL "
        cursor.execute(sql)
        results = cursor.fetchall()
        db.close()
        return results

class userAdd(Resource):
    def post(self, user_admin,user_name,user_firstname,user_pseudo,user_password):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql = "INSERT INTO Utilisateur (administrateur,nom,prenom,pseudo,pwd) VALUES (%s, %s, %s, %s, %s)"
        data=(user_admin, user_name, user_firstname, user_pseudo, user_password)
        cursor.execute(sql, data)
        db.commit()
        #results = cursor.fetchall()
        db.close()
        return True

class placeAdd(Resource):
    def post(self, place_lat,place_lon,place_nom,place_car,place_desc):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql = "INSERT INTO Lieu (lat, longu, intitule, caracteristque, descriptionLieu, pathImgLieu) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        data=(place_lat,place_lon,place_nom,place_car,place_desc, "cath.jpg")
        cursor.execute(sql, data)
        db.commit()
        #results = cursor.fetchall()
        db.close()
        return True

class eventAdd(Resource):
    def post(self, event_nom,event_debut,event_fin, event_actif, event_desc, event_file):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql = "INSERT INTO Events (nomEvent, dateEventDeb, dateEventFin, actif, descEvent, pathImgEvent) VALUES (%s, %s, %s, %s, %s, %s)"
        data=(event_nom,event_debut,event_fin, event_actif, event_desc, event_file)
        cursor.execute(sql, data)
        db.commit()
        #results = cursor.fetchall()
        db.close()
        return True

class changerUser(Resource):
    def post(self, user_prenom, user_nom, user_admin):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql = "UPDATE Users SET prenom="+user_prenom+", nom="+user_nom+", administrateur="+user_admin+") WHERE prenom="+user_prenom+" and nom="+user_nom
        cursor.execute(sql)
        db.commit()
        #results = cursor.fetchall()
        db.close()
        return True
    
class changerEvent(Resource):
    def post(self, event_nom, event_debut,event_fin,event_actif,event_desc):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql = "UPDATE Events SET dateEventDeb="+event_debut+", dateEventFin="+event_fin+", actif="+event_actif+", descEvent="+event_desc+",) WHERE and nomEvent="+event_nom
        cursor.execute(sql)
        db.commit()
        #results = cursor.fetchall()
        db.close()
        return True
    
class changerPlace(Resource):
    def post(self, place_nom, place_desc):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql = "UPDATE Lieu SET descriptionLieu="+place_desc+",) WHERE and intitule="+place_nom
        cursor.execute(sql)
        db.commit()
        #results = cursor.fetchall()
        db.close()
        return True
    
class Graph(Resource):
    def get(self):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql ="SELECT * FROM Frequentation"
        cursor.execute(sql)
        results = cursor.fetchall()
        #print(results[0]["dateFrequentation"])
        for i in range(0,len(results)):
            results[i]["dateFrequentation"]=str(results[0]["dateFrequentation"])
        db.close()
        return results

class ProfileImg(Resource):
    def get(self, pathImg):
        try:
            imgAEnvoi = path + '/profile/' + pathImg
            return send_file(imgAEnvoi, mimetype='image/gif')
        except Exception:
            imgAEnvoi=path+'/profile/notfound.png'
            return send_file(imgAEnvoi, mimetype='image/gif')

class MapInfo(Resource):
    def get(self):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql ="SELECT * FROM Lieu"
        cursor.execute(sql)
        results = cursor.fetchall()
        db.close()
        return results
    


class addFrequentation(Resource):
    def get(self):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sqlNbVisite="SELECT dateFrequentation,nbVisites FROM Frequentation"
        cursor.execute(sqlNbVisite)
        results = cursor.fetchall()
        db.close()
        return results
        
    def post(self):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        actuel=(date.today()).strftime("%Y-%m-%d")
        cursor = db.cursor()
        try:
            sqlNbVisite="SELECT nbVisites FROM Frequentation WHERE dateFrequentation="+"'"+str(actuel)+"'"
            cursor.execute(sqlNbVisite)
            results = cursor.fetchall()
            data=(int(results[0]["nbVisites"])+1)
            sqlv2 = "DELETE FROM Frequentation WHERE dateFrequentation="+"'"+str(actuel)+"'"
            cursor.execute(sqlv2)
            db.commit()
            sqlv3 = "INSERT INTO Frequentation (dateFrequentation,nbVisites) VALUES (%s, %s)"
            datas=(actuel,data)
            cursor.execute(sqlv3, datas)
            db.commit()
        except:
            sqlv3 = "INSERT INTO Frequentation (dateFrequentation,nbVisites) VALUES (%s, %s)"
            datas=(actuel,1)
            cursor.execute(sqlv3, datas)
            db.commit()
        db.close()
        return actuel

class EvenementsActifs(Resource):
    def get(self):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        
        sql ="SELECT idEvent,dateEventDeb,dateEventFin,nomEvent,descEvent FROM Events WHERE actif=1 "
        cursor.execute(sql)
        results = cursor.fetchall()
        
        for i in range(0,len(results)):
            results[i]["dateEventDeb"]=str(results[i]["dateEventDeb"])
            results[i]["dateEventFin"]=str(results[i]["dateEventFin"])
            
        db.close()
        return results

class ImageListApiProfile(Resource):

    def post(self, img):

        parse = reqparse.RequestParser()
        parse.add_argument('file',
                            type=werkzeug.datastructures.FileStorage,
                            location="files")
        args = parse.parse_args()
        imgFile = args['file']
        imgFile.save(os.path.join("images/profile/" + img))
        
class ImageListApiLieu(Resource):

    def post(self, img, pathext):

        parse = reqparse.RequestParser()
        parse.add_argument('file',
                            type=werkzeug.datastructures.FileStorage,
                            location="files")
        args = parse.parse_args()
        imgFile = args['file']
        imgFile.save(os.path.join("images/places/" + img + pathext))

class ImageListApiEvent(Resource):

    def post(self, img, pathext):
        parse = reqparse.RequestParser()
        parse.add_argument('file',
                            type=werkzeug.datastructures.FileStorage,
                            location="files")
        args = parse.parse_args()
        imgFile = args['file']
        imgFile.save(os.path.join("images/events/" + img+ pathext))

class PlacesImg(Resource):
    def get(self, pathImg):
        try:
            imgAEnvoi = path + '/places/' + pathImg
            return send_file(imgAEnvoi, mimetype='image/gif')
        except Exception:
            imgAEnvoi=path+'/places/notfound.png'
            return send_file(imgAEnvoi, mimetype='image/gif')




class EventImg(Resource):

    def get(self, pathImg):

        try:
            imgAEnvoi = path + '/events/' + pathImg
            return send_file(imgAEnvoi, mimetype='image/gif')
        except Exception:
            imgAEnvoi=path+'/events/notfound.png'
            return send_file(imgAEnvoi, mimetype='image/gif')


class Frequentation(Resource):
    def get(self):
        db = pymysql.connect(host='mysql-champo.alwaysdata.net',
                             user='champo',
                             password='TechnoWeb4',
                             database='champo_bdd_technoweb',
                             cursorclass=pymysql.cursors.DictCursor)
        cursor = db.cursor()
        
        sql ="SELECT * FROM Frequentation"
        cursor.execute(sql)
        results = cursor.fetchall()
        
        return results



api.add_resource(LogIN, '/userLogin/<user_name>/<user_paswd>')
api.add_resource(utilisateur, '/utilisateur')
api.add_resource(lieu, '/lieu')
api.add_resource(event, '/event')
api.add_resource(user, '/user/<user_name>')
api.add_resource(Graph, '/graph')
api.add_resource(MapInfo, '/map')
api.add_resource(Frequentation, '/frequentation')
api.add_resource(listQuestionsReponses, '/listQuestionsReponses')
api.add_resource(ProfileImg, '/getImgProfile/<pathImg>')
api.add_resource(PlacesImg, '/getPlacesImg/<pathImg>')
api.add_resource(EventImg, '/getEventsImg/<pathImg>')
api.add_resource(EvenementsActifs, '/EvenementsActifs')
api.add_resource(addFrequentation, '/addFrequentation')
api.add_resource(userAdd, '/userAdd/<user_admin>/<user_name>/<user_firstname>/<user_pseudo>/<user_password>')
api.add_resource(placeAdd,'/placeAdd/<place_lat>/<place_lon>/<place_nom>/<place_car>/<place_desc>')
api.add_resource(eventAdd,'/eventAdd/<event_nom>/<event_debut>/<event_fin>/<event_actif>/<event_desc>/<event_file>')
api.add_resource(changerUser,'/changerUser/<user_prenom>/<user_nom>/<user_admin>')
api.add_resource(changerEvent,'/changerEvent/<event_nom>/<event_deb>/<event_fin>/<event_actif>/<event_desc>')
api.add_resource(changerPlace,'/changerPlace/<place_nom>/<place_desc>')
api.add_resource(ImageListApiProfile,'/ImageListApiProfile/<img>')
api.add_resource(ImageListApiLieu,'/ImageListApiLieu/<img>/<pathext>')
api.add_resource(ImageListApiEvent,'/ImageListApiEvent/<img>/<pathext>')
if __name__ == '__main__':
    app.run(debug=True)
    
    
