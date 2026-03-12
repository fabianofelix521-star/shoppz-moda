-- Create the 'products' storage bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products',
  'products',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
);

-- Allow public read access to the products bucket
CREATE POLICY "Public read access on products bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

-- Allow authenticated users (admin will validate in API) to upload
CREATE POLICY "Authenticated upload to products bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'products');

-- Allow authenticated users to delete from products bucket
CREATE POLICY "Authenticated delete from products bucket"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'products');
