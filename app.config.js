import 'dotenv/config';
export default {
    expo: {
        name: "my-app",
        slug: "my-app",
        version: "1.0.0",
        orientation: "default",
        updates: {
            "fallbackToCacheTimeout": 0
        },
        assetBundlePatterns: [
            "**/*"
        ],
        ios: {
            supportsTablet: true
        },
        extra: {
            yleApiKey: process.env.YLE_API_KEY,
            yleApiId: process.env.YLE_API_ID,
            tunnelUrl: process.env.TUNNEL,
            baseUrl:  process.env.LOCAL,
            careeriaUrl: process.env.CAREERIA
        }
    }
}
