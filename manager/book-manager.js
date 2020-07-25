class BookManager {
  constructor(wagner) {
    this.wagner = wagner;
  }
  async createBook(payload) {
    try {
      let book = await this.wagner.get("Book").create(payload);
      if (book) {
        return {
          status_code: 201,
          Id: book.Id,
          msg: "book has been created successfully",
        };
      } else {
        return {
          status_code: 400,
          error: "Unable to create book currently. Please try again.",
        };
      }
    } catch (e) {
      if(e.errors && e.errors[0]){
        return {
          status_code: 400,
          error: e.errors[0].message,
        };
      }
      return {
        status_code: 400,
        error: "Unable to create book currently. Please try again.",
      };
    }
  }
  async getBooks(payload) {
    try {
      let books = await this.wagner.get("Book").findAll({
        where: {
          libraryId: payload.libraryId,
        },
      });
      if (books) {
        return {
          status_code: 200,
          data: books,
        };
      } else {
        return {
          status_code: 400,
          error: "Unable to get  books currently. Please try again.",
        };
      }
    } catch (e) {
      return {
        status_code: 400,
        error: "Unable to get books currently. Please try again.",
      };
    }
  }
  async getBook(payload) {
    try {
      let book = await this.wagner.get("Book").findOne({
        where: {
          libraryId: payload.libraryId,
          Id: payload.Id,
        },
      });
      if (book) {
        return {
          status_code: 200,
          data: book,
        };
      } else {
        return {
          status_code: 400,
          error: "The book is no available right now ",
        };
      }
    } catch (e) {
      return {
        status_code: 400,
        error: "Unable to get book currently. Please try again.",
      };
    }
  }
  async deleteBook(payload) {
    try {
      let book = await this.wagner.get("Book").destroy({
        where: {
          libraryId: payload.libraryId,
          Id: payload.Id,
        },
      });
      if (book) {
        return {
          status_code: 200,
          msg: "Book has been deleted successfully. Please try again.",
        };
      } else {
        return {
          status_code: 400,
          error: "Unable to delete book currently. Please try again.",
        };
      }
    } catch (e) {
      return {
        status_code: 400,
        error: "Unable to delete book currently. Please try again.",
      };
    }
  }
  async updateBook(payload) {
    try {
      let book = await this.wagner.get("Book").findOne({
        where: {
          Id: payload.Id,
        },
      });
      if (book) {
        payload.author && (book.author = payload.author);
        payload.title && (book.title = payload.title);
        payload.ISBN && (book.author = payload.ISBN);
        payload.releaseDate && (book.releaseDate = payload.releaseDate);
        await book.save();
        return {
          status_code: 200,
          id: book.Id,
          msg: "book has been updated successfully",
        };
      } else {
        return {
          status_code: 400,
          error: "Cann't find entered book.",
        };
      }
    } catch (e) {
      return {
        status_code: 400,
        error: "Unable to update book currently. Please try again.",
      };
    }
  }
}
module.exports = BookManager;
