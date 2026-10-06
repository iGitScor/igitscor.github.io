import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

// Old URLs keep answering with a client-side redirect, as Jekyll's
// redirect_from did. Each one is emitted as `<path>.html`, which GitHub Pages
// also serves at `/<path>`. Paths may be nested, like the dated 2016 ones.
const legacyPages: Record<string, string> = {
  about: '/about/',
  projects: '/projects/',
  tags: '/blog/',
  categories: '/blog/',
};

export const getStaticPaths = (async () => {
  const entries = await getCollection('archive');
  const fromEntries = entries.flatMap(({ data }) =>
    data.redirectFrom.map((from) => ({
      params: { stub: from.slice(1, -'.html'.length) },
      props: { target: data.permalink },
    })),
  );
  const fromPages = Object.entries(legacyPages).map(([stub, target]) => ({
    params: { stub },
    props: { target },
  }));
  return [...fromEntries, ...fromPages];
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const target = props.target as string;
  const canonical = new URL(target, site.url).href;
  const html = `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${canonical}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${target}">
<a href="${target}">Click here if you are not redirected.</a>
</html>
`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
