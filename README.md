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

## 5. Update Name - `/profile/update/name`

### Method: POST

### Content-Type: application/json

**Description:** This endpoint allows users to update their username. To perform this action, a valid authorization token must be provided in the request headers, and the user needs to provide their current username, new name, and password in the request body.

**Request:**

```http
POST /profile/update/name
Content-Type: application/json
Authorization: Bearer <token>

{
  "oldname": "current_username",
  "newname": "new_name",
  "password": "current_password"
}
```

**Response:**

- Status: 200 OK
- Body: `null or success` (If the username is updated successfully)

**Error Responses:**

- Status: 401 Unauthorized
- Body: An error message indicating that the provided token is invalid or expired or the error details.

## 6. Update Profile Picture - `/profile/update/image`

### Method: POST

### Content-Type: multipart/form-data

**Description:** This endpoint allows users to update their profile picture. The request must have a valid authorization token in the headers and the image file as a form data object in the body.

**Request:**

```http
POST /profile/update/image
Content-Type: multipart/form-data
Authorization: Bearer <token>

<form data object with image key>
```

OR

```http
POST /profile/update/image
Content-Type: multipart/form-data
Authorization: Bearer <token>

<image binary data>
```

**Response:**

- Status: 200 OK
- Body: The URL of the updated profile picture.

**Error Responses:**

- Status: 401 Unauthorized
- Body: An error message indicating that the provided token is invalid or expired.

---

## Please make sure to use the appropriate method and content type when making requests to these additional endpoints. Ensure that you include the required authorization token in the headers for authorized access to protected routes. If you have any questions or need further assistance, feel free to reach out. Happy coding!

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
