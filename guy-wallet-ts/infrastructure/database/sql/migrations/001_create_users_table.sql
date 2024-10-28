BEGIN;

-- Postgres script to create the users table if it does not exist
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY,
  name: VARCHAR(255) NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  account_number VARCHAR(255) NOT NULL,
  bank_name VARCHAR(255) NOT NULL,
  reference VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS banks { id UUID PRIMARY KEY,
name VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
};

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY,
  user_id INTEGER NOT NULL,
  amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  currency VARCHAR(3) NOT NULL DEFAULT 'NGN',
  -- receiver
  to_type VARCHAR(32) NOT NULL CHECK (type IN ('bank', 'wallet')),
  to_wallet_id UUID REFERENCES wallets(id) DEFAULT NULL,
  to_bank_name VARCHAR(255) NOT NULL DEFAULT NULL,
  to_account_name VARCHAR(255) NOT NULL DEFAULT NULL,
  to_account_number VARCHAR(255) NOT NULL DEFAULT NULL,
  -- initiator
  from_type VARCHAR(32) NOT NULL CHECK (type IN ('bank', 'wallet')),
  from_wallet_id UUID REFERENCES wallets(id) DEFAULT NULL,
  from_bank_name VARCHAR(255) NOT NULL DEFAULT NULL,
  from_account_name VARCHAR(255) NOT NULL DEFAULT NULL,
  from_account_number VARCHAR(255) NOT NULL DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- constraints for payment types and fields
  CHECK (
    (
      to_type = 'wallet'
      AND to_wallet_id IS NOT NULL
      AND to_bank_name IS NULL
      AND to_account_name IS NULL
      AND to_account_number IS NULL
    )
    OR (
      to_type = 'bank'
      AND to_wallet_id IS NULL
      AND to_bank_name IS NOT NULL
      AND to_account_name IS NOT NULL
      AND to_account_number IS NOT NULL
    )
  ),
  CHECK (
    (
      from_type = 'wallet'
      AND from_wallet_id IS NOT NULL
      AND from_bank_name IS NULL
      AND from_account_name IS NULL
      AND from_account_number IS NULL
    )
    OR (
      from_type = 'bank'
      AND from_wallet_id IS NULL
      AND from_bank_name IS NOT NULL
      AND from_account_name IS NOT NULL
      AND from_account_number IS NOT NULL
    )
  )
);

COMMIT;