class QueueNotFoundError extends Error {  
    constructor (message) {
      super(message)
  
      this.name = 'QueueNotFoundError';
  
      Error.captureStackTrace(this, this.constructor);

    }
  }
  export default QueueNotFoundError;