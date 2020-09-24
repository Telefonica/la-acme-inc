import * as joi from '@hapi/joi';

const configurationSchema: joi.SchemaMap = {
    LA_ACME_INC_API_MOCK: joi.boolean().default(true), // pasa usar mock o no
};

export default configurationSchema;
