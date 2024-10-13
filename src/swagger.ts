import swaggerJSDoc from "swagger-jsdoc";


const swaggerDefinition = {
    openapi: '3.0.0',
    info:{
        title: "blog app",
        version: '1.0.0',
        description: "this is the  description of the biog app"
    },
    servers:[
        {
            url: 'http://localhost:3000'
        }
    ]
}

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts','./src/pp.ts']
}

export  const swaggerSpec = swaggerJSDoc(options);