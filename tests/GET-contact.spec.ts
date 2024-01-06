describe("GET contact", () => {
  it("should return 400 on invalid get", async () => {
    const res = await request(app).get("/contact/invalid-id");
    expect(res.statusCode).toEqual(400);
  });

  it("should return 200 on valid get", async () => {
    const getRes = await request(app).get(`/contact/${postRes.body._id}`);

    expect(getRes.body).toEqual(newContact);
    expect(getRes.statusCode).toEqual(200);
  });

  it("should return all contacts", async () => {
    const res = await request(app).get("/contact");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should return contact with id", async () => {
    const getRes = await request(app).get(`/contact/${postRes.body._id}`);

    expect(getRes.statusCode).toEqual(200);
    expect(getRes.body).toEqual(newContact);
  });
});
