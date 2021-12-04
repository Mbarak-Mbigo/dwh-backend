class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class InvalidData extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidData";
  }
}

module.exports = {
  ValidationError,
  InvalidData,
};
