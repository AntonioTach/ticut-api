
export default () => ({
    // GENERAL
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    ADMIN_URL: process.env.ADMIN_URL,

    // DATABASE
    DATABASE_URL: process.env.DATABASE_URL,

    // JWT
    JWT_SECRET:         process.env.JWT_SECRET_KEY,
    JWT_EXPIRESIN:      process.env.JWT_EXPIRES,

    // MAIL 
    MAIL_FROM: process.env.MAIL_FROM,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_SECURE: process.env.MAIL_SECURE,
    MAIL_AUTH_USER: process.env.MAIL_AUTH_USER,
    MAIL_AUTH_PASS: process.env.MAIL_AUTH_PASS,

    // AWS
    AWS_ACCESS_KEY_ID:      process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY:  process.env.AWS_SECRET_ACCESS_KEY,
    AWS_S3_REGION:          process.env.AWS_S3_REGION,
    BUCKET_NAME:            process.env.BUCKET_NAME,
    // S3_BUCKET:              process.env.S3_BUCKET,

});
