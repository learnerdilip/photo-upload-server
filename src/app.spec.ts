// app.test.ts
import request from "supertest"; // Supertest for making HTTP requests in tests
import app from "./server.ts"; // Import your Express app instance

describe("GET /", () => {
  it("responds with status 200 and a message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "This is the home page!" });
  });
});
