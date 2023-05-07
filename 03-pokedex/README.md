# Pokedex with NestJS

This is a Pokedex that contains information about the first 650 Pokemon in the global Pokedex. The data is populated in a MongoDB database using an external [API](https://pokeapi.co/).

## Running the app in dev Mode

1. Clone the repository
2. Run:
    ```sh
    yarn install
    ```

3. Ensure Nest CLI is installed
    ```sh
    npm i -g @nestjs/cli
    ```

4. Start the database: `mongodb://localhost:27017/nest-pokemon`
    ```sh
    docker-compose up -d
    ```
  

5. Clone the __.env.template__ file and rename the copy to __.env__

6. Fill in the environment variables defined in the __.env.__

7. Run the application in dev:
    ```sh
    yarn start:dev
    ```
8. Rebuild the database with the seed
    ```http
    http://localhost:3000/api/v3/seed
    ```

## Production Build
1. Create the ```.env.prod``` file
2. Fill in the environment variables for production
3. Build the image
    ```sh
    docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
    ```


## Entities

```typescript
export class Pokemon extends Document{

    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;
}
```
