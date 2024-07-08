import { expect } from "chai";
import sinon from "sinon";
import { getAllEmployee } from "../controllers/employees.js"; // Adjust the path as necessary
import pkg from "../models/index.js";
const { employees } = pkg;
import { jwtChecker } from "../middleware/jsonwebtoken.js"; // Adjust the path as necessary
import jwt from "jsonwebtoken";

describe("Employee Controller - getAllEmployee", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {
        id: 1,
      },
      headers: {
        authorization: "Bearer fakeToken",
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
  it("should return 404 if no id is provided in params", async () => {
    req.params.id = undefined;

    await getAllEmployee(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ error: "No id was provided" })).to.be.true;
  });
  it("should return the employee hierarchy for a given root employee id", async () => {
    const hierarchy = {
      id: 1,
      name: "John Doe",
      positionId: "CEO",
      positionName: "Chief Executive Officer",
      children: [
        {
          id: 2,
          name: "Jane Smith",
          positionId: "CTO",
          positionName: "Chief Technology Officer",
          children: [
            {
              id: 3,
              name: "Jim Brown",
              positionId: "Dev",
              positionName: "Developer",
              children: [],
            },
          ],
        },
      ],
    };

    sinon.stub(employees, "findByPk").resolves(hierarchy);
    sinon
      .stub(jwt, "verify")
      .yields(null, { id: 1, email: "test@example.com" });

    await jwtChecker(req, res, next);
    await getAllEmployee(req, res);

    expect(next.calledOnce).to.be.true;
    expect(res.json.calledWith(hierarchy)).to.be.true;
  });

  it("should return 401 if no token is provided", async () => {
    req.headers.authorization = "";
    await jwtChecker(req, res, next);
    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ error: "Missing token" })).to.be.true;
  });

  it("should return 403 if the token is invalid", async () => {
    sinon.stub(jwt, "verify").yields(new Error("Invalid token"), null);

    await jwtChecker(req, res, next);

    expect(res.status.calledWith(403)).to.be.true;
    expect(res.json.calledWith({ error: "Invalid token" })).to.be.true;
  });

  it("should return 500 if there is an error fetching the hierarchy", async () => {
    const error = new Error("Database error");
    sinon.stub(employees, "findByPk").throws(error);
    sinon
      .stub(jwt, "verify")
      .yields(null, { id: 1, email: "test@example.com" });

    await jwtChecker(req, res, next);
    await getAllEmployee(req, res);

    expect(next.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: "Error fetching hierarchy" })).to.be
      .true;
  });
});