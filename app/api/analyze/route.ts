import {NextRequest,NextResponse} from "next/server";
import {z} from "zod";
import {detectProvider} from "@/lib/providers";
import {inspectRedirects,normalizePublicUrl} from "@/lib/safe-url";
export const runtime="nodejs";
export const dynamic="force-dynamic";
const schema=z.object({url:z.string().trim().min(1).max(2048)});
export async function POST(request:NextRequest){const started=Date.now();try{const body=schema.parse(await request.json());const input=normalizePublicUrl(body.url);const result=await inspectRedirects(input.toString());return NextResponse.json({inputUrl:input.toString(),finalUrl:result.finalUrl,provider:detectProvider(input.hostname),redirects:result.redirects,redirectCount:result.redirectCount,elapsedMs:Date.now()-started,status:result.status,checkedAt:new Date().toISOString()},{headers:{"Cache-Control":"no-store"}});}catch(error){const message=error instanceof z.ZodError?"Please provide a valid URL.":error instanceof Error?error.message:"Unable to inspect this URL.";return NextResponse.json({error:message},{status:400,headers:{"Cache-Control":"no-store"}});}}