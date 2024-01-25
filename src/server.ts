const startServer = async (app: any, logger: any) => {
  try {
    const port = Number(process.env.PORT) || 3000;
    const server = app.listen(port);

    return server;
  } catch (error) {
      logger.error("Error starting server:", (error as Error).message);
  }
};

export { startServer };
