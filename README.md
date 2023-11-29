# ChefTalk Backend

The backend of the ChefTalk application provides the necessary server-side functionality to support the frontend in managing user and recipe information, and calling various APIs such as Google's Text-To-Speech and OpenAI's GPT.

## Tech Used

- Back end: [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com)
- Database: [PostgreSQL](https://www.postgresql.org)
- ORM: [Sequelize](https://sequelize.org)
- Authentication: [Auth0](https://auth0.com)
- APIs: [OpenAI ChatGPT](https://platform.openai.com/docs/api-reference), [Google Text-to-Speech](https://cloud.google.com/text-to-speech#), [Unsplash](https://unsplash.com/documentation)
- Third party react hook: [React Speech Recognition](https://www.npmjs.com/package/react-speech-recognition)

## Setup

**Pre-requisite: To be used with [ChefTalk Frontend](https://github.com/calebcianc/capstone-frontend) in order to run the full application locally.**

To set up the ChefTalk Backend and make it work seamlessly with the frontend, it is required to run the following steps for the application to work:

1. Clone repo to local

2. Configure `.env` file, make sure to get your own API keys stated below and insert it into your `.env` file

```
// Config
NODE_ENV = development
PORT = 3000

// PostgresSQL Credentials
DB_USERNAME = <DB_USERNAME>
DB_NAME = <DB_USERNAME>
DB_HOST = 127.0.0.1
DB_DIALECT = postgres

// API Credentials
OPENAI_API_KEY = <OPENAI_API_KEY>
UNSPLASH_API_KEY = <UNSPLASH_API_KEY>
```

4. Replace "cheftalk-401015-2df6c845f5cf.json" with own json file that contains the Text-To-Speech credentials

```
// text2speech.js

.
.
.

const client = new textToSpeech.TextToSpeechClient({
    keyFilename: "./<Text-To-Speech Credential>.json",
    });

.
.
.
```

```
//<Text-To-Speech Credential>.json

{
  "type": "service_account",
  "project_id": <project_id>",
  "private_key_id": <private_key_id>,
  "private_key": <private_key>,
  "client_email": <client_email>,
  "client_id": <client_id>,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": <client_x509_cert_url>,
  "universe_domain": "googleapis.com"
}

```

5.  Install all dependencies required in this repo, and run locally

```
npm i
npm start
```

## Contributors

- [Caleb Castro](https://github.com/calebcianc)
- [Chloe Li](https://github.com/khloeli)
- [Ho Ming Quan](https://github.com/kenho95)
