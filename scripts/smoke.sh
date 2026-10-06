#!/bin/sh
# Checks a deployed site: legacy URLs, the project pages other repositories
# serve under the same domain, and that no source file was published.
# usage: scripts/smoke.sh https://iscor.me
set -u

base=${1:?usage: scripts/smoke.sh <base url>}
root=$(cd "$(dirname "$0")/.." && pwd)
failures=0

# expect <status> <path>: first response only, redirects are not followed.
expect() {
  actual=$(curl -s -o /dev/null --max-time 15 -w '%{http_code}' "$base$2")
  if [ "$actual" = "$1" ]; then
    echo "ok   $actual $2"
  else
    echo "FAIL $actual $2 (expected $1)"
    failures=$((failures + 1))
  fi
}

echo "# Legacy URLs"
legacy=$(node -e '
  for (const { path, status } of JSON.parse(require("node:fs").readFileSync(process.argv[1], "utf8"))) {
    console.log(status, path);
  }
' "$root/tests/legacy-urls.json")
# Fed through a here-document so the loop runs in this shell and can count failures.
while read -r status path; do expect "$status" "$path"; done <<EOF
$legacy
EOF

echo "# Hub pages"
for path in /projects/ /fr/ /fr/projects/ /fr/about/ /blog/ /sitemap-index.xml; do expect 200 "$path"; done

echo "# Project pages served by other repositories"
for path in /js13k-2015/ /js13k-2016/ /js13k-2017/ /frontend-developer/ /crm-quiz-generator/ /css/ /jekyll-landing/ /mdcss-theme-github-iscor/; do
  expect 200 "$path"
done
for path in /resume/ /san-francisco/ /ink/ /job/ /research/ /knov/ /wwwwe-xvi/; do expect 301 "$path"; done

echo "# Source files must not be published"
for path in /package.json /README.md /astro.config.mjs /src/content.config.ts; do expect 404 "$path"; done

echo "# Feed is XML"
case $(curl -s -o /dev/null --max-time 15 -w '%{content_type}' "$base/feed.xml") in
  *xml*) echo "ok   feed.xml content type" ;;
  *) echo "FAIL feed.xml content type"; failures=$((failures + 1)) ;;
esac

echo "# $failures failure(s)"
[ "$failures" -eq 0 ]
