import * as joi from '@hapi/joi';

const configurationSchema: joi.SchemaMap = {
    LA_ACME_INC_API_MOCK: joi.boolean().default(false),
    LA_ACME_INC_API_BASE_URL: joi
        .string()
        .uri({ scheme: ['http', 'https'] })
        .default('https://acme-la-test.firebaseio.com'),
    LA_ACME_INC_API_GET_CATEGORIES: joi.string().default('/categories.json'),
    LA_ACME_INC_API_GET_GAMES: joi.string().default('/games.json'),
    LA_ACME_INC_API_GET_PLATFORMS: joi.string().default('/platforms.json')    
};

export default configurationSchema;
