// Copies the public part of the resume into the hub, so the build needs no
// network and never sees the private fields (phone, email, references).
// usage: node scripts/sync-resume.mjs [path to the resume repository]
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = resolve(root, process.argv[2] ?? '../resume');

const pick = (object, keys) => Object.fromEntries(keys.map((key) => [key, object[key] ?? null]));

for (const locale of ['en', 'fr']) {
  const resume = JSON.parse(readFileSync(join(source, 'src', locale, 'resume.json'), 'utf8'));
  const snapshot = {
    basics: {
      ...pick(resume.basics, ['name', 'label', 'summary']),
      profiles: resume.basics.profiles.map((profile) => pick(profile, ['network', 'url'])),
    },
    work: resume.work.map((job) => pick(job, ['name', 'position', 'startDate', 'endDate', 'location', 'summary'])),
  };
  const target = join(root, 'src', 'data', `resume.${locale}.json`);
  writeFileSync(target, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`${target}: ${snapshot.work.length} positions`);
}
