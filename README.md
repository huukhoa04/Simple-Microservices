# Simple Microservices Project

This project demonstrates a simple microservices architecture using .NET 9.0, Entity Framework Core, and RabbitMQ.

## Prerequisites

- .NET 9.0 SDK
- Docker
- Docker Compose
- Node.js

## Services

- **UserService**: Manages user data and publishes events to RabbitMQ.
- **OrderService**: Manages order data and subscribes to events from RabbitMQ.

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/Simple-Microservices.git
cd Simple-Microservices
```

### 2. Set Up RabbitMQ with Docker

Create a `docker-compose.yml` file in the root directory:

```yaml
version: '3.8'

services:
    rabbitmq:
        image: rabbitmq:3-management
        ports:
            - "5672:5672"
            - "15672:15672"
```

Run RabbitMQ:

```sh
docker-compose up -d
```

### 3. Set Up the Database

Navigate to the `UserService` directory:

```sh
cd UserService
```

Update the database connection string in `appsettings.json`:

```json
"ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=UserDB;Trusted_Connection=True;"
}
```

Run the following commands to scaffold the database:

```sh
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 4. Run the UserService

Navigate to the `UserService` directory and run the service:

```sh
cd UserService
dotnet run
```

The service will be available at `http://localhost:5000`.

### 5. Run the OrderService

Navigate to the `OrderService` directory and install dependencies:

```sh
cd OrderService
npm install
```

Run the service:

```sh
npm start
```

The service will be available at `http://localhost:3000`.

## Endpoints

- `GET /api/user`: Retrieve all users.
- `POST /api/user`: Create a new user.
- `GET /api/order`: Retrieve all orders.
- `POST /api/order`: Create a new order.

## Additional Information

- RabbitMQ Management UI: `http://localhost:15672` (default username/password: guest/guest)

## License

This project is licensed under the MIT License.