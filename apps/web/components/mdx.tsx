import type { ImageZoomProps } from 'fumadocs-ui/components/image-zoom';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';

function toImageZoomProps(props: ComponentProps<'img'>): ImageZoomProps | null {
  if (typeof props.src !== 'string') return null;

  return {
    ...props,
    src: props.src,
    alt: props.alt ?? '',
  };
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: (props) => {
      const imageProps = toImageZoomProps(props);
      return imageProps ? <ImageZoom {...imageProps} /> : null;
    },
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
