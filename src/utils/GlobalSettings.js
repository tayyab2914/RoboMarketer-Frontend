export const DEFAULT_BUTTON_HEIGHT = '45px'

export const PRODUCTION = false;
export const TESTING = true

let DOMAIN_NAME
let FRONTEND_DOMAIN_NAME
let REDIRECT_URI

DOMAIN_NAME = PRODUCTION ? 'https://admin.studentspace.website':'http://127.0.0.1:8000'
REDIRECT_URI = PRODUCTION ? 'https://studentspace.online/account':'http://localhost:3000/account'
FRONTEND_DOMAIN_NAME = PRODUCTION ? 'https://studentspace.online.app':'http://localhost:3000'

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_AUTH_CLIENT_ID = "337525075460-6ltsjfmn3f0nl66q2jg3am4qr292981h.apps.googleusercontent.com"
const GOOGLE_AUTH_SCOPE = [ "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile",  ].join(" ");


export {  DOMAIN_NAME, GOOGLE_AUTH_URL,GOOGLE_AUTH_CLIENT_ID ,GOOGLE_AUTH_SCOPE,REDIRECT_URI};

