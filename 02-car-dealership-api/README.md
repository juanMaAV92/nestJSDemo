# Car dealership

api for a car dealer, allows the CRUD for the brands and the car entity

1. Clone the repository.

2. Run the command `yarn install`.

3. Start the application with `yarn start:dev`.

4. Execute the seed with the following command:

    ```http
    http://localhost:3001/api/seed
    ```

> Note: This assumes that you have Node.js and Yarn installed on your system.



## API Endpoints

- http://localhost:3001/cars/
- http://localhost:3001/brands/

## Entities

```typescript
export class Brand {
id: string;
name: string;
createdAt: number;
updatedAt?: number;
}

export interface Car {
id: string;
brand: string;
model: string;
}
```
