# SE101-POS-PROJECT

This POS is a portable, PWA-enabled React App with Express as a backend. Below are the necessary steps to successfully run the app.

## HOW TO SETUP BACKEND

1. Setup POSTGRESQL database and get the neccessary credentials.
2. Create `.env` file by duplicating the `.env.example` and fill up the credentials.
3. Open **cmd** or **powershell**, cd to **be-express** and run `npm start`.

## HOW TO SETUP FRONTEND

> These steps are done to start the React developer server. If you do not wish to change the codes of this application, proceed to the next part. 3. Open **cmd** or **powershell**, cd to **fe-next** and run `npm start`.

## HOW TO BUILD FRONTEND

> These steps are taken to build the frontend if you have made changes and create a production build. If you only want to run the build, skip to the next part.

1. Open your desired terminal and run `npm install -g serve`
2. CD to **fe-react** and type `npm run build`

## HOW TO SERVE FRONTEND

1. Open your desired terminal and CD to **fe-react**
2. Run **serve build**

## SERVING FRONTEND TO NON LOCALHOST (SERVE TO MOBILE DEVICES, ETC...)

### SOLUTION 1

> PWA applications dont work on non-secure hosts. First you must whitelist the website by enabling the flag **Insecure origins treated as secure** and by putting the origin URL into the textbox.

### SOLUTION 2

> You can serve the application naturally and run **ngrok https 3000** to get HTTPS link. You now can install PWA application to non localhost devices.
