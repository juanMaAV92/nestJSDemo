
# Websocket

This is a front-end for the backend websockets component in [teslo-shop](https://github.com/juanMaAV92/nestJSDemo/tree/main/04-teslo-shop).

A JWT must be generated for each browser instance on the `localhost:3000/api/auth/login` endpoint with the following credentials:

```json
{
     "email" : "test3@google.com",
     "password" : "Abc123"
}

```

## Run

```sh
yarn install
yarn dev
```

```http
http://localhost:5173/
```