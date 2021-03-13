class CustomError extends Error {}

class DBError extends CustomError {
  constructor(public event: Event | string) {
    super();
  }
}

export { CustomError, DBError };
