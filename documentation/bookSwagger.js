const { Book } = require("../models");

module.exports = {
  paths: {
    "/api/books": {
      get: {
        tags: ["Books"],
        summary: "Get all books",
        description: "Retrieve a list of all books with pagination.",
        parameters: [
          {
            in: "query",
            name: "page",
            schema: {
              type: "integer",
              default: 1,
            },
            description: "Page number for pagination",
          },
          {
            in: "query",
            name: "limit",
            schema: {
              type: "integer",
              default: 10,
            },
            description: "Number of items per page",
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    page: { type: "integer" },
                    limit: { type: "integer" },
                    totalPages: { type: "integer" },
                    totalBooks: { type: "integer" },
                    books: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer" },
                          title: { type: "string" },
                          author: { type: "string" },
                          // Add other properties based on your Book model
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
        },
      },
      post: {
        tags: ["Books"],
        summary: "Add a new book",
        description: "Add a new book to the library.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  author: { type: "string" },
                  published_date: { type: "string", format: "date" },
                  isbn: { type: "string" },
                  number_of_pages: { type: "integer" },
                  cover_image_url: { type: "string" },
                  language: { type: "string" },
                  createdAt: { type: "string", format: "date" },
                  updatedAt: { type: "string", format: "date" },
                },
                required: ["title", "author"], // Adjust required fields as per your model
              },
            },
          },
        },
        responses: {
          201: {
            description: "Book created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    title: { type: "string" },
                    author: { type: "string" },
                    // Add other properties based on your Book model
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
        },
      },
    },
    "/api/books/{id}": {
      get: {
        tags: ["Books"],
        summary: "Get a book by ID",
        description: "Retrieve a book by its unique ID.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
            },
            description: "ID of the book to retrieve.",
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    title: { type: "string" },
                    author: { type: "string" },
                    // Add other properties based on your Book model
                  },
                },
              },
            },
          },
          404: {
            description: "Book not found",
          },
        },
      },
      put: {
        tags: ["Books"],
        summary: "Update a book by ID",
        description: "Update a book's information by its unique ID.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
            },
            description: "ID of the book to update.",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  author: { type: "string" },
                  published_date: { type: "string", format: "date" },
                  isbn: { type: "string" },
                  number_of_pages: { type: "integer" },
                  cover_image_url: { type: "string" },
                  language: { type: "string" },
                  createdAt: { type: "string", format: "date" },
                  updatedAt: { type: "string", format: "date" },
                  // Add other properties based on your Book model
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Book updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    title: { type: "string" },
                    author: { type: "string" },
                    // Add other properties based on your Book model
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "Book not found",
          },
        },
      },
      delete: {
        tags: ["Books"],
        summary: "Delete a book by ID",
        description: "Delete a book from the library by its unique ID.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
            },
            description: "ID of the book to delete.",
          },
        ],
        responses: {
          204: {
            description: "Book deleted successfully",
          },
          404: {
            description: "Book not found",
          },
        },
      },
    },
  },
};
