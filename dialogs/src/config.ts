import * as joi from '@hapi/joi';

const configurationSchema: joi.SchemaMap = {
    LA_ACME_INC_API_MOCK: joi.boolean().default(false), // to use mock
    LA_ACME_INC_API_BASE_URL: joi
        .string()
        .uri({ scheme: ['http', 'https'] })
        .default('https://api.rawg.io/api/'),
    LA_ACME_INC_API_GET_CATEGORIES: joi.string().default('genres?page_size=4'),
    LA_ACME_INC_API_GET_ACTION: joi.string().default('games?page_size=4&genres=action'),
    LA_ACME_INC_API_GET_ADVENTURE: joi.string().default('games?page_size=4&genres=adventure'),
    LA_ACME_INC_API_GET_INDIE: joi.string().default('games?page_size=4&genres=indie'),
    LA_ACME_INC_API_GET_RPG: joi.string().default('games?page_size=4&genres=role-playing-games-rpg'),
};

export default configurationSchema;
