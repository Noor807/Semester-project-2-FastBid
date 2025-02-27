# Semester-project-2-FastBid










### Goal
To Show the skills learned over the past three semesters and create an auction website.



### Brief
An auction website where users can add items to be bid on and bid on items other users have put up for auction.

When a new user joins the website, they are given 1000 credits to use on the site. They can get credits by selling items and use credit by buying items. Non-registered users can search through the listings, but only registered users can make bids on listings.



### Requirements
All API functionality is managed by an existing application. This project only covers the front-end application for the API.



### API
The API I used for this project can be found under Auction Endpoints in the Noroff API documentation.



### User stories

The client has specified the following requirements in the form of User Stories:

- [ ] A user with a stud.noroff.no email may register
- [ ] A registered user may login
- [ ] A registered user may logout
- [ ] A registered user may update their avatar
- [ ] A registered user may view their total credit
- [ ] A registered user may create a Listing with a title, deadline date, media gallery and description
- [ ] A registered user may add a Bid to another user’s Listing
- [ ] A registered user may view Bids made on a Listing
- [ ] An unregistered user may search through Listings
- [ ] Technical restrictions

      

### Technical restrictions:

- [ ] An approved CSS Framework.
- [ ] Project hosted on an approved Static Host.
- [ ] An approved Design Application.
- [ ] An approved Planning Application




 ### Required links:

- [ ] A Gantt chart for project timing
- [ ] A design prototype
- [ ] A style guide
- [ ] A kanban project board
- [ ] A repository link
- [ ] A hosted application demo link


Approved resources
This list covers libraries and services that have been vetted by the company and approved for use.


#### CSS frameworks

Tailwind (version >3.0.0)


#### Hosting services

GitHub Pages
Netlify

#### Design applications

Figma

#### Planning applications

GitHub Projects

-------------


### 1. Initialize Node.js Project
First, initialize a new Node.js project to create the package.json file:

bash

                 npm init -y

This command will create a basic package.json with default values. You can edit this file later to add dependencies and scripts.

### 2. Install Dependencies for Vite and Tailwind CSS
Need to install Vite for development and Tailwind CSS for styling.

### Install Vite (Development Server & Bundler):

bash

                npm install vite --save-dev

This installs Vite as a development dependency.

### Install Tailwind CSS, PostCSS, and Autoprefixer:

bash


               npm install -D tailwindcss postcss autoprefixer

This installs Tailwind CSS along with PostCSS (for processing CSS) and Autoprefixer (for adding browser prefixes).

### 3. Create tailwind.config.js File
To customize Tailwind's settings, generate the configuration file:

bash

                    npx tailwindcss init

This will create a tailwind.config.js file where you can configure your Tailwind theme, colors, breakpoints, etc.


### 4. Start Project
Once everything is set up, run the development server:

bash

                         npm run dev

This will start Vite’s development server, and your project should be accessible at (http://localhost:5100/)

