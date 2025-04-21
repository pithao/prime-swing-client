# Prime Solo Project - Starting Repo

This version uses React, Zustand, Express, Passport, and PostgreSQL. (A full list of dependencies can be found in `package.json`.)

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [Nodemon](https://nodemon.io)

## Create Database and User Table

Create a new database, then create a `user` table using the query found in `database.sql`.

* Note: `pool.js` is initially configured to connect to a database named `prime_app`. If you choose your own name, you'll need to modify `pool.js` so it knows how to connect to your database.

## Initial Setup Instructions

- In this repo's **root directory**, run `npm install`.
- Create an `.env` file in the **root directory**, then paste this line into the file:
    ```plaintext
      SERVER_SESSION_SECRET=superDuperSecret
    ```
- While you're in your new `.env` file, take the time to replace `superDuperSecret` with some a random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. 
    - Here's a site that can help you: [Password Generator Plus](https://passwordsgenerator.net).
    - If you skip this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you'll get a big warning message each time you start your server.
- Run `npm run server` to start the server.
- Run `npm run client` to start the client.
- Navigate to `localhost:5173`.
    - Verify that you are able to:
        - Register as a new user.
        - Log out.
        - Log back in.
        - Log out.
- Congrats! You now have a starting line for the cool thing you're about to build. 🙂

## Lay of the Land

This repository is intentionally quite minimal. It features the same directory structure that you know and love:

- `src/`: The React application and Zustand store.
- `public/`: Static assets for the client-side. (In this case, just a `favicon.ico` file.)
- `server/`: The Express server.

Much of the code code is descriptively commented. We recommend reading through the comments, getting a lay of the land, and becoming more comfortable with how it works before you start building on top of it.

For example, you're going to need to create new React Routes and Nav links as you build out your application. To do so, you'll first need a clear understanding of:

- How the `<Route>`s in `App.jsx` function.
- How the `<NavLink>`s in `Nav.jsx` function.


## Don't Forget to Update the Documentation

Don't forget to refactor this README file, as well as *the code comments in this project*, to read less like a starter repo and more like a finished project.

## Have Fun

Remember. This is only a two-week sprint! The goal is to:

- **Take the most clear and straightforward path to MVP!**
- Ensure your MVP functions as expected.
    - If you're going to build more stuff on top of it, you need to be able to trust it!

Once you've attained that, you'll have the opportunity to:

- Take stock of how much time is left, as well as how much bandwidth you have.
- Reason about which stretch goal(s) to attempt.

--------------------------------

(View Raw will give you the markdown that you can copy to your repos!)


![MIT LICENSE](https://img.shields.io/github/license/scottbromander/the_marketplace.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/scottbromander/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/scottbromander/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/scottbromander/the_marketplace.svg?style=social)

# PROJECT NAME

## Description

_Duration: 2 Week Sprint_

Directly above this is how long it took you to develop the project. Your project description goes here. What problem did you solve? How did you solve it? 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam at massa in faucibus. Etiam volutpat, risus non mollis convallis, velit nisi pulvinar mi, eu faucibus orci nisi eget nibh. Integer a velit pretium, volutpat arcu eleifend, fringilla elit. Cras erat sapien, convallis venenatis tellus vitae, feugiat dictum felis.

Suspendisse euismod volutpat aliquet. Maecenas vulputate mauris in pellentesque facilisis. Phasellus varius malesuada semper. Cras sollicitudin diam mollis maximus aliquam.

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com)

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here

## Installation

How do you get your application up and running? This is a step by step list for how another developer could get this project up and running. The good target audience in terms of knowledge, would be a fellow Primer from another cohort being able to spin up this project. Note that you do not need a paragraph here to intro Installation. It should be step-by-step.

If your application has secret keys (for example --  Twilio), make sure you tell them how to set that up, both in getting the key and then what to call it in the `.env` file.

1. Create a database named `your database name`,
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. xxx
2. xxx
3. xxx
4. xxx
5. xxx
6. xxx


## Built With

List technologies and frameworks here

## License
[MIT](https://choosealicense.com/licenses/mit/)

_Note, include this only if you have a license file. GitHub will generate one for you if you want!_

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)

## Support
If you have suggestions or issues, please email me at [youremail@whatever.com](www.google.com)
