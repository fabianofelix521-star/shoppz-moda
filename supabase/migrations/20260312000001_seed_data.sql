-- Seed data for Shoppz Moda

-- Create admin user (password: admin123 hashed with bcrypt cost 12)
INSERT INTO "User" (id, name, email, password, role, "createdAt", "updatedAt")
VALUES (
  'cm_admin_001',
  'Admin',
  'admin@dropstore.com',
  '$2b$12$2OaPsx8BylrtffDEdbO6me8Bcw/13/JTppcJepNRCO3cjHXAFUM6C',
  'ADMIN',
  NOW(),
  NOW()
);

-- Create demo user (password: user123)
INSERT INTO "User" (id, name, email, password, role, "createdAt", "updatedAt")
VALUES (
  'cm_user_001',
  'Jane Doe',
  'jane@example.com',
  '$2b$12$VWgghbAMr5dvawc7CiXz3er5l9IEo2dl.tAcDy3aNHCNJNnM9To7G',
  'USER',
  NOW(),
  NOW()
);

-- Categories
INSERT INTO "Category" (id, name, slug, image, description, "createdAt", "updatedAt") VALUES
('cat_women', 'Women', 'women', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop', 'Women''s fashion collection', NOW(), NOW()),
('cat_men', 'Men', 'men', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop', 'Men''s fashion collection', NOW(), NOW()),
('cat_bags', 'Bags', 'bags', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop', 'Premium bags and accessories', NOW(), NOW()),
('cat_shoes', 'Shoes', 'shoes', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop', 'Footwear collection', NOW(), NOW()),
('cat_tops', 'Tops', 'tops', 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&h=800&fit=crop', 'Shirts, blouses and tops', NOW(), NOW()),
('cat_dresses', 'Dresses', 'dresses', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop', 'Dresses for every occasion', NOW(), NOW());

-- Products
INSERT INTO "Product" (id, name, slug, brand, description, price, "compareAt", rating, "reviewCount", sizes, featured, active, "categoryId", "createdAt", "updatedAt") VALUES
('prod_01', 'Leather Monogram Tote Bag', 'leather-monogram-tote-bag', 'Maison Luxe', 'Elegant leather tote bag with monogram print. Spacious interior with multiple compartments.', 175.0, 220.0, 4.8, 124, ARRAY['ONE SIZE'], true, true, 'cat_bags', NOW(), NOW()),
('prod_02', 'Floral Print Wrap Dress', 'floral-print-wrap-dress', 'Atelier Mode', 'Flowy wrap dress with delicate floral print. V-neck design with adjustable tie waist.', 430.7, NULL, 4.7, 89, ARRAY['XS','S','M','L','XL'], true, true, 'cat_dresses', NOW(), NOW()),
('prod_03', 'Tailored Slim Fit Trousers', 'tailored-slim-fit-trousers', 'Voss & Co', 'Classic tailored trousers in slim fit. High-quality stretch wool blend.', 259.9, NULL, 4.5, 67, ARRAY['XS','S','M','L','XL'], true, true, 'cat_men', NOW(), NOW()),
('prod_04', 'Oversized Wool Blend Jacket', 'oversized-wool-blend-jacket', 'Maison Luxe', 'Luxurious oversized jacket in wool blend. Single-breasted design with wide lapels.', 239.8, NULL, 4.9, 156, ARRAY['XS','S','M','L','XL'], true, true, 'cat_women', NOW(), NOW()),
('prod_05', 'Tie Dye Print Satin Shirt', 'tie-dye-print-satin-shirt', 'Atelier Mode', 'Flowy shirt with lapel collar with V-neck and long sleeves. Satin effect fabric.', 175.0, NULL, 4.9, 203, ARRAY['XS','S','M','L','XL'], true, true, 'cat_tops', NOW(), NOW()),
('prod_06', 'Rainbow Stripe Knit Sweater', 'rainbow-stripe-knit-sweater', 'Chromatic', 'Colorful striped knit sweater with relaxed fit. Soft cotton blend.', 189.0, NULL, 4.6, 78, ARRAY['XS','S','M','L'], false, true, 'cat_tops', NOW(), NOW()),
('prod_07', 'Classic Leather Oxford Shoes', 'classic-leather-oxford-shoes', 'Voss & Co', 'Timeless Oxford shoes in premium leather. Blake stitched for durability.', 345.0, 420.0, 4.8, 201, ARRAY['39','40','41','42','43','44'], false, true, 'cat_shoes', NOW(), NOW()),
('prod_08', 'Silk Midi Skirt', 'silk-midi-skirt', 'Atelier Mode', 'Elegant midi skirt in flowing silk. High waist with invisible zip closure.', 299.0, NULL, 4.7, 92, ARRAY['XS','S','M','L','XL'], false, true, 'cat_women', NOW(), NOW()),
('prod_09', 'Structured Canvas Crossbody', 'structured-canvas-crossbody', 'Maison Luxe', 'Structured crossbody bag in premium canvas with leather trim.', 195.0, NULL, 4.4, 56, ARRAY['ONE SIZE'], false, true, 'cat_bags', NOW(), NOW()),
('prod_10', 'Linen Blend Summer Blazer', 'linen-blend-summer-blazer', 'Voss & Co', 'Lightweight summer blazer in linen blend. Single-breasted with two buttons.', 320.0, NULL, 4.6, 44, ARRAY['S','M','L','XL'], false, true, 'cat_men', NOW(), NOW()),
('prod_11', 'Platform Leather Sneakers', 'platform-leather-sneakers', 'Chromatic', 'Modern platform sneakers in white leather. Chunky sole with excellent cushioning.', 215.0, NULL, 4.5, 134, ARRAY['36','37','38','39','40','41'], false, true, 'cat_shoes', NOW(), NOW()),
('prod_12', 'Cashmere Crew Neck Sweater', 'cashmere-crew-neck-sweater', 'Maison Luxe', 'Luxurious pure cashmere sweater. Soft and lightweight with fine knit.', 485.0, NULL, 4.9, 267, ARRAY['XS','S','M','L','XL'], true, true, 'cat_women', NOW(), NOW());

-- Product Images
INSERT INTO "ProductImage" (id, url, alt, position, "productId") VALUES
-- Tote Bag
('img_01a', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop', 'Tote bag front', 0, 'prod_01'),
('img_01b', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop', 'Tote bag side', 1, 'prod_01'),
('img_01c', 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop', 'Tote bag detail', 2, 'prod_01'),
-- Wrap Dress
('img_02a', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop', 'Wrap dress front', 0, 'prod_02'),
('img_02b', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop', 'Wrap dress back', 1, 'prod_02'),
('img_02c', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop', 'Wrap dress detail', 2, 'prod_02'),
-- Trousers
('img_03a', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop', 'Trousers front', 0, 'prod_03'),
('img_03b', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop', 'Trousers side', 1, 'prod_03'),
-- Jacket
('img_04a', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop', 'Jacket front', 0, 'prod_04'),
('img_04b', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop', 'Jacket back', 1, 'prod_04'),
('img_04c', 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&h=800&fit=crop', 'Jacket detail', 2, 'prod_04'),
-- Satin Shirt
('img_05a', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop', 'Satin shirt front', 0, 'prod_05'),
('img_05b', 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&h=800&fit=crop', 'Satin shirt model', 1, 'prod_05'),
('img_05c', 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&h=800&fit=crop', 'Satin shirt detail', 2, 'prod_05'),
('img_05d', 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&h=800&fit=crop', 'Satin shirt styled', 3, 'prod_05'),
-- Knit Sweater
('img_06a', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop', 'Knit sweater front', 0, 'prod_06'),
('img_06b', 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a16?w=600&h=800&fit=crop', 'Knit sweater detail', 1, 'prod_06'),
-- Oxford Shoes
('img_07a', 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop', 'Oxford shoes', 0, 'prod_07'),
('img_07b', 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=800&fit=crop', 'Oxford shoes side', 1, 'prod_07'),
-- Silk Skirt
('img_08a', 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop', 'Silk skirt', 0, 'prod_08'),
('img_08b', 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600&h=800&fit=crop', 'Silk skirt detail', 1, 'prod_08'),
-- Crossbody Bag
('img_09a', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop', 'Crossbody bag', 0, 'prod_09'),
('img_09b', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop', 'Crossbody bag detail', 1, 'prod_09'),
-- Summer Blazer
('img_10a', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop', 'Summer blazer', 0, 'prod_10'),
('img_10b', 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop', 'Summer blazer detail', 1, 'prod_10'),
-- Platform Sneakers
('img_11a', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=800&fit=crop', 'Platform sneakers', 0, 'prod_11'),
('img_11b', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=800&fit=crop', 'Platform sneakers side', 1, 'prod_11'),
-- Cashmere Sweater
('img_12a', 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&h=800&fit=crop', 'Cashmere sweater', 0, 'prod_12'),
('img_12b', 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop', 'Cashmere sweater detail', 1, 'prod_12');

-- Banners
INSERT INTO "Banner" (id, title, subtitle, cta, link, "bgColor", active, position, "createdAt", "updatedAt") VALUES
('banner_01', '80% OFF', 'Discover fashion that suits your style', 'Shop Now', '/products', '#E84545', true, 0, NOW(), NOW()),
('banner_02', 'New Arrivals', 'Spring/Summer 2026 Collection', 'Explore', '/products?sort=newest', '#1a1a1a', true, 1, NOW(), NOW());

-- User address
INSERT INTO "Address" (id, "userId", name, street, city, state, zip, country, "isDefault") VALUES
('addr_001', 'cm_user_001', 'Jane Doe', '123 Fashion Ave', 'New York', 'NY', '10001', 'US', true);
