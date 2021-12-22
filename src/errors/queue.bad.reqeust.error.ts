class QueueBadReqeustError extends Error {  
    constructor (message) {
      super(message)
  
      this.name = 'QueueBadReqeustError';
  
      Error.captureStackTrace(this, this.constructor);

    }
  }
  export default QueueBadReqeustError;