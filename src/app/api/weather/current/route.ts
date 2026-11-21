import { z } from 'zod';
import { handleApiError, ok } from '@/lib/api';
const query = z.object({ lat: z.coerce.number().min(-90).max(90), lng: z.coerce.number().min(-180).max(180) });
export async function GET(request: Request) {
  try {
    const input = query.parse(Object.fromEntries(new URL(request.url).searchParams));
    // A provider adapter belongs here. No IMD endpoint is assumed or scraped without authorized access.
    return ok({ status: 'unavailable', provider: null, location: input, lastUpdated: null, message: 'Live weather is not configured. Add an authorized weather provider before using this endpoint for farm decisions.' }, 503);
  } catch (error) { return handleApiError(error); }
}
