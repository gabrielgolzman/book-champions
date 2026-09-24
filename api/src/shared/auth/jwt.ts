if (!process.env.JWT_SECRET)
    throw new Error("JWT_SECRET must be set");

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = "1h";
