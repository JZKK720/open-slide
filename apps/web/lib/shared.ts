function normalizeSiteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  if (/^(localhost|127(?:\.\d{1,3}){3})(:\d+)?$/i.test(value)) return `http://${value}`;
  return `https://${value}`;
}

function resolveSiteUrl(): string {
  const explicitSiteUrl = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
  if (explicitSiteUrl) return normalizeSiteUrl(explicitSiteUrl);
  return `http://localhost:${process.env.PORT ?? '3000'}`;
}

export const brandName = 'CubeCloud';
export const productName = 'open-slide';
export const appName = 'CubeCloud Open Slide';
export const siteLabel = 'CubeCloud · open-slide';
export const siteDescription =
  "CubeCloud's branded open-slide build for slides as React code, authored by AI agents.";
export const siteUrl = resolveSiteUrl();
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: 'JZKK720',
  repo: 'open-slide',
  branch: 'main',
};
