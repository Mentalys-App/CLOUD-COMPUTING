<div align="center">

# MENTALYS API
### Mental Health Analysis API Solution

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)

</div>

## Introduction

Mentalys API is a comprehensive solution designed for mental health analysis through multiple approaches. Built with TypeScript and Express.js, this API integrates machine learning models to process questionnaires, audio samples, and handwriting analysis, providing valuable mental health insights.

## Technology Stack

- **Backend**: Express.js with TypeScript
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **Cloud Services**: Google Cloud Platform
- **ML Models**: Python-based analysis tools

## API Endpoints

```
Development: http://localhost:3000/api
```

### Documentation
For complete API documentation, visit Swagger UI:
```
Development: http://localhost:3000/api-docs
```

### Core Features

| Feature | Description |
|---------|-------------|
| Mental Health Quiz | Comprehensive questionnaire analysis for mental health assessment |
| Voice Analysis | Advanced voice pattern analysis for mental state detection |
| Handwriting Analysis | Sophisticated handwriting analysis for personality insights |
| History Tracking | Detailed tracking of analysis history |
| User Management | Secure Firebase-based authentication and profile system |

### Main Endpoints

```typescript
// Authentication
POST /auth/register    // Create new account
POST /auth/login       // Get access token

// Analysis
POST /ml/quiz         // Submit mental health questionnaire
POST /ml/audio        // Upload voice recording
POST /ml/handwriting  // Submit handwriting sample
GET  /ml/history      // Get User History
GET  /ml/all-history  // Get All User History

// Profile Management
GET  /user/profile    // Get user information
PUT  /user/update     // Update profile
```

## Security

- Firebase Authentication
- Secure file uploads
- Data encryption

## Installation Guide

1. Clone repository
```bash
git clone https://github.com/Mentalys-App/CLOUD-COMPUTING.git
```

2. Install dependencies
```bash
npm install
```

3. Configure environment
```bash
cp .env.example .env
# Configure your Firebase and GCP credentials in .env
```

4. Start development server
```bash
npm run dev
```

## License

Copyright © 2024 Mentalys

This project is licensed under the MIT License.
