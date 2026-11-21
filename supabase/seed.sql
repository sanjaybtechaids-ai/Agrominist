-- Development only. Do not apply this file to production.
-- Demo credentials: farmer@agronomist.demo / Farmer@123 and customer@agronomist.demo / Customer@123
insert into auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
values
  ('11111111-1111-4111-8111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'farmer@agronomist.demo', crypt('Farmer@123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Demo Farmer","role":"FARMER","preferred_language":"en"}', now(), now()),
  ('22222222-2222-4222-8222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'customer@agronomist.demo', crypt('Customer@123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Demo Customer","role":"CUSTOMER","preferred_language":"en"}', now(), now())
on conflict (id) do nothing;

insert into public.land_plots (farmer_id, plot_name, total_area_acres, display_area, area_unit, soil_type, irrigation_type)
select '11111111-1111-4111-8111-111111111111', 'Demo Cauvery plot', 2, 2, 'acre', 'Alluvial', 'canal'
where not exists (select 1 from public.land_plots where farmer_id = '11111111-1111-4111-8111-111111111111');
