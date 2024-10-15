import { Request, Response, NextFunction } from 'express';

// Middleware to add the Refresh header to every response
const refreshHeaderMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Set the Refresh header to instruct the browser to refresh the page every 3 seconds
  res.setHeader('Refresh', '3');
  
  // Continue with the next middleware or route handler
  next();
};

//export the module
export default refreshHeaderMiddleware;