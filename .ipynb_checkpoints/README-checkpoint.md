# mental-health-journal

## Overview
This project is an AI-powered mental health journal and mood tracker that helps users log emotions, reflect on their moods, and receive AI-powered self-care suggestions. The goal is to provide insightful mental health tracking with personalized AI support while keeping user data private and secure.

## Features

- Journal Logging: Users can write about their day and emotions.
- Mood Tracking: Emoji-based or text-based mood selection.
- AI-Powered Sentiment Analysis: Detects mood trends using DeepSeek AI.
- Self-Care Suggestions: AI suggests mindfulness activities, coping strategies, and relaxation tips.

## How It Works

- User logs their mood using emojis and text.

- Journal entry is analyzed using DeepSeek AI.

- Sentiment analysis classifies emotions.

- AI provides self-care suggestions (e.g., meditation, exercise, journaling tips).

## Tech Stack

### Frontend (UI/UX)

- React / Next.js – For interactive and dynamic UI.

- Tailwind CSS – For styling.


## Backend (AI Processing & Storage)

- Flask (Python) / Express (Node.js) – Backend API to process journal entries.

- PostgreSQL / SQLite – Database for storing journal data.

- DeepSeek AI (Local LLM) – For self-care suggestions & mood analysis.