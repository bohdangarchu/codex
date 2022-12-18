from pymongo import MongoClient
from bson.objectid import ObjectId
import subprocess
import sys

def get_database():
   CONNECTION_STRING = "mongodb://172.17.0.1:27017"
   client = MongoClient(CONNECTION_STRING)
   return client['code-exec-db']

def write_code_to_file(code):
   file = open('./src/main.js', 'x')
   file.write(code)
   file.close()


if __name__ == '__main__':
   if len(sys.argv) < 2:
      print('no codeId was given')
      exit()
   db = get_database()
   id = str(sys.argv[1])
   subm = db['submissions'].find_one({'_id':ObjectId(id)})
   # print(f"running code: {subm['code']}")
   # print("---output---")
   write_code_to_file(subm['code'])
   cmd = ['node', './src/main.js']
   timeout = 10
   try:
      res = subprocess.run(
         cmd, 
         stdout=subprocess.PIPE, 
         stderr=subprocess.PIPE,
         timeout=timeout
      )
      print(res.stdout.decode('utf-8'))
   except subprocess.TimeoutExpired:
      print(f'Timeout for {cmd} ({timeout}s)')


    