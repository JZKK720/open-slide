import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { SiteBrand } from '@/components/site-brand';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <SiteBrand labelClassName="tracking-[-0.01em]" />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
