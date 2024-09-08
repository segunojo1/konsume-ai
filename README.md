# Konsume - AI-Powered Nutrition Recommendations

Welcome to the Konsume Github repository! Konsume is an AI-powered application designed to recommend meals based on users' health conditions and goals. This repository contains the source code, development history, and supporting materials for the Konsume platform.

## Structure
This repository is structured as follows:
- `backend/`: This directory contains the backend code of the Konsume platform, including the API endpoints, database models, and business logic implemented in C# using the ASP.NET framework.
- `frontend/`: Here, you will find the frontend code for the Konsume platform, implemented using JavaScript, TypeScript, Next.js, and Tailwind CSS. This directory also includes the HTML, CSS, and JavaScript files for the user interface.

## Purpose
The purpose of Konsume is to provide personalized meal recommendations based on users' health conditions and dietary goals. The app aims to help users make healthier food choices by:
- Offering custom meal plans tailored to individual health needs and goals.
- Scanning food items to evaluate their healthiness for the user.
- Providing a chatbot that understands user health data and gives real-time dietary advice.
- Collaborating with restaurants to offer meal options aligned with users' health objectives, such as weight loss or specific dietary requirements.

## How AI Models Power Konsume
Konsume leverages the integration of Gemini AI models to provide personalized nutrition advice and meal recommendations. Key features include:
- Personalized meal recommendations based on user health data and goals.
- A food scanner to evaluate the healthiness of foods.
- A chatbot that understands user health data and provides real-time dietary advice.
- A timetable feature that understands their health and what type of food they typically consume
- Blogs feature that allows users read o cr=ertain topics
- Collaboration with restaurants to offer meal options aligned with users' health goals.

# Commit Standards

## Branches

- **dev** -> pr this branch for everything `frontend` or `backend` related
- **main** -> **dont touch** this branch, this is what is running in production.

# Contributions

## Contribution Guidelines

1. Clone the repo `git clone https://github.com/segunojo1/konsume-ai.git`.
2. Open your terminal & set the origin branch: `git remote add origin https://github.com/segunojo1/konsume-ai.git`
3. Pull origin `git pull origin dev`
4. Create a new branch for the task you were assigned to, eg `TicketNumber/(Feat/Bug/Fix/Chore)/Ticket-title` : `git checkout -b ZA-001/Feat/Sign-Up-from`
5. After making changes, do `git add .`
6. Commit your changes with a descriptive commit message : `git commit -m "your commit message"`.
7. To make sure there are no conflicts, run `git pull origin dev`.
8. Push changes to your new branch, run `git push -u origin ZA-001/Feat/Sign-Up-from`.
9. Create a pull request to the `dev` branch not `main`.
10. Ensure to describe your pull request.
11. > If you've added code that should be tested, add some test examples.

# Merging

Under any circumstances should you merge a pull requests on a specific branch to the `dev` or `main` branch