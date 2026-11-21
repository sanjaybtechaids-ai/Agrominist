import { z } from 'zod';
import { handleApiError, ok, parseJson } from '@/lib/api';
import { database, requireRole } from '@/lib/supabase';
import { toAcres } from '@/lib/area';

const plotSchema = z.object({ plotName: z.string().trim().min(1).max(100), totalArea: z.number().positive().max(100000), areaUnit: z.enum(['acre', 'cent', 'hectare']), latitude: z.number().min(-90).max(90).optional(), longitude: z.number().min(-180).max(180).optional(), soilType: z.string().max(50).optional(), irrigationType: z.string().max(50).optional() });
export async function GET(request: Request) { try { const { user, token } = await requireRole(request, 'FARMER', 'ADMIN'); const rows = await database(`land_plots?farmer_id=eq.${user.id}&select=*&order=created_at.desc`, {}, token); return ok(rows); } catch (error) { return handleApiError(error); } }
export async function POST(request: Request) { try { const body = await parseJson(request, plotSchema); const { user, token } = await requireRole(request, 'FARMER'); const [plot] = await database<Array<unknown>>('land_plots', { method: 'POST', headers: { Prefer: 'return=representation', 'Content-Type': 'application/json' }, body: JSON.stringify({ farmer_id: user.id, plot_name: body.plotName, total_area_acres: toAcres(body.totalArea, body.areaUnit), display_area: body.totalArea, area_unit: body.areaUnit, latitude: body.latitude, longitude: body.longitude, soil_type: body.soilType ?? 'Unknown', irrigation_type: body.irrigationType ?? 'none' }) }, token); return ok(plot, 201); } catch (error) { return handleApiError(error); } }
