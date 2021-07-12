import * as Joi from 'joi';

export default Joi.object({
  MONGO_DATABASE: Joi.string().required(),
  MONGO_USERNAME: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
});
