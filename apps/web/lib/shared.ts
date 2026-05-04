const DEFAULT_SITE_URL = 'https://open-slide.dev';

export const brandName = 'CubeCloud';
export const productName = 'open-slide';
export const appName = 'CubeCloud Open Slide';
export const siteLabel = 'CubeCloud · open-slide';
export const siteDescription =
  "CubeCloud's branded open-slide build for slides as React code, authored by AI agents.";
export const siteUrl = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: 'JZKK720',
  repo: 'open-slide',
  branch: 'main',
};
