const mongoose = require("mongoose");
const request = require("supertest");
const User = require("../models/user.model");
const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

beforeEach(async () => {
  // Clear the test database before each test
  await User.deleteMany({});
});

/* Dropping the database and closing connection after each test. */
afterEach(async () => {
  // await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

/* Testing the API endpoints. */
describe("GET /api/users", () => {
  let testUser;

  beforeEach(async () => {
    // Create a test user before each test
    testUser = new User({
      name: "Test User",
      username: "testuser1",
      email: "test@example.com",
      password: "password123",
    });
    await testUser.save();
  });

  it("should return all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.users.length).toBe(1);
  });
});

describe("GET /api/users/:id", () => {
  it("should return a user", async () => {
    const res = await request(app).get("/api/users/6331abc9e9ececcc2d449e44");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("User 1");
  });
});

describe("POST /api/users", () => {
  it("should create a user", async () => {
    const res = await request(app).post("/api/users").send({
      name: "User 2",
      email: "jhondoe@email.com",
      username: "jdoe82",
      password: "abc123",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("User 2");
  });
});

describe("PUT /api/users/:id", () => {
  it("should update a user", async () => {
    const res = await request(app)
      .patch("/api/users/6331abc9e9ececcc2d449e44")
      .send({
        name: "User 4",
        username: "jsmart91",
        email: "jamessmart@email.com",
        password: "abc123",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(104);
  });
});

describe("DELETE /api/users/:id", () => {
  it("should delete a user", async () => {
    const res = await request(app).delete(
      "/api/users/6331abc9e9ececcc2d449e44"
    );
    expect(res.statusCode).toBe(200);
  });
});
