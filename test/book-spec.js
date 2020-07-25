const chai = require("chai");
const config = require("config");
const wagner = require("wagner-core");
var Sequelize = require("sequelize");
let testData = require("./book-manager-test-data.json");
const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.user,
  config.mysql.password,
  config.mysql.options
);
require("../db/models/book")(sequelize, Sequelize);
wagner.factory("sequelize", function () {
  return sequelize;
});
const assert = chai.assert;
const BookManager = require("../manager/book-manager");
let bookManager = new BookManager(wagner);
const sinon = require("sinon");

describe("book-manager -> createBook a book function", () => {
  let stub;
  before(() => {
    stub = sinon.stub(wagner, "get").returns({
      create: () => {
        return testData.createBookSuccess;
      },
    });
  });
  it("success  response function", async function () {
    const response = await bookManager.createBook(testData.createBook);
    assert.exists(response, "response should exist");
    assert.equal(response.Id, 4, "created book Id");
    assert.exists(response.msg, "book has been created successfully");
    assert.equal(response.status_code, 201);
  });
  after(() => {
    sinon.restore();
  });
});
describe("book-manager ->  createBook a book function", () => {
  let stub;
  before(() => {
    stub = sinon.stub(wagner, "get").returns({
      create: () => {
        return;
      },
    });
  });
  it("db error function", async function () {
    const response = await bookManager.createBook(testData.createBook);
    assert.exists(response, "response should exist");
    assert.exists(
      response.error,
      "Unable to create book currently. Please try again."
    );
    assert.equal(response.status_code, 400);
  });
  after(() => {
    sinon.restore();
  });
});

describe("book-manager ->  getBook a book function", () => {
  let stub;
  before(() => {
    stub = sinon.stub(wagner, "get").returns({
      findAll: () => {
        return testData.getAllBooks;
      },
    });
  });
  it("db error function", async function () {
    const response = await bookManager.getBooks({ libraryId: 1 });
    assert.exists(response, "response should exist");
    assert.isArray(response.data, "data should be an array");
    assert.equal(response.data.length, 1, "data length should be 1");
    assert.equal(
      response.data[0].Id,
      testData.getAllBooks[0].Id,
      "data length should be 1"
    );
    assert.equal(
      response.data[0].author,
      testData.getAllBooks[0].author,
      "author should match"
    );
    assert.equal(
      response.data[0].title,
      testData.getAllBooks[0].title,
      "title should match"
    );
    assert.equal(
      response.data[0].ISBN,
      testData.getAllBooks[0].ISBN,
      "ISBN should match"
    );
    assert.equal(
      response.data[0].releaseDate,
      testData.getAllBooks[0].releaseDate,
      "releaseDate should match"
    );
    assert.equal(response.status_code, 200);
  });
  after(() => {
    sinon.restore();
  });
});
describe("book-manager ->  getBooks a book function", () => {
    let stub;
    before(() => {
      stub = sinon.stub(wagner, "get").returns({
        findAll: () => {},
      });
    });
    it("db error function", async function () {
      const response = await bookManager.getBooks({});
      assert.exists(response, "response should exist");
      assert.exists(
        response.error,
        "Unable to get book currently. Please try again."
      );
      assert.equal(response.status_code, 400);
    });
    it("db exception function", async function () {
      const response = await bookManager.getBooks();
      assert.exists(response, "response should exist");
      assert.exists(
        response.error,
        "Unable to get book currently. Please try again."
      );
      assert.equal(response.status_code, 400);
    });
    after(() => {
      sinon.restore();
    });
  });
  

describe("book-manager ->  getBook a book function", () => {
    let stub;
    before(() => {
      stub = sinon.stub(wagner, "get").returns({
        findOne: () => {
          return testData.getAllBooks[0];
        },
      });
    });
    it("db error function", async function () {
      const response = await bookManager.getBook({ libraryId: 1 });
      assert.exists(response, "response should exist");
      assert.isObject(response.data, "data should be an object");
      assert.equal(
        response.data.Id,
        testData.getAllBooks[0].Id,
        "data length should be 1"
      );
      assert.equal(
        response.data.author,
        testData.getAllBooks[0].author,
        "author should match"
      );
      assert.equal(
        response.data.title,
        testData.getAllBooks[0].title,
        "title should match"
      );
      assert.equal(
        response.data.ISBN,
        testData.getAllBooks[0].ISBN,
        "ISBN should match"
      );
      assert.equal(
        response.data.releaseDate,
        testData.getAllBooks[0].releaseDate,
        "releaseDate should match"
      );
      assert.equal(response.status_code, 200);
    });
    after(() => {
      sinon.restore();
    });
    
  });

describe("book-manager ->  deleteBook a book function", () => {
    let stub;
    before(() => {
      stub = sinon.stub(wagner, "get").returns({
        findOne: () => {},
      });
    });
    it("db error function", async function () {
      const response = await bookManager.getBook({});
      assert.exists(response, "response should exist");
      assert.exists(
        response.error,
        "Unable to get book currently. Please try again."
      );
      assert.equal(response.status_code, 400);
    });
    it("db exception function", async function () {
      const response = await bookManager.getBook();
      assert.exists(response, "response should exist");
      assert.exists(
        response.error,
        "Unable to get book currently. Please try again."
      );
      assert.equal(response.status_code, 400);
    });
    after(() => {
      sinon.restore();
    });
  });
  

describe("book-manager ->  delete a book function", () => {
  let stub;
  before(() => {
    stub = sinon.stub(wagner, "get").returns({
      destroy: () => {
        return testData.getAllBooks[0];
      },
    });
  });
  it("db error function", async function () {
    const response = await bookManager.deleteBook({ libraryId: 1 });
    assert.exists(response, "response should exist");
    assert.isObject(response, "data should be an object");
    assert.equal(response.status_code, 200);
    assert.equal(response.msg, "Book has been deleted successfully. Please try again.");
  });
  after(() => {
    sinon.restore();
  });
});

describe("book-manager ->  deleteBook a book function", () => {
  let stub;
  before(() => {
    stub = sinon.stub(wagner, "get").returns({
        destroy: () => {},
    });
  });
  it("db error function", async function () {
    const response = await bookManager.deleteBook({});
    assert.exists(response, "response should exist");
    assert.exists(
      response.error,
      "Unable to delete book currently. Please try again."
    );
    assert.equal(response.status_code, 400);
  });
  it("db exception function", async function () {
    const response = await bookManager.deleteBook();
    assert.exists(response, "response should exist");
    assert.exists(
      response.error,
      "Unable to delete book currently. Please try again."
    );
    assert.equal(response.status_code, 400);
  });
  after(() => {
    sinon.restore();
  });
});

