# Medieval Store API 🚀

Created a store of medieval items, such as those swords made to order for a specific person, in the format of an _API_, using _Typescript_ and _Sequelize_.

Developed the application's _Service_ and _Controllers_ layers in its code, using _JWT_ to authenticate some routes, in addition to tests to ensure their correct operation. The application will have _endpoints_ that will support operations for creating, reading and updating information.


<details>
  <summary><strong>🐳 Docker</strong></summary>

  - `git clone git@github.com:alinesresende/medieval-store-api.git`

  - `npm install`

> Run the `app-trybesmith` and `db` services with the command `docker-compose up -d --build`.

- These services will start up a container named `trybesmith_api` and another named `trybesmith_db`.

  > Run the `npm run db:reset` command (this command will work only after creating the requested types in the requirement) to create the database, the tables that will be used and populate them.

  > Use the command `docker exec -it trybesmith_api bash` to enter the container.
  > 
- To view the nodemon logs in your terminal use the following commands:

  > `docker ps`: to view the active containers and get the `CONTAINER ID`;

  > `docker logs -f <container_id>`: to view your server logs with nodemon;

</details>

</details>

<details>
  <summary><strong>🎲 Challenge Diagram </strong></summary>

  <img src="images/diagram-der.png" height="200px" />

</details>


# :game_die: Challenges


## 1 - Created an endpoint for the registration of products and tests that cover the functionalities of this endpoint

- The endpoint is accessible from the path (`/products`);
- The result returned to successfully register the product should be as shown below, with a _status http_ `201`:

```json
{
  "name": "Martelo de Thor",
  "price": "30 peças de ouro",
  "orderId": 4
}
```

---

## 2 - Created an endpoint for listing products and tests that cover the functionalities of this endpoint

- The endpoint is accessible from the path (`/products`);
- The result returned to successfully register the product should be as shown below, with a _status http_ `200`:

  ```json
  [
    {
      "id": 1,
      "name": "Pedra Filosofal",
      "price": "20 gold",
      "orderId": null
    },
    {
      "id": 2,
      "name": "Lança do Destino",
      "price": "100 diamond",
      "orderId": 1
    }
  ]
  ```

---

## 3 - Created an endpoint to list all requests and tests that cover the functionalities of this endpoint

- The endpoint is accessible from the path (`/orders`).
- The result returned to successfully register the product should be as shown below, with a _status http_ `200`:


  ```json
  [
    {
      "id": 1,
      "userId": 2,
      "productIds": [1, 2]
    },
    {
      "id": 2,
      "userId": 1,
      "productIds": [3, 4]
    }
  ]
  ```

---

## 4 - Created an endpoint for the login of users and tests that cover the functionalities of this endpoint

- The endpoint is accessible from the path  (`/login`).

- The route receives the `username` and `password` fields, and these fields are validated against the database.

- A `JWT` token is generated and returned if _login_ succeeds. Your _payload_ must contain _id_ and _username_.

-  The endpoint receives the following structure:

```json
{
  "username": "string",
  "password": "string"
}
```

<details>
 <summary> :test_tube: Middlewares:</summary>

> 👉  If the _login_ does not have the "username" field, the result returned should be an http_status_ `400`: 

  ```json
  { "message": "\"username\" and \"password\" are required" }
  ```

  - If the _login_ does not have the "password" field, the result returned should be a _status http_ `400`:

  ```json
  { "message": "\"username\" and \"password\" are required" }
  ```

  -If the _login_ has a username that does not exist in the database it will be considered invalid and the result returned should be a _status http_ `401`:

  ```json
  { "message": "Username or password invalid" }
  ```

  - If the login has a password that does not match the password saved in the database, it is considered invalid and the result returned should be a _status http_ `401`:

  ```json
  { "message": "Username or password invalid" }
  ```

  - If the login was successful, the result should be a _status http_ `200` and should return a _token_ in the format below (the _token_ does not need to be exactly like this):

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY4Njc1NDc1Nn0.jqAuJkcLp0RuvrOd4xKxtj_lm3Z3-73gQQ9IVmwE5gA"
  }
```

</details>

---

## 5 - Created product validations and tests that cover the functionalities of this endpoint

- Developed the validations related to the creation of the endpoint of challenge 1.

<details close>

  <summary> :test_tube: Middlewares: </summary>

  <br>

> 👉 For name

  - If the "name" field is not informed, the result returned should be a _status http_ `400`:

  ```json
  { "message": "\"name\" is required" }
  ```

  - If the field "name" is not of type `string`, the result returned should be a _status http_ `422`:

  ```json
  { "message": "\"name\" must be a string" }
  ```

  - If the "name" field is not a string longer than 2 characters, the result returned should be a _status http_ `422`:

  ```json
  { "message": "\"name\" length must be at least 3 characters long" }
  ```

> 👉 For price

  - If the "price" field is not informed, the result returned should be a _status http_ `400` and

  ```json
  { "message": "\"price\" is required" }
  ```

  - If the "price" field is not of type `string`, the result returned should be a _status http_ `422`:

  ```json
  { "message": "\"price\" must be a string" }
  ```

  - If the "price" field is not a string of more than 2 characters, the result returned should be a _status http_ `422`:

  ```json
  { "message": "\"price\" length must be at least 3 characters long" }
  ```

</details>

---


---
