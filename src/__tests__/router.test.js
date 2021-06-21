import {router} from "../routes/appointmentsRouter"

test("GET /appointments 200 OK", async () => {
    const response = await request(app).get("/atividadesConcluidas");
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
  });