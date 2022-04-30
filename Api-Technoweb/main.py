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

    def get(self,user_name):
        cursor = db.cursor()
        sql = "SELECT * FROM Utilisateur"
        cursor.execute(sql)
        results = cursor.fetchall()
        print(results)
        return results

api.add_resource(LogIN, '/userLogin/<user_name>')
if __name__ == '__main__':
    app.run(debug=True)
