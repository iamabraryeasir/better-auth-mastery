const config = {
    betterAuth: {
        secret: process.env.BETTER_AUTH_SECRET as string,
        url: process.env.BETTER_AUTH_URL as string,
    },
    mongodb: {
        uri: process.env.MONGODB_URI as string,
    },
};

export default config;
