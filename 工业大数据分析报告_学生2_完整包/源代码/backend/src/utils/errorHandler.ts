export const errorHandler = (err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.status(500).json({ error: 'Internal Server Error' });
};