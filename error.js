class ErrorHandler extends Error {
    constructor( message) {
      super();
      this.message = message;
    }
  }

  const handleError = (err, res) => {
    const { message } = err;
    res.send({
      success:false,
      status:500,
      message
    });
  };


  module.exports = {
    ErrorHandler,
    handleError
  };