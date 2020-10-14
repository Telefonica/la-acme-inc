import * as joi from '@hapi/joi';

const configurationSchema: joi.SchemaMap = {
    LA_ACME_INC_API_MOCK: joi.boolean().default(false),
    LA_ACME_INC_API_BASE_URL: joi
        .string()
        .uri({ scheme: ['http', 'https'] })
        .default('https://acme-la-test.firebaseio.com'),
    LA_ACME_INC_API_GET_CATEGORIES: joi.string().default('/categories.json'),
    LA_ACME_INC_API_GET_ACTION: joi.string().default('/action.json'),
    LA_ACME_INC_API_GET_SPORTS: joi.string().default('/sports.json'),
    LA_ACME_INC_API_GET_INDIE: joi.string().default('/indie.json'),
    LA_ACME_INC_API_GET_RPG: joi.string().default('/rpg.json'),
};

export default configurationSchema;
