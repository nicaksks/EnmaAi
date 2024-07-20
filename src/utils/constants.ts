export const DOMAIN: string = Bun.env.DOMAIN || `http://localhost:${Bun.env.PORT || 3000}`;
export const CDN: string = Bun.env.CDN || DOMAIN;