/*
# Cloud Kitchen — Profiles and Orders Schema

## Overview
Creates a `profiles` table to store extra user info (name, phone, address) linked to Supabase auth.users, and an `orders` table so users can place and track food orders from the cloud kitchen.

## New Tables

### profiles
- `id` (uuid, primary key) — references auth.users(id), one row per user
- `full_name` (text, not null) — user's display name
- `phone` (text, not null) — contact phone number
- `address` (text, not null) — delivery address
- `created_at` (timestamptz, default now())

### orders
- `id` (uuid, primary key)
- `user_id` (uuid, not null, default auth.uid()) — references profiles(id), owner of the order
- `item_name` (text, not null) — name of the dish ordered
- `quantity` (integer, not null, default 1)
- `status` (text, not null, default 'pending') — pending | preparing | delivered
- `total_price` (numeric, not null, default 0)
- `created_at` (timestamptz, default now())

## Security
- RLS enabled on both tables.
- profiles: users can read, insert, and update only their own row (auth.uid() = id).
- orders: users can read, insert, update, and delete only their own orders (auth.uid() = user_id).

## Notes
1. profiles.id defaults to auth.uid() so the insert from the frontend succeeds without passing the id explicitly.
2. orders.user_id defaults to auth.uid() so inserts omitting user_id still satisfy the WITH CHECK policy.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  item_name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'pending',
  total_price numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_orders" ON orders;
CREATE POLICY "select_own_orders" ON orders FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_orders" ON orders;
CREATE POLICY "insert_own_orders" ON orders FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_orders" ON orders;
CREATE POLICY "update_own_orders" ON orders FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_orders" ON orders;
CREATE POLICY "delete_own_orders" ON orders FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
