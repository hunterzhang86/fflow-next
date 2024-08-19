CREATE TABLE accounts (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    userId VARCHAR(191) NOT NULL,
    type VARCHAR(191) NOT NULL,
    provider VARCHAR(191) NOT NULL,
    providerAccountId VARCHAR(191) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type VARCHAR(191),
    scope VARCHAR(191),
    id_token TEXT,
    session_state VARCHAR(191),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
);

CREATE INDEX idx_userId ON accounts (userId);

CREATE UNIQUE INDEX uk_p_p ON accounts (provider, providerAccountId);


CREATE TABLE sessions (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    sessionToken VARCHAR(191) NOT NULL,
    userId VARCHAR(191) NOT NULL,
    expires TIMESTAMP(3) NOT NULL,

    UNIQUE (sessionToken)
);

CREATE INDEX idx_userId ON sessions (userId);

CREATE TABLE users (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    name VARCHAR(191),
    email VARCHAR(191),
    emailVerified TIMESTAMP(3),
    image VARCHAR(191),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    stripe_customer_id VARCHAR(191),
    stripe_subscription_id VARCHAR(191),
    stripe_price_id VARCHAR(191),
    stripe_current_period_end TIMESTAMP(3),

    UNIQUE (email),
    UNIQUE (stripe_customer_id),
    UNIQUE (stripe_subscription_id)
);

CREATE TABLE verification_tokens (
    identifier VARCHAR(191) NOT NULL,
    token VARCHAR(191) NOT NULL,
    expires TIMESTAMP(3) NOT NULL,

    UNIQUE (token),
    UNIQUE (identifier, token)
);
