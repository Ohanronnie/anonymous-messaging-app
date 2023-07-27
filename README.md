# API Documentation

The API provides the following functionalities:

## 1. Sign Up - `/register/signup`

### Method: POST

### Content-Type: application/json

**Description:** This endpoint allows users to sign up by providing a unique username and password in the request body.

**Request:**

```http
POST /register/signup
Content-Type: application/json

{
  "username": "example_user",
  "password": "secure_password"
}
```

**Response:**

- Status: 200 OK
- Body: `null` (If successful)

**Error Responses:**

- Status: 400 Bad Request
- Body: An error message indicating the cause of the failure.

## 2. Login - `/register/login`

### Method: POST

### Content-Type: application/json

**Description:** This endpoint enables users to log in using their registered username and password.

**Request:**

```http
POST /register/login
Content-Type: application/json

{
  "username": "example_user",
  "password": "secure_password"
}
```

**Response:**

- Status: 200 OK
- Body: A token representing the user's authenticated session.

**Error Responses:**

- Status: 401 Unauthorized
- Body: An error message indicating invalid credentials.

## 3. Send Message - `/message/send/:id`

### Method: POST

### Content-Type: application/json

**Description:** This endpoint allows a user to send a message to another user identified by `:id`.

**Request:**

```http
POST /message/send/:id
Content-Type: application/json

{
  "message": "Hello, how are you?"
}
```

**Response:**

- Status: 200 OK
- Body: `null` (If the message is sent successfully)

**Error Responses:**

- Status: 404 Not Found
- Body: An error message indicating that the specified user `id` does not exist.

## 4. Get Messages - `/message/messages`

### Method: GET

**Description:** This endpoint retrieves all the messages associated with the authenticated user's token.

**Request:**

```http
GET /message/messages
Authorization: Bearer <token>
```

**Response:**

- Status: 200 OK
- Body: An array of messages belonging to the user.

**Error Responses:**

- Status: 401 Unauthorized
- Body: An error message indicating that the provided token is invalid or expired.

---

## Environment Variables

Create a `.env` file in the `server/dist` directory with the following data:

```
MONGOURL=mongodb database url
SECRET_KEY=xxxxxxxxxx
```

## Running the Application

To run the application, follow these steps:

1. Open your terminal/command prompt.
2. Navigate to the root directory of the server.
3. Run the following commands in order:

```
npm install
tsc
cd dist
node index.js
```

This will install the necessary dependencies, compile the TypeScript code into JavaScript, and start the Node.js application. Make sure you have the required environment variables properly set in the `.env` file before running the application.

Please make sure to include the appropriate `Content-Type` and `Authorization` headers as specified in the documentation. Additionally, handle any possible error responses appropriately in your implementation. If you have any questions or need further assistance, feel free to reach out. Happy coding!
