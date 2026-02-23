/**
 * generate-projects.js
 * Run by GitHub Actions on every push to main.
 * Scans all root-level folders that contain a project.json
 * and aggregates them into /projects.json.
 *
 * Usage (local): node script/generate-projects.js
 */

const fs = require('fs');
const path = require('path');

const REPO_OWNER = 'Spinotek-Organization';
const REPO_NAME = 'prototype-spinotek';
const BRANCH = 'main';

// Scan the repo root - skip known system folders
const SCAN_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(__dirname, '..', 'projects.json');

// Folders at repo root that are NOT projects
const EXCLUDED = new Set([
  'script', 'asset', 'assets', '.github', '.git',
  'node_modules', 'projects', 'dist', 'public',
]);

const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}`;

function buildImageUrl(slug) {
  return `${RAW_BASE}/${slug}/card.png`;
}

function readProjects() {
  if (!fs.existsSync(SCAN_DIR)) {
    console.warn('[generate-projects] Scan directory not found.');
    return [];
  }

  // Get all root-level directories, skip excluded and non-directories
  const slugs = fs.readdirSync(SCAN_DIR).filter(name => {
    if (EXCLUDED.has(name)) return false;                // skip system folders
    if (name.startsWith('.')) return false;              // skip hidden folders
    const full = path.join(SCAN_DIR, name);
    if (!fs.statSync(full).isDirectory()) return false;  // skip files
    const jsonPath = path.join(full, 'project.json');
    return fs.existsSync(jsonPath);                      // only if has project.json
  });

  const projects = [];

  for (const slug of slugs) {
    const jsonPath = path.join(SCAN_DIR, slug, 'project.json');

    if (!fs.existsSync(jsonPath)) {
      console.warn(`[generate-projects] Skipping "${slug}" - project.json not found.`);
      continue;
    }

    let data;
    try {
      data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    } catch (err) {
      console.error(`[generate-projects] Failed to parse "${slug}/project.json": ${err.message}`);
      continue;
    }

    // Optional fields with sensible defaults
    const name = data.name || slug;
    const description = data.description || '';
    const category = data.category || 'Web App';
    const status = data.status || 'IN DEVELOPMENT';

    if (!data.name) {
      console.warn(`[generate-projects] "${slug}" has no name - using folder name.`);
    }
    if (!data.description) {
      console.warn(`[generate-projects] "${slug}" has no description - leaving empty.`);
    }
    if (!data.category) {
      console.warn(`[generate-projects] "${slug}" has no category - defaulting to "Web App".`);
    }
    if (!data.status) {
      console.warn(`[generate-projects] "${slug}" has no status - defaulting to "IN DEVELOPMENT".`);
    }

    // Check if card.png exists locally (for local runs). In Actions it always passes.
    const cardPath = path.join(SCAN_DIR, slug, 'card.png');
    const hasCard = fs.existsSync(cardPath);
    if (!hasCard) {
      console.warn(`[generate-projects] "${slug}" has no card.png - site will use fallback.`);
    }

    projects.push({
      slug,
      name,
      description,
      category,           // e.g. "Web App" | "Mobile" | "Dashboard"
      status,             // e.g. "COMPLETED" | "IN DEVELOPMENT" | "LIVE DEMO"
      tech: data.tech || [],             // e.g. ["javascript", "laravel", "tailwindcss"]
      icon: data.icon || 'rocket',       // fallback if no icon
      demo_url: data.demo_url || null,
      repo_url: data.repo_url || null,
      image: buildImageUrl(slug),        // always set; frontend will fallback if 404
      added_at: data.added_at || new Date().toISOString().slice(0, 10),
    });
  }

  // Sort newest first
  projects.sort((a, b) => b.added_at.localeCompare(a.added_at));

  return projects;
}

const projects = readProjects();
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projects, null, 2), 'utf-8');

console.log(`[generate-projects] Generated projects.json with ${projects.length} project(s).`);
