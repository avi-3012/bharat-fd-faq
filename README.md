# BHARAT FD 


### Folder Structure:
```faq-api/
├── src/
│   ├── config/
│   │   └── index.ts
│   ├── models/
│   │   └── faq.model.ts
│   ├── routes/
│   │   └── faq.route.ts
│   ├── services/
│   │   ├── cache.service.ts
│   │   ├── translation.service.ts
│   │   └── faq.service.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── admin/
│   │   └── admin.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

### Tech stack used:
Node, Express, Typescript, MongoDB

# Features

## FAQ Model
### Dynamic Language Support:
1. Supports any language code (e.g., es, fr, hi). You can include more languages by just simply adding the language code in environmental variables or in configuration file.
2. Base language: English (en) is required. You can change the base language through configuration file.
3. Additional languages is added to database automatically through translation API

### API
1. Supports language selection via ?lang= query parameter. If the provided language is not available in configuration file, the selected language fallbacks to base language.
2. Additional languages are automatically added with post method.
   
    Method | API | Usage
   --- | --- | --- 
   GET | /api/faqs | To retrieve FAQs in base language
   GET | /api/faqs?lang=<language_code> | To retrieve FAQs in provide language
   POST | /api/faqs | To add new faq item in database
   
POST /api/faqs request body example
```
{
  "question" : "What is BharatFD?",
  "answer"  :  "BharatFD is transforming how India invests in fixed deposits.
                Compare, select, and book the highest-return FDs from trusted
                banks, all from one seamless platform. Experience simplified,
                secure investing like never before."
}
```

### Caching
 Used REDIS to support caching

### Multilanguage Translation Support
 Used Google Translation API to provide this feature.

# Installation steps

  ### Prerequisites
  1. Node.js v16+ (LTS recommended)
  2. npm v8+
  3. Docker v20.10+
  4. Docker Compose v2.4+
  5. MongoDB Atlas account
  6. Google Cloud account (for translation)

  ### Steps
  ## 1. Clone repository
  ```
  git clone https://github.com/your-repository/faq-api.git
  cd faq-api
  ```
  ## 2. Install Dependencies
  ```npm install```
  ## 3. Environment Configuration

  Create ```.env``` file. Add following api keys and configuration.
  ```
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xzyq.mongodb.net/faq_db?retryWrites=true&w=majority

  REDIS_URL=redis://redis:6379


  CREDENTIALS=./credentials.json
  GOOGLE_PROJECT_ID=your-project-id


  PORT=3000
  BASE_LANGUAGE=en
  SUPPORTED_LANGUAGES=en,es,fr,de
  ```
  Note: Download your credential file from your Google Console and place it in your root folder.

  ## 4. MongoDB Atlas Setup

  1. Create a free cluster at MongoDB Atlas
  2. Add connection IP to network access
  3. Create database user with read/write privileges
  4. Get connection string from "Connect your application"

  ## 5. Google Cloud Setup (Translation)

  1. Enable Cloud Translation API
  2. Create service account with "Cloud Translation User" role
  3. Download JSON credentials and place in project root. (Rename to credentials.json if necessary)

  ## 6. Build & Run with Docker
  ```docker-compose up --build```

  ## 7. Verify
  Test API endpoints:
  
  ```curl http://localhost:3000/api/faqs```

  # Troubleshooting
  
  ## Common Issues:

  ### MongoDB Connection Failed
  
  - Verify Atlas IP whitelisting
    
  ### Missing Dependencies
  - Run npm install and rebuild containers
  ### Redis Connection Issues
  - Check Redis container logs: docker logs faq-api-redis-1
  ### Translation API Errors
  - Verify service account credentials
  - Ensure billing is enabled in Google Cloud

### Example APIs (Working)

* https://bharat-fd-faq.onrender.com/api/faqs
* https://bharat-fd-faq.onrender.com/api/faqs?lang=fr

Note: The backend is hosted on free render service which goes in sleep mode after 30 minutes. It will take about 1-2 minutes when making a request for the first time in a while.


