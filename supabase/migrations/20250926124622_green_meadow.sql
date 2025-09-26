/*
# Agency Aggregator Database Schema

1. New Tables
   - `agencies`
     - `id` (uuid, primary key)
     - `user_id` (uuid, foreign key to auth.users)
     - `name` (text, company name)
     - `address` (text, company address)
     - `phone` (text, contact phone)
     - `email` (text, contact email)
     - `website` (text, optional website)
     - `description` (text, company description)
     - `is_active` (boolean, default true)
     - `created_at` (timestamp)
     - `updated_at` (timestamp)

   - `projects`
     - `id` (uuid, primary key)
     - `agency_id` (uuid, foreign key to agencies)
     - `name` (text, project name)
     - `status` (text, project status)
     - `value` (numeric, project value)
     - `created_at` (timestamp)

2. Security
   - Enable RLS on all tables
   - Agencies can only view/edit their own data
   - Admins can view/edit all agencies
   - Public users cannot access any data

3. Policies
   - Row-level security policies for data access control
   - Role-based permissions using custom claims
*/

-- Create agencies table
CREATE TABLE IF NOT EXISTS agencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  address text,
  phone text,
  email text,
  website text,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table for performance tracking
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id uuid REFERENCES agencies(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  status text DEFAULT 'active',
  value numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN COALESCE(
    (SELECT raw_user_meta_data->>'role' FROM auth.users WHERE id = auth.uid()),
    ''
  ) = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Agencies policies
CREATE POLICY "Agencies can view own data"
  ON agencies
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "Agencies can insert own data"
  ON agencies
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Agencies can update own data"
  ON agencies
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "Only admins can delete agencies"
  ON agencies
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- Projects policies
CREATE POLICY "View projects of owned agencies"
  ON projects
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agencies 
      WHERE agencies.id = projects.agency_id 
      AND (agencies.user_id = auth.uid() OR is_admin())
    )
  );

CREATE POLICY "Insert projects for owned agencies"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM agencies 
      WHERE agencies.id = projects.agency_id 
      AND agencies.user_id = auth.uid()
    )
  );

CREATE POLICY "Update projects for owned agencies"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agencies 
      WHERE agencies.id = projects.agency_id 
      AND (agencies.user_id = auth.uid() OR is_admin())
    )
  );

CREATE POLICY "Delete projects for owned agencies"
  ON projects
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agencies 
      WHERE agencies.id = projects.agency_id 
      AND (agencies.user_id = auth.uid() OR is_admin())
    )
  );

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_agencies_updated_at
  BEFORE UPDATE ON agencies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();