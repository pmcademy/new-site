const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "pmcademy-visuals-"));
try {
  const directory = path.join(root, "src/lib/course");
  for (const file of fs.readdirSync(directory).filter(file => file.endsWith(".ts"))) {
    const compiled = ts.transpileModule(fs.readFileSync(path.join(directory, file), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } });
    fs.writeFileSync(path.join(temporary, file.replace(/\.ts$/, ".js")), compiled.outputText);
  }
  const { levels } = require(path.join(temporary, "index.js"));
  const { lessonVisuals } = require(path.join(temporary, "lesson-visuals.js"));
  const diagramSource = fs.readFileSync(path.join(root, "src/components/course/diagrams.tsx"), "utf8");
  const registry = diagramSource.split("const REGISTRY:")[1].split("};")[0];
  const report = [], errors = [], used = new Set();
  for (const level of levels) for (const chapter of level.chapters) for (const lesson of chapter.lessons) {
    const key = `${level.slug}/${lesson.slug}`;
    const visual = lessonVisuals[key];
    let decision;
    if (visual) {
      used.add(key);
      if (!visual.title || !visual.caption || visual.nodes.length < 3 || visual.nodes.length > 4 || visual.nodes.some(node => !node.label || !node.detail)) errors.push(`Incomplete visual: ${key}`);
      decision = lesson.explain.diagram ? "Replace broad diagram" : "Add missing visual";
    } else {
      const id = lesson.explain.diagram;
      if (!id || !registry.includes(`${id.includes("-") ? '"' + id + '"' : id}:`)) errors.push(`No registered visual: ${key}`);
      decision = "Retain relevant diagram";
    }
    if (!lesson.explain || !lesson.ai || !lesson.build) errors.push(`Required teaching section missing: ${key}`);
    report.push({ level: level.n, key, title: lesson.title, decision, visual: visual ? `${visual.kind}: ${visual.title}` : lesson.explain.diagram, reason: visual ? visual.caption : (lesson.explain.caption || lesson.explain.title) });
  }
  for (const key of Object.keys(lessonVisuals)) if (!used.has(key)) errors.push(`Orphan visual: ${key}`);
  if (errors.length) throw new Error(errors.join("\n"));
  const counts = report.reduce((counts, row) => { counts[row.decision] = (counts[row.decision] || 0) + 1; return counts; }, {});
  console.log(JSON.stringify({ lessons: report.length, ...counts, missing: 0, orphaned: 0 }, null, 2));
  if (process.argv.includes("--write-audit")) {
    const escape = value => String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
    let text = "# Lesson visual review, update 06\n\nReviewed the concept, explanation and required artefact for all " + report.length + " lessons against the current curriculum. New visual copy is keyed explicitly by level and slug; no keyword guessing runs at render time. Teaching prose, exercises, assessment, sources and progression remain intact.\n\n";
    text += Object.entries(counts).map(([key,value]) => `- ${key}: ${value}`).join("\n") + "\n\nThe 103 new illustrations use 15 visual layouts, with lesson-specific labels and captions. Existing diagrams are retained when their mechanism and caption fit. Budget panels and cohort examples are schematic, not new claims about Sona performance. Mobile illustrations use a separate stacked layout; existing wide diagrams scroll within their own frame.\n\n";
    for (const level of levels) {
      text += `## Level ${level.n}: ${level.rank}\n\n| Lesson | Decision | Visual | Reason / teaching connection |\n|---|---|---|---|\n`;
      text += report.filter(row => row.level === level.n).map(row => `| ${escape(row.title)} (${row.key}) | ${row.decision} | ${escape(row.visual)} | ${escape(row.reason)} |`).join("\n") + "\n\n";
    }
    text += "## Maintenance\n\nRun `node scripts/check-lesson-visuals.cjs` after adding or renaming lessons. Run with `--write-audit` to regenerate this table. The check fails on missing diagrams, incomplete visual data, orphaned mappings or missing required teaching sections. A passing check verifies coverage, not editorial accuracy: review the labels and caption against the actual lesson before adding a mapping.\n";
    fs.mkdirSync(path.join(root, "docs"), { recursive: true });
    fs.writeFileSync(path.join(root, "docs/LESSON-VISUAL-AUDIT.md"), text);
  }
} finally { fs.rmSync(temporary, { recursive: true, force: true }); }
