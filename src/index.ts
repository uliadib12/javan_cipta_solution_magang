import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import userRoutes from './routes/userRoutes';

const app = express();

const swaggerDocument = YAML.load('./public/openapi.yaml');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(userRoutes);

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
