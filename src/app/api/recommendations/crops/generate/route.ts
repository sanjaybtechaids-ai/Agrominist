import { z } from 'zod';
import { handleApiError, ok, parseJson } from '@/lib/api';
import { requireRole } from '@/lib/supabase';
import { recommendCrops } from '@/lib/recommendations';
const schema = z.object({ soilType: z.string().min(1), irrigationType: z.string().min(1), areaAcres: z.number().positive().max(100000) });
export async function POST(request: Request) { try { await requireRole(request, 'FARMER'); const input = await parseJson(request, schema); return ok({ recommendations: recommendCrops(input), disclaimer: 'These are provisional planning estimates. Confirm local agronomic guidance, soil tests, and current market prices before planting.' }); } catch (error) { return handleApiError(error); } }
