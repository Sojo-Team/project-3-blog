export class CustomError extends Error {
  statusCode

  constructor(message) {
    super(message)
  }

  serializeErrors() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    }
  }
}

// BadRequestError
export class BadRequestError extends CustomError {
  statusCode = 400

  constructor(message) {
    super(message)
  }
}

// NotFoundError
export class NotFoundError extends CustomError {
  statusCode = 404

  constructor(message) {
    super(message)
  }
}

// UnauthorizedError
export class UnauthorizedError extends CustomError {
  statusCode = 401

  constructor(message) {
    super(message)
  }
}

// FileTooLargeError
// export class FileTooLargeError extends CustomError {
//   statusCode = 404

//   constructor(message) {
//     super(message)
//   }
// }
