# Express Starter Backend
This project aims to provide endpoints for the Express Starter Apps, facilitating various functionalities within the application.

## Installation
1. Clone this repository
2. Install dependencies
	```bash
	$ npm install
	```
3. Copy environment file and set the configuration 
	```bash
	$ cp env.example .env
	```
4. Set up local database with prisma
	```bash
	$ npx prisma migrate status
	$ npx prisma migrate deploy
	$ npx prisma generate
	$ npx prisma db seed
	```
5. Run service
	```bash
	$ npm run ts
	```
6. The service will run locally. Open your web browser and go to [http://localhost:3000/docs](http://localhost:3000/docs) to access the documentation.
