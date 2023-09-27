# The Stocks Hub API

### Setup

```
npm install
npm start
```

### Tests

```
bundle exec rspec
```

### Endpoints

| URL / ENDPOINT  | VERB   | DESCRIPTION      |
| --------------- | ------ | ---------------- |
| /api/auth/login | POST   | Generate token   |
| /api/users      | POST   | Create user      |
| /api/users      | GET    | Return all users |
| /api/users/{id} | GET    | Return user      |
| /api/users/{id} | PUT    | Update user      |
| /api/users/{id} | DELETE | Destroy user     |
