import { NextResponse } from 'next/server';
import { ZodError, type ZodType } from 'zod';

export type ApiFailure = { error: { code: string; message: string; details?: unknown } };

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}

export function fail(code: string, message: string, status = 400, details?: unknown) {
  const body: ApiFailure = { error: { code, message, ...(details ? { details } : {}) } };
  return NextResponse.json(body, { status });
}

export async function parseJson<T>(request: Request, schema: ZodType<T>): Promise<T> {
  try {
    return schema.parse(await request.json());
  } catch (error) {
    if (error instanceof ZodError) throw new ApiValidationError(error.flatten());
    throw new ApiValidationError({ formErrors: ['Request body must be valid JSON'], fieldErrors: {} });
  }
}

export class ApiValidationError extends Error {
  constructor(public readonly details: unknown) {
    super('Invalid request data');
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiValidationError) return fail('VALIDATION_ERROR', error.message, 422, error.details);
  if (error instanceof SupabaseConfigError) return fail('SERVICE_UNAVAILABLE', error.message, 503);
  if (error instanceof SupabaseRequestError) return fail(error.code, error.message, error.status);
  console.error('Unhandled API error', error);
  return fail('INTERNAL_ERROR', 'An unexpected server error occurred.', 500);
}

export class SupabaseConfigError extends Error {}
export class SupabaseRequestError extends Error {
  constructor(public readonly status: number, public readonly code: string, message: string) {
    super(message);
  }
}
