# MindScribe - AI powered mental health journaling App

## Overview
This project is an AI-powered mental health journal and mood tracker that helps users log emotions, reflect on their moods, and receive AI-powered self-care suggestions. The goal is to provide insightful mental health tracking with personalized AI support while keeping user data private and secure.

## Features

- Journal Logging: Users can write about their day and emotions.
- Mood Tracking: text-based mood selection.
- AI-Powered Sentiment Analysis: Detects mood trends using DeepSeek AI.
- Self-Care Suggestions: AI suggests mindfulness activities, coping strategies, and relaxation tips.

## How It Works

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
