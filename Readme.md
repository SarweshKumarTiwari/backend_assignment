
# Node.js, MongoDB, and Express App Installation Guide
---
## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js and npm (Node Package Manager)
- MongoDB (Make sure it's running)

## Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/SarweshKumarTiwari/backend_assignment.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd backend_assignment
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up environment variables**

   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables to the `.env` file:

     ```
     PORT=4000
     DB_CONNECTION_URL=mongodb://localhost:27017/your-database-name
     ACCESS_TOKEN=some_token_value
     REFRESH_TOKEN=some_refresh_token
     ACCESS_LIMIT=60
     REFRESH_LIMIT=3600
     ORIGIN=*

     ```

   Make sure to replace `your-database-name` with the name of your MongoDB database.
   Here ACCESS_LIMIT `60` is refered as 60 seconds and 3600 as 60 minutes

5. **Start the server**

   ```bash
   npm run dev
   ```

   This command will start the Node.js server.

## Accessing the Application

You can access the application by visiting `http://localhost:4000` in your web browser.

## API's Description
    Base url= `http://localhost:4000`
1. **Auth or user APIs**

- ***Register user***
```bash 
    POST http://localhost:4000/user/register
``` 
- This api registers user in database it takes three parameters `name`, `email` and `password`.
```bash
    {
        name:your_name,
        email:your_email,
        password:your_password
    }
```
- ***Login User***
```bash 
    POST http://localhost:4000/user/authorise
``` 
- This api loggs user in and it takes three parameters `email` and `password`.
```bash
    {
        email:your_email,
        password:your_password
    }
```

- ***Get access Token***
```bash 
    GET http://localhost:4000/user/access_token
``` 
- This api is used to get access token if token expires and it can not provide access token if refresh token is expired.

- ***Get user information***
```bash 
    GET http://localhost:4000/user/userInfo
``` 
- This api is used to get user informatin if user is logged in and its access token is valid.

- ***logout user***
```bash 
    GET http://localhost:4000/user/logout
``` 
- This api is used to logout user session and remove both access and refresh token.

2. **Books APIs**

- ***Insert Book***
```bash 
    POST http://localhost:4000/books/insertbook
``` 
- This api inserts book information in database if user is logged in and it takes three parameters `title`, `author` and `published`.
```bash
    {
        title:title_of_book,
        author:author_of_book,
        published:published_date
    }
```

- ***Update Books***
```bash 
    PUT http://localhost:4000/books/updatebook
``` 
- This api updates book information  if user is logged in and it takes minimum two  parameters `id` and update field like `title` or `author` or `published`.
```bash
    {
        id:book_id
        title:title_of_book, //may be or not
        author:author_of_book, //may be or not
        published:published_date //may be or not
    }
```
- ***Get filtered books***
```bash 
        GET http://localhost:4000/books/getbooks?author=author_name&&published=year
``` 
- This api is used to get books according to query parameters `author` and `published`.
```bash
    http://localhost:4000/books/getbooks?author=James_Clear&&published=2018
```

- ***delete books***
```bash 
        DELETE http://localhost:4000/books/deletebook/:id
``` 
- This api is used to delete books if user is logged in and it takes `:id` means book id in parameters.
```bash
    http://localhost:4000/books/deletebook/[id_of_book]
    
```
## Additional Notes

- Make sure MongoDB is running before starting the server.
- You may need to adjust the port number (`PORT`) and MongoDB URI (`MONGODB_URI`) in the `.env` file based on your configuration.
---
