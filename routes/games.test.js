import { test, expect, describe } from "@jest/globals";
import supertest from "supertest";
import app from "../app";

/**Initial basic test for status code & successful payload return */
describe("Get all entries from database successfully", () => {
  test("GET request- able to view all rows from database", async () => {
    const response = await supertest(app).get("/api/games");
    //console.log(response);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array),
    });
  });
});

/**Testing filters correctly returning during a GET request to database */
describe("Filter tests", () => {
  test("GET request (Genre)- able to view all rows from database", async () => {
    const response = await supertest(app).get("/api/games?genre=word%20game");
    console.log(response.body.payload[0].genre);
    expect(response.status).toEqual(200);
    expect(response.body.payload[0].genre).toStrictEqual(["word game"]);
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array),
    });
  });
  test("GET request (Genre & no. of returns accurate)- able to view all rows from database", async () => {
    const response = await supertest(app).get("/api/games?genre=strategy");
    console.log(response.body.payload[0].genre);
    expect(response.status).toEqual(200);
    expect(response.body.payload[0].genre).toStrictEqual(["strategy"]);
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array),
    });
  });
  test("GET request (Difficulty)- able to view all rows with specified difficulty", async () => {
    const response = await supertest(app).get("/api/games?difficulty=easy");
    console.log(response.body.payload[0].difficulty);
    expect(response.status).toEqual(200);
    expect(response.body.payload[0].difficulty).toStrictEqual("easy");
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array),
    });
  });
  test("GET request (Age)- able to view all rows with specified ages", async () => {
    const response = await supertest(app).get("/api/games?age=12");
    console.log(
      "Age payload console log HERE",
      response.body.payload[0].minimum_age
    );
    expect(response.status).toEqual(200);
    expect(response.body.payload[0].minimum_age).toBeLessThanOrEqual(12);
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array),
    });
  });
  test("GET request (duration)- able to view all rows with specified timings for games", async () => {
    const response = await supertest(app).get("/api/games?duration=120");
    console.log(
      "DURATION payload console log HERE",
      response.body.payload[0].duration
    );
    expect(response.status).toEqual(200);
    expect(response.body.payload[0].duration).toBeLessThanOrEqual(120);
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array),
    });
  });
  test("GET request (No. of players)- able to view all rows with number of players", async () => {
    const response = await supertest(app).get("/api/games?number_of_players=5");
    console.log(
      "PLAYERCOUNT payload console log HERE",
      response.body.payload[0].minimum_players
    );
    expect(response.status).toEqual(200);
    expect(response.body.payload[0].minimum_players).toBeLessThanOrEqual(5);
    expect(response.body.payload[0].maximum_players).toBeGreaterThanOrEqual(5);
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array),
    });
  });
});

/**TO FINISH- test for combined filter options- lines 94-101- needs payload object description to match */

// describe("GET- combined filter option testing", () => {
//   test('Test comb')
// const response = await supertest(app).get("/api/games?duration=120&difficulty=easy&age=10&number_of_playes=3&genre=word%20game");
// expect(response.status).toBe(200);
// expect(response.body.payload[0]).toContain({
//   genre:["word game"]
// })
// }

// test('GET /api/todos and get all', async function () {
//     const response = await supertest(app).get('/api/todos')
//     //check response body is object with a structure
//     expect(response.status).toEqual(200);
//     expect(response.body).toStrictEqual(
//         { success: true, payload: expect.any(Array),
//         })
//     })
