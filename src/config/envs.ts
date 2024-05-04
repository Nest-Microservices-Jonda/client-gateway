import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICES_PORT: number;
  PRODUCTS_MICROSERVICES_HOST: string;
  ORDERS_MICROSERVICES_PORT: number;
  ORDERS_MICROSERVICES_HOST: string;
}

const envVarsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required().default(3000),
    PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().required(),
    ORDERS_MICROSERVICES_HOST: joi.string().required(),
    ORDERS_MICROSERVICES_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  productsMicroservicesHost: envVars.PRODUCTS_MICROSERVICES_HOST,
  productsMicroservicesPort: envVars.PRODUCTS_MICROSERVICES_PORT,
  ordersMicroservicesHost: envVars.ORDERS_MICROSERVICES_HOST,
  ordersMicroservicesPort: envVars.ORDERS_MICROSERVICES_PORT,
};
