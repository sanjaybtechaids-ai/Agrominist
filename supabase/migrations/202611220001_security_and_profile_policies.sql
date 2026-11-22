-- Apply after the existing schema migrations. This migration is non-destructive.

create or replace function public.prevent_profile_role_change()
returns trigger
language plpgsql
as $$
begin
  if new.role is distinct from old.role then
    raise exception 'Profile roles cannot be changed by a user update';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_prevent_role_change on public.profiles;
create trigger profiles_prevent_role_change
before update on public.profiles
for each row execute procedure public.prevent_profile_role_change();

drop policy if exists "farmer profile own access" on public.farmer_profiles;
create policy "farmer profile own access"
on public.farmer_profiles for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "farmer owns expenses" on public.farming_expenses;
create policy "farmer owns expenses"
on public.farming_expenses for all
using (farmer_id = auth.uid())
with check (farmer_id = auth.uid());

drop policy if exists "farmer owns fertilizer recommendations" on public.fertilizer_recommendations;
create policy "farmer owns fertilizer recommendations"
on public.fertilizer_recommendations for all
using (exists (
  select 1 from public.land_plots p
  where p.id = plot_id and p.farmer_id = auth.uid()
))
with check (exists (
  select 1 from public.land_plots p
  where p.id = plot_id and p.farmer_id = auth.uid()
));

drop policy if exists "weather records readable" on public.weather_records;
create policy "weather records readable"
on public.weather_records for select
using (true);

-- Expose only marketplace-safe seller details; do not grant direct access to profiles.
create or replace view public.marketplace_sellers
with (security_invoker = false)
as
select id, full_name, village, district, state
from public.profiles;

revoke all on public.marketplace_sellers from public;
grant select on public.marketplace_sellers to anon, authenticated;
