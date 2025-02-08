export const EMAIL_RULES_REQUIRED = [
    { required: true, message: "Please input your email!" },
    { type: "email", message: "The input is not valid E-mail!" }, // Validate email format
  ];
  export const NAME_RULES_REQUIRED = [
    { required: true, message: "Please input your name!" },
  ];
  export const COMPANY_NAME_RULES_REQUIRED = [
    { required: true, message: "Please input company name!" },
  ];
  export const API_KEY_RULES_REQUIRED = [
    { required: true, message: "Please input API key!" },
    {
      pattern: /^sk-[A-Za-z0-9_-]{32,}$/,
      message: "The API key format should start with 'sk-' .",
    },
  ];
  
  export const PHONE_NUMBER_RULES_REQUIRED = [
    { required: true, message: "Please input your name!" },
  ];
  export const ACCOUNT_RULES_REQUIRED = [
    { required: true, message: "Please input number of accounts!" },
    {
      validator: (_, value) => {
        if (!value || (Number(value) > 0 && Number.isInteger(Number(value)))) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Please enter a valid positive number!"));
      },
    },
  ];
  
  export const PASSWORD_RULES_REQUIRED = [
    { required: true, message: "Please input your password!" },
    { min: 8, message: "Password must be at least 8 characters long!" }, // Validate minimum password length
  ];
  export const VALIDATE_CONFIRM_PASSWORD = [
    { required: true, message: "Please confirm your password!" },
    // Custom validator to check if the password matches confirm password
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("The two passwords do not match!"));
      },
    }),
  ];
  
  export const IS_VALID_URL = (value) => {
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*$/;
    return urlRegex.test(value);
  };
  

  export const WHITELABEL_DOMAIN_RULES_REQUIRED = [
    { required: true, message: "Please input your whitelabel domain!" },
    {
      pattern: /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,}$/i,
      message: "Please enter a valid domain (e.g., example.com).",
    },
  ];
  