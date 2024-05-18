/*  
    This file is used to store the configuration of the application.
    The configuration can be accessed from anywhere in the application.
    The configuration is stored in an object and is frozen to prevent any changes to the configuration.
    The configuration object is exported as a default export.
*/

interface IAppConfig {
    baseUrl: string;
    fromEmail: string;
}

const fromEmail = process.env.NODE_ENV === "development" ? "lwsKart@resend.dev" : process.env.NEXT_PUBLIC_DOMAIN_NAME;


const appConfig: IAppConfig = {
    baseUrl: process.env.NODE_ENV === "development" ? "http://localhost:3000" :  process.env.NEXT_PUBLIC_BASE_URL as string,
    fromEmail: fromEmail  as string,
}

Object.freeze(appConfig);

export default appConfig;
