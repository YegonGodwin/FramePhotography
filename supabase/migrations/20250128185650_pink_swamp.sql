/*
  # Create payments table

  1. New Tables
    - `payments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `package_id` (text)
      - `amount` (numeric)
      - `total_amount` (numeric)
      - `status` (text)
      - `created_at` (timestamp)
      - `payment_intent_id` (text)

  2. Security
    - Enable RLS on `payments` table
    - Add policies for users to view their own payments
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  package_id text NOT NULL,
  amount numeric NOT NULL,
  total_amount numeric NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now(),
  payment_intent_id text
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payments"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);