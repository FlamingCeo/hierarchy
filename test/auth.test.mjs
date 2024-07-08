import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { login } from "../controllers/auth.js";
import pkg from "../models/index.js";
const { user } = pkg;

describe("Auth Controller - Login", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        password: "123456",
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return 401 if email or password is missing", async () => {
    req.body.email = "";
    await login(req, res);
    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ msg: "You must provide email/password" })).to
      .be.true;
  });

  it("should return 404 if user does not exist", async () => {
    sinon.stub(user, "scope").returns({
      findOne: sinon.stub().resolves(null),
    });
    await login(req, res);
    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWith({
        msg: "Account with this email does not exist. Try again.",
        status: 404,
      })
    ).to.be.true;
  });

  it("should return 401 if password is incorrect", async () => {
    const hashedPassword = await bcrypt.hash("wrongpassword", 10);
    sinon.stub(user, "scope").returns({
      findOne: sinon.stub().resolves({
        password: hashedPassword,
      }),
    });
    sinon.stub(bcrypt, "compareSync").returns(false); // Ensure password comparison is correctly stubbed
    await login(req, res);
    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ msg: "Password is incorrect. Try again." })).to
      .be.true;
  });

  it("should return an accessToken if login is successful", async () => {
    const hashedPassword = await bcrypt.hash("123456", 10);
    sinon.stub(user, "scope").returns({
      findOne: sinon.stub().resolves({
        email: "test@example.com",
        password: hashedPassword,
      }),
    });
    sinon.stub(bcrypt, "compareSync").returns(true); // Ensure password comparison is correctly stubbed
    sinon.stub(jwt, "sign").returns("fakeToken");
    await login(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ accessToken: "fakeToken" })).to.be.true;
  });
});
