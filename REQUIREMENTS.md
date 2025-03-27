# QA Portal Frontend Requirements

## Overview
Frontend for QA services portal with integration to Azure DevOps.

## Tech Stack
- React
- React Router for navigation
- Axios for API calls

## Features

### 1. Side Navigation
- Navigation bar with all available services

### 2. Create Tasks on Azure DevOps User Stories
#### UI Components Required:
- Form with inputs for:
  - Azure DevOps organization name
  - Project name
  - User story ID
  - Task selection (design, review, execute, retest)
  - Estimates for each selected task
- Success/Error message display
- Loading state handling

#### API Integration
- POST requests to backend API
- Handle responses:
  - Success: Display confirmation message
  - Error: Display error details

### 3. Settings Management
- Form for managing Azure DevOps credentials
- Environment configuration

### 4. Project Information
- Display team members
- Display iteration paths

### 5. Story Estimation
- Form for entering story details
- Display estimated hours for tasks
