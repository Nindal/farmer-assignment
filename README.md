# farmer-assignment
In this project we have created apis to upload a csv files and to translate that data in the local lanuages such as
Hindi, Marathi, Telgu and Punjabi.


## Overview
This project make use of google translate apis to traslate farmers data. Jwt is used for authentication. 


## Getting Started


### Built With
Followingst tech stack is used
1. Nodejs
2. Express
3. Sequelize
4. Mysql
5. Google Translate apis

### Installation
1 .Clone the repo
 git clone https://github.com/Nindal/farmer-assignment.git

2. Install NPM packages
 npm install
 
3.create a dotenv file and mention google translate api credentials

### Executing program

1. Run npm start
2. Use the postman apis link : https://www.getpostman.com/collections/1451a053ec86566c6b45.
3. Create a user using sign up api
4. Sign up the user using same username and password and save the generated token for furthur use
5. Run the api upload file and pass a csv request body and a x-access-token generated above in headers
6. Run show farmers api and user desired language to translate in query params













