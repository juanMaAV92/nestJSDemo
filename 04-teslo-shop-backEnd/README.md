# Teslo API

1. Clone the repository.

2. Run the command `yarn install`.

3. Clone the `.env.template` file and rename it to `.env`.

4. Change the environment variables in the `.env` file.

5. Start the database:

    ```sh
    docker-compose up -d
    ```

6. Start the server: `yarn start:dev`

7. Execute the seed with the following command:

    ```http
    http://localhost:3000/api/seed
    ```

8. Swagger documentation:

    ```http
    http://localhost:3000/api
    ```
