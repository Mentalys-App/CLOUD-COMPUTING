
# Mentalys App Backend Architecture

## Overview
Mentalys App is a comprehensive mental health application built on Google Cloud Platform (GCP). This repository contains the backend architecture that powers the application, utilizing various GCP services for robust, scalable, and secure operations.

![Arsitektur Backend Aplikasi drawio](https://github.com/user-attachments/assets/a3be2024-6099-4eb9-831e-917cdb76c3fb)


## Architecture Components

### Frontend Integration
- **UI/UX Interface**: Mobile application interface
- **Local Storage**: Room Database for offline data persistence

### Authentication
- **Firebase Authentication**: Handles user authentication and authorization
- Secure user session management
- OAuth integration

### Backend Services

#### Kubernetes Clusters
- Deployed on GCP Kubernetes Engine
- Manages containerized services
- Ensures high availability and scalability
- Handles load balancing

#### API Services
1. **Node.js API (Cloud Run)**
   - RESTful API endpoints
   - Business logic implementation
   - User data management
   - Service orchestration

2. **ML Service (Flask API)**
   - Machine Learning model integration
   - TensorFlow implementation
   - Real-time predictions
   - Model serving endpoints

### Data Storage
1. **ML Data Storage**
   - Google Cloud Storage
   - Stores machine learning models
   - Training data management
   - Model artifacts

2. **User Data Storage**
   - Firebase Firestore
   - NoSQL database
   - Real-time data synchronization
   - Scalable data storage

## Technology Stack
- **Backend Framework**: Node.js, Flask
- **Container Orchestration**: Kubernetes
- **Cloud Services**: Google Cloud Platform
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **ML Framework**: TensorFlow

## Setup Instructions

### Prerequisites
1. Google Cloud Platform account
2. Firebase project setup
3. Node.js and Python installed
4. Google Cloud CLI
5. kubectl installed

### Configuration Steps
1. Clone the repository
```bash
git clone https://github.com/Mentalys-App/backend
```

2. Install Dependency
- NPM
```bash
npm install
```
- Yarn
```bash
yarn install
```

3. Set up GCP credentials
```bash
Coming Soon!
```

4. Enable required GCP APIs
- Cloud Run API
- Kubernetes Engine API
- Cloud Storage API
- Firebase API

5. Deploy to GCP
```bash
Coming Soon!
```

## Environment Variables
Create a `.env` file with the following variables:
```bash
Coming Soon!
```

### Entity Relationship Diagram
![schema](https://github.com/user-attachments/assets/7ba5b652-17ec-4c8b-9a61-6272d70b3227)


## Security Considerations
- All API endpoints are secured with Firebase Authentication
- Data encryption in transit and at rest
- Regular security audits
- Role-based access control (RBAC)

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact
Project Link: [https://github.com/Mentalys-App/backend](https://github.com/Mentalys-App/backend)
