const expect = require("chai").expect;
const Client = require("../mindee/index");

describe("Test client initialization", () => {
  it("should create a client", () => {
    const client = new Client();
    expect(client).to.exist;
  });
});
