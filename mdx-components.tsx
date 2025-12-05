import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {Callout as FDCallout} from "fumadocs-ui/components/callout";
import React from "react";
import {cn} from "@/lib/cn";
import {Mermaid} from "@/components/mdx/mermaid";

function Callout({className, ...props}: React.ComponentProps<typeof FDCallout>) {
  return (
      <FDCallout
          {...props}
          className={cn("bg-surface shadow-surface text-surface-foreground", className)}
      />
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Mermaid,
    ...components,
    Callout,
  };
}
