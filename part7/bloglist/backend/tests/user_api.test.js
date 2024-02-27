const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("User creation fails with proper statuscode and message if username already taken", async () => {
    const newUser = {
      username: "root",
      name: "Duperuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("Username must be unique");
  });

  test("User creation fails with proper statuscode if username is too short", async () => {
    const newUser = {
      username: "ro",
      name: "Duperuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Username and password must be at least 3 characters long",
    );
  });

  test("User creation fails with proper statuscode if password is too short", async () => {
    const newUser = {
      username: "roope",
      name: "Duperuser",
      password: "sa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Username and password must be at least 3 characters long",
    );
  });

  test("User creation fails with proper statuscode if username is missing", async () => {
    const newUser = {
      name: "Duperuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("Username and password are required");
  });

  test("User creation fails with proper statuscode if password is missing", async () => {
    const newUser = {
      username: "roope",
      name: "Duperuser",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("Username and password are required");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
