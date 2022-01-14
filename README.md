![License](https://img.shields.io/github/license/husomichael/NFT-Randomizer.svg?style=for-the-badge) ![Repo Size](https://img.shields.io/github/languages/code-size/husomichael/NFT-Randomizer.svg?style=for-the-badge) ![TOP_LANGUAGE](https://img.shields.io/github/languages/top/husomichael/NFT-Randomizer.svg?style=for-the-badge) ![FORKS](https://img.shields.io/github/forks/husomichael/NFT-Randomizer.svg?style=for-the-badge&social) ![Stars](https://img.shields.io/github/stars/husomichael/NFT-Randomizer.svg?style=for-the-badge)
    
# NFT Randomizer

## Table of Contents

- [Description](#description)
- [Screenshots](#screenshots)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contacts](#contacts)

## Description

With the rise of NFTs and blockchain technology, there are a vast amount of hurdles between a digital artist and getting their art onto a blockchain. NFT Randomizer aims to remove one of those hurdles by giving digital artists an easy way to randomize their photoshop layers / attributes, as well as give them full control on rarity values applied to each.

The user starts by registering an account and logging in. After logging in the user will be taken to the projects page where they can add / edit / delete projects. Once a project is selected from the project page the user is taken to the layers page for that project, where they can add / edit / delete layers for that project. Once the user is done adding their layers they can go to the attributes page where they can add / edit / delete attributes and rarities for each layer. There is a rarity counter for each layer to let the user know if they've hit the 100% goal for each.

The user then can go to the check inputs page where they can double check that everything looks correct and that all rarities are 100%. If rarities are not all at 100% the user will not be allowed to generate a CSV until they are. Once rarities are 100% they can enter how many NFTs they want to mint and hit "Generate".

Once the user hits "Generate" they will be taken to the Results page. Here their randomly generated CSV will be shown on the page, and a download button below will allow them to export the CSV.

Once the CSV is exported, the user can take the next steps in Photoshop to export images by CSV and watch their NFTs come to life!

## Screenshots

![Screenshot of Landing Page](/public/images/landingpage.png)
![Screenshot of Home](/public/images/home.png)
![Screenshot of Layers](/public/images/layers.png)
![Screenshot of Attributes](/public/images/attributes.png)
![Screenshot of Check Inputs](/public/images/checkinputs.png)
![Screenshot of Results](/public/images/results.png)

## Built With

<a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a><a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a><a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a><a href="https://nodejs.org/en/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" height="40px" width="40px" /></a><a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a><a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a><a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>

## Getting Started



### Prerequisites

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

Create a new database called `nft_randomizer` and create a `user` table:

```SQL
    CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `nft_randomizer` to the name of your new database name in `server/modules/pool.js`

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

### Installation

Clone the repository and npm install, then npm run server, then npm run client.

## Usage

On the landing page register as a new user, and then login.

Upon login you will be brought to the projects page. Here you can add new projects and manage current projects.

To proceed, select a project to work on. Selecting a project will take you to the layers page.

On the layers page you can add and manage layers for the selected project.
When all layers are entered, select "Next to Attributes". This will take you to the attributes page.

On the attributes page, you can add and manage attributes for each layer, and rarity values assigned to those attributes. The rarity values of all attributes per layer are tracked at the top next to the layer name. It is important to have all layers at 100% rarity. If the rarities totaled for a layer are not 100% it will be shown in red, when it is 100% it will be shown in green. Once finished putting in all attributes and rarities for each layer, select "Check Inputs". This will take you to the check inputs page.

On the check inputs page this is an overview of all information you've entered, one final check before selecting how many NFTs are going to be minted. The rarity values are shown here as well. At the bottom there's an input for how many NFTs to generate. If the rarities are not all at 100% the user will be given an error reminding them that all layers need to be exactly 100% rarity.

With all rarities at 100%, enter the amount to be minted and select "Generate". This will take you to the "Results" page. Here a table is appended with your randomized results, where every row is unique. Selecting the "Download CSV" button will export the results as a CSV that can be plugged in to photoshop.

## Acknowledgements

Thank you to Prime Digital Academy for equipping me with the skills create an app like this. Thank you to my instructor Matt Black for guiding me along the way to this point. Thank you to the Gemini Cohort for being supportive 

## Contacts

<a href="https://www.linkedin.com/in/michael-huso/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>  <a href="mailto:husomichael@gmail.com"><img src=https://raw.githubusercontent.com/johnturner4004/readme-generator/master/src/components/assets/images/email_me_button_icon_151852.svg /></a>