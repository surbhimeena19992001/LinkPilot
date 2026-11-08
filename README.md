# LinkPilot

A modern web workspace for inspecting public URLs, identifying known providers, and understanding redirect chains.

## MVP
- Responsive dark-mode interface
- HTTP/HTTPS URL validation
- Bounded public redirect-chain inspection
- Provider recognition registry (recognition only; not a bypass mechanism)
- Session-only recent history
- JSON APIs: POST /api/analyze and GET /api/providers
- Initial SSRF protections; not security-certified for unrestricted public proxy use

## Stack
Next.js 15, React 19, TypeScript, Next.js Route Handlers, Zod, Tailwind CSS.

## Local development
Requires Node.js 20.9+.
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Roadmap
1. Core analyzer
2. Rate limiting, abuse controls, network-level egress restrictions and tests
3. Supabase authentication and persistent user history
4. Typed provider adapters for official APIs and authorized integrations
5. Developer API keys, quotas and OpenAPI docs
6. Admin dashboard, provider health and audit logs

Provider recognition does not mean a provider is supported for content unlocking. LinkPilot will not circumvent payment, authentication, or access controls.
