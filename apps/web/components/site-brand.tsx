import Image from 'next/image';
import { siteLabel } from '@/lib/shared';

type SiteBrandProps = {
  className?: string;
  labelClassName?: string;
  logoClassName?: string;
};

export function SiteBrand({
  className = 'flex items-center gap-3',
  labelClassName,
  logoClassName = 'h-6 w-6 rounded-[4px]',
}: SiteBrandProps) {
  return (
    <span className={className}>
      <Image
        src="/brand/cubecloud-mark.svg"
        alt=""
        aria-hidden
        width={24}
        height={24}
        className={logoClassName}
      />
      <span className={labelClassName}>{siteLabel}</span>
    </span>
  );
}
