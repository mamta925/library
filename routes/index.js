const { check, body, validationResult } = require("express-validator/check");
const ISBN = require("isbn-validate");
module.exports =  (app, router, wagner) => {
  router.post(
    "/:libraryId/book",
    wagner.get("CommonAccess"),
    [
      body("author", "is required field").not().isEmpty(),
      body("title", "is required field").not().isEmpty(),
      body("ISBN", "is required field").not().isEmpty(),
      body("releaseDate", "is required field")
        .not()
        .isEmpty()
        .toDate()
        .withMessage("is invalid date"),
    ],
    wagner.get("ExpressValidator"),
    async (req, res) => {
      const express_errors = validationResult(req);
      const errObj = {};
      if (!express_errors.isEmpty()) {
        for (let i in express_errors.array()) {
          let msg =
            express_errors.array()[i].param +
            " " +
            express_errors.array()[i].msg;
          errObj.error = msg;
          errObj.status_code = 400;
        }
        return res.status(400).json(errObj);
      }
      let libraryId = req.params.libraryId || 1;
      wagner
        .get("BookManager")
        .createBook({...req.body, libraryId})
        .then((book) => {
          res.status(book.status_code).json(book);
        })
        .catch((error) => {
          next(error);
        });
    }
  );
  router.get(
    "/:libraryId/books",
    wagner.get("CommonAccess"),
    wagner.get("ExpressValidator"),
    async (req, res) => {
      let libraryId = req.params.libraryId || 1;
      wagner
        .get("BookManager")
        .getBooks({ libraryId })
        .then((book) => {
          res.status(book.status_code).json(book);
        })
        .catch((error) => {
          next(error);
        });
    }
  );
  router.get(
    "/:libraryId/book/:Id",
    wagner.get("CommonAccess"),
    wagner.get("ExpressValidator"),
    async (req, res) => {
      let libraryId = req.params.libraryId || 1;
      let Id = req.params.Id;
      if (!Id && !isNaN(Id))
        return res.status(400).json("please give valid book Id");
      wagner
        .get("BookManager")
        .getBook({ libraryId, Id })
        .then((book) => {
          res.status(book.status_code).json(book);
        })
        .catch((error) => {
          next(error);
        });
    }
  );
  router.put(
    "/:libraryId/book/:Id",
    wagner.get("CommonAccess"),
    wagner.get("ExpressValidator"),
    async (req, res) => {
      let libraryId = req.params.libraryId || 1;
      let Id = req.params.Id;
      if (!Id && !isNaN(Id))
        return res.status(400).json("please give valid book Id");
      wagner
        .get("BookManager")
        .updateBook({ libraryId, Id, ...req.body })
        .then((book) => {
          res.status(book.status_code).json(book);
        })
        .catch((error) => {
          next(error);
        });
    }
  );
  router.delete(
    "/:libraryId/book/:Id",
    wagner.get("CommonAccess"),
    wagner.get("ExpressValidator"),
    async (req, res) => {
      let libraryId = req.params.libraryId || 1;
      let Id = req.params.Id;
      if (!Id && !isNaN(Id))
        return res.status(400).json("please give valid book Id");
      wagner
        .get("BookManager")
        .deleteBook({ libraryId, Id})
        .then((book) => {
          res.status(book.status_code).json(book);
        })
        .catch((error) => {
          next(error);
        });
    }
  );
  return router;
};
