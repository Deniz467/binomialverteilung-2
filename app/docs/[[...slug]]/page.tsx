import {getPageImage, source} from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/notebook/page';
import {notFound} from 'next/navigation';
import {getMDXComponents} from '@/mdx-components';
import type {Metadata} from 'next';
import {createRelativeLink} from 'fumadocs-ui/mdx';
import {NotFound} from "@/components/not-found";
import {getSuggestions} from "@/app/docs/[[...slug]]/suggestions";
import {LLMCopyButton, ViewOptions} from "@/components/page-actions";

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    return <NotFound getSuggestions={() => getSuggestions(params.slug?.join(" ") ?? "")}/>;
  }

  const MDX = page.data.body;

  return (
      <DocsPage toc={page.data.toc} full={page.data.full} tableOfContent={{style: "clerk"}}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <DocsTitle className="flex items-end gap-2">{page.data.title}</DocsTitle>
          {page.data.toc.length > 0 && (
              <div className="flex items-center gap-2">
                <LLMCopyButton markdownUrl={`${page.url}.mdx`}/>
                <ViewOptions
                    markdownUrl={`${page.url}.mdx`}
                    githubUrl={`https://github.com/Deniz467/binomialverteilung-2/blob/master/content/docs/${page.path}`}
                />
              </div>
          )}
        </div>
        <DocsDescription>
          {page.data.description}

        </DocsDescription>

        <DocsBody>
          <MDX
              components={getMDXComponents({
                // this allows you to link to other pages with relative file paths
                a: createRelativeLink(source, page),
              })}
          />
        </DocsBody>
      </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
    props: PageProps<'/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
