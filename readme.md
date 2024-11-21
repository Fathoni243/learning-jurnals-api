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
5. If you want to fill the data with a dummy data, run this seeder
	```bash
	$ npm run prisma:seed:dummy
	```
6. Copy private.key.example and public.key.example in keys folder, then fill it with the RSA Key
	```bash
	$ cp private.key.example private.key
	$ cp public.key.example public.key
	```
7. Run service
	```bash
	$ npm run ts
	```
8. The service will run locally. Open your web browser and go to [http://localhost:3000/docs](http://localhost:3000/docs) to access the documentation.
