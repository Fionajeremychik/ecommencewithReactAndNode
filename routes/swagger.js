import swaggerJsdoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'An Ecommerce API',
            termsOfService: 'http://api_url/terms/',
            contact: {
                name: 'Data Scientist Team',
                email: 'chikmatthew@gmail.com',
                url: 'https://matthew.com'
            },
            license: {
                name: 'Apache 2.0',
                url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
            }
        },
        servers: [{
            url: 'http://localhost:8080'
        }],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs