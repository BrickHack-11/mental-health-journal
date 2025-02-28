# MindScribe - AI powered mental health journaling App

## Overview
This project is an AI-powered mental health journal and mood tracker that helps users log emotions, reflect on their moods, and receive AI-powered self-care suggestions. The goal is to provide insightful mental health tracking with personalized AI support while keeping user data private and secure.

## Features

- Journal Logging: Users can write about their day and emotions.
- Mood Tracking: text-based mood selection.
- AI-Powered Sentiment Analysis: Detects mood trends using DeepSeek AI.
- Self-Care Suggestions: AI suggests mindfulness activities, coping strategies, and relaxation tips.

## How It Works

<img width="1036" alt="image" src="https://github.com/user-attachments/assets/7fac891f-aa88-4bb5-b68b-3723a6734d90" />
- User logs their mood and what contributed to that.
- Journal entry is analyzed using DeepSeek AI.
- Sentiment analysis classifies emotions.
- AI provides self-care suggestions (e.g., meditation, exercise, journaling tips).

## Tech Stack
### Frontend (UI/UX)
- React – For interactive and dynamic UI.
- VanillaCSS – For styling.

## Backend (AI Processing & Storage)
- Flask (Python) – Backend API to process journal entries.
- PostgreSQL – Database for storing journal data.
- DeepSeek AI (Local LLM) – For self-care suggestions & mood analysis.

# Steps to Get Started
## Pre-requisites
1. Install Ollama and get it up and running.
2. Have PostgreSQL installed (preferrably pgAdmin 4 for UI)

## Steps to follow:
1. Pull the repository locally to your machine
2. Verify that you have pulled and installed deepseek-r1:1.5b model
3. Go to command line and run `ollama pull deepseek-r1:1.5b`
4. Then run `ollama run deepseek-r1:1.5b`
5. Keep this window up and running
6. Verify that this part is working, by running the function in `Prototype.ipynb`. If not make sure you install all the dependencies in `backend/`
7. Next open pgAdmin4 and run the create SQL file from `schema/create_schema.sql`
8. Update the URL for database connection in `backend/.env` file
9. now, run command `flask run` in the backend folder
10. keep this window open and then run `npm install` and `npm run start` in frontend folder
