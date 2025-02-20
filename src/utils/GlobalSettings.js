export const DEFAULT_BUTTON_HEIGHT = '45px'

export const PRODUCTION = true;
export const TESTING = true

let DOMAIN_NAME
let FRONTEND_DOMAIN_NAME
let REDIRECT_URI

DOMAIN_NAME = PRODUCTION ? 'https://robomarketer.studentspace.website':'http://127.0.0.1:8000'
REDIRECT_URI = PRODUCTION ? 'https://studentspace.online/account':'http://localhost:3000/account'
FRONTEND_DOMAIN_NAME = PRODUCTION ? 'https://robo-marketer-frontend.vercel.app/':'http://localhost:3000'

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_AUTH_CLIENT_ID = "337525075460-6ltsjfmn3f0nl66q2jg3am4qr292981h.apps.googleusercontent.com"
const GOOGLE_AUTH_SCOPE = [ "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile",  ].join(" ");


export const AI_MODELS = {
    OpenAI: {
        icon: "ai_model_open_ai",  // Example icon name
        models: [
            { name: "GPT-4o", value: "gpt-4o" },
            { name: "GPT-4o Mini", value: "gpt-4o-mini" },
            { name: "o1", value: "o1" },
            { name: "o1 Mini", value: "o1-mini" },
            { name: "o3", value: "o3" },
            { name: "o3 Mini", value: "o3-mini" },
            { name: "o1 Pro", value: "o1-pro" },
        ]
    },
    DeepSeek: {
        icon: "ai_model_deep_seek",
        models: [
            { name: "R1", value: "deepseek-reasoner" },
            { name: "DeepSeek V3", value: "deepseek-chat" },
        ]
    },
    Google: {
        icon: "ai_model_google",
        models: [
            { name: "Gemini 2.0 Pro", value: "gemini-2.0-pro-exp" },
            { name: "Gemini 2.0 Flash", value: "gemini-2.0-flash" },
            { name: "Gemini 2.0 Flash Lite", value: "gemini-2.0-flash-lite-preview" },
        ]
    },
    Anthropic: {
        icon: "ai_model_anthropic",
        models: [
            { name: "Claude 3.5 Sonnet", value: "claude-3-5-sonnet-20241022" },
            { name: "Claude 3 Opus", value: "claude-3-opus-20240229" },
            { name: "Claude 3.5 Haiku", value: "claude-3-5-haiku-20241022" },
        ]
    },
    Alibaba: {
        icon: "ai_model_ali_baba",
        models: [
            { name: "Qwen-2.5-1M", value: "qwen2.5-7b-instruct-1m" },
            { name: "Qwen2", value: "qwen2-7b-instruct" },
            { name: "Qwen2.5", value: "qwen2.5-7b-instruct" },
        ]
    },
    Meta: {
        icon: "ai_model_meta",
        models: [
            { name: "Llama 3.1", value: "llama3.1-70b" },
            { name: "Llama 3", value: "llama3-70b" },
        ]
    },
    xAI: {
        icon: "ai_model_x",
        models: [
            { name: "Grok-2", value: "grok-2-latest" },
        ]
    }
};

export {  DOMAIN_NAME, GOOGLE_AUTH_URL,GOOGLE_AUTH_CLIENT_ID ,GOOGLE_AUTH_SCOPE,REDIRECT_URI,FRONTEND_DOMAIN_NAME};

