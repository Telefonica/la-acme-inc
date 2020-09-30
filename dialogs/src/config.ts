import * as joi from '@hapi/joi';

const configurationSchema: joi.SchemaMap = {
    LA_ACME_INC_API_MOCK: joi.boolean().default(true), // pasa usar mock o no
    LA_ACME_INC_API_BASE_URL: joi.string().default('http://localhost:8080'),
    LA_ACME_INC_API_GET_CATEGORIES: joi.string().default('/api/categories'),
    LA_ACME_INC_API_GET_ACTION: joi.string().default('/api/action'),
    LA_ACME_INC_API_GET_ADVENTURE: joi.string().default('/api/adventure'),
    LA_ACME_INC_API_GET_SIMULATION: joi.string().default('/api/simulation'),
    LA_ACME_INC_API_GET_SPORTS: joi.string().default('/api/sports'),
};

export default configurationSchema;
