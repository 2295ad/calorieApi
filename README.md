--FOLDER STRUCTURE--

    1. All routes are handled in routes folder through index.js
    
    2. Helper folder added, additional required services is added there.
    
    3. Database configurations specified in config.json & token secret mentioned in .env file


--DESIGN --

    1. Framework - expressJs, Database used is mongodb, monk module is used to perform all mongo operations
    
    2. JWT token is used for authentication
    
    3. A common error handler is added to ensure api response even in case of any exceptions.
    
    4. A common api response structure is maintained
    
    5. pino real time logging is added
    
    6. Mocha Chai is used for unit testing 
