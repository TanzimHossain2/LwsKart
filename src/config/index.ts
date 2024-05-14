/*  
    This file is used to store the configuration of the application.
    The configuration can be accessed from anywhere in the application.
    The configuration is stored in an object and is frozen to prevent any changes to the configuration.
    The configuration object is exported as a default export.
*/

interface IAppConfig {
    baseUrl: string;
}

const appConfig: IAppConfig = {
    baseUrl: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "xlwskart.vercel.app",
}

Object.freeze(appConfig);

export default appConfig;
