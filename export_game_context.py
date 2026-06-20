# export_game_context.py
# Run from your project root:
# python export_game_context.py

from pathlib import Path
from datetime import datetime
import json

ROOT = Path.cwd()
OUTPUT_FILE = ROOT / "game_context_export.md"

EXCLUDED_DIRS = {
    "node_modules",
    "dist",
    "build",
    ".git",
    ".vite",
    ".next",
    "coverage",
    ".turbo",
    ".cache",
}

INCLUDED_EXTENSIONS = {
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json",
    ".css",
    ".scss",
    ".html",
    ".md",
}

PRIORITY_FILES = [
    "package.json",
    "vite.config.ts",
    "vite.config.js",
    "tsconfig.json",
    "src/main.tsx",
    "src/App.tsx",
    "src/App.ts",
    "src/types/index.ts",
    "src/data/words.ts",
    "src/data/upgrades.ts",
    "src/data/events.ts",
    "src/utils/calculations.ts",
    "src/utils/format.ts",
    "src/storage/appStorage.ts",
    "src/pages/GamePage.tsx",
    "src/pages/DictionaryPage.tsx",
    "src/pages/UpgradesPage.tsx",
    "src/pages/StatsPage.tsx",
    "src/components/Workbench.tsx",
    "src/components/WordCard.tsx",
    "src/components/Board.tsx",
    "src/components/BottomNav.tsx",
    "src/game/state.ts",
    "src/game/reducer.ts",
    "src/game/logic.ts",
    "src/game/words.ts",
    "src/game/events.ts",
]

KEYWORDS = [
    "World",
    "Farm",
    "Grow",
    "Seed",
    "Soil",
    "Root",
    "Water",
    "Flow",
    "Rain",
    "Stream",
    "River",
    "Dream",
    "Slumber",
    "Echo",
    "Clock",
    "Understand",
    "And",
    "Oak",
    "Lake",
    "meaning",
    "tap",
    "passive",
    "upgrade",
    "workbench",
    "board",
    "slot",
    "event",
    "stats",
    "Decimal",
]

MAX_FILE_CHARS = 70000


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def should_skip(path: Path) -> bool:
    return any(part in EXCLUDED_DIRS for part in path.parts)


def should_include_file(path: Path) -> bool:
    if path.name == OUTPUT_FILE.name:
        return False
    return path.suffix in INCLUDED_EXTENSIONS


def read_text(path: Path) -> str | None:
    try:
        return path.read_text(encoding="utf-8")
    except Exception:
        try:
            return path.read_text(encoding="utf-8", errors="replace")
        except Exception:
            return None


def collect_files() -> list[Path]:
    files = []

    for path in ROOT.rglob("*"):
        if should_skip(path):
            continue

        if path.is_file() and should_include_file(path):
            files.append(path)

    return sorted(files, key=lambda p: rel(p).lower())


def build_tree(base: Path, prefix: str = "", depth: int = 0, max_depth: int = 5) -> str:
    if depth > max_depth:
        return ""

    try:
        entries = list(base.iterdir())
    except Exception:
        return ""

    entries = [
        entry for entry in entries
        if not should_skip(entry)
        and (entry.is_dir() or should_include_file(entry))
    ]

    entries.sort(key=lambda p: (not p.is_dir(), p.name.lower()))

    lines = []

    for index, entry in enumerate(entries):
        is_last = index == len(entries) - 1
        connector = "└── " if is_last else "├── "
        suffix = "/" if entry.is_dir() else ""
        lines.append(f"{prefix}{connector}{entry.name}{suffix}")

        if entry.is_dir():
            child_prefix = prefix + ("    " if is_last else "│   ")
            subtree = build_tree(entry, child_prefix, depth + 1, max_depth)
            if subtree:
                lines.append(subtree.rstrip())

    return "\n".join(lines) + "\n"


def package_summary() -> str:
    package_path = ROOT / "package.json"

    if not package_path.exists():
        return "No package.json found."

    text = read_text(package_path)

    if not text:
        return "Could not read package.json."

    try:
        data = json.loads(text)
        useful = {
            "name": data.get("name"),
            "version": data.get("version"),
            "scripts": data.get("scripts"),
            "dependencies": data.get("dependencies"),
            "devDependencies": data.get("devDependencies"),
        }
        return json.dumps(useful, indent=2)
    except Exception:
        return text


def find_keyword_matches(files: list[Path], limit: int = 500) -> list[str]:
    matches = []

    lowered_keywords = [keyword.lower() for keyword in KEYWORDS]

    for file in files:
        text = read_text(file)
        if not text:
            continue

        for line_number, line in enumerate(text.splitlines(), start=1):
            lowered = line.lower()

            if any(keyword in lowered for keyword in lowered_keywords):
                cleaned = line.strip()[:220]
                matches.append(f"- {rel(file)}:{line_number} - {cleaned}")

                if len(matches) >= limit:
                    return matches

    return matches


def code_language(path: Path) -> str:
    ext = path.suffix

    if ext in {".ts", ".tsx"}:
        return "ts"
    if ext in {".js", ".jsx"}:
        return "js"
    if ext == ".json":
        return "json"
    if ext in {".css", ".scss"}:
        return "css"
    if ext == ".html":
        return "html"
    if ext == ".md":
        return "md"

    return ""


def file_block(path: Path) -> str:
    text = read_text(path)

    if text is None:
        return f"\n\n## {rel(path)}\n\nCould not read file.\n"

    if len(text) > MAX_FILE_CHARS:
        text = text[:MAX_FILE_CHARS] + "\n\n/* FILE TRUNCATED because it is very large. */\n"

    lang = code_language(path)

    return f"\n\n## {rel(path)}\n\n```{lang}\n{text}\n```\n"


def main() -> None:
    all_files = collect_files()

    priority_paths = [
        ROOT / file_path for file_path in PRIORITY_FILES
        if (ROOT / file_path).exists()
    ]

    priority_set = set(priority_paths)

    src_files = [
        file for file in all_files
        if rel(file).startswith("src/")
        and file not in priority_set
    ]

    test_files = [
        file for file in all_files
        if ".test." in file.name
        or ".spec." in file.name
        or "__tests__" in rel(file)
        or "/tests/" in rel(file)
    ]

    output = []

    output.append("# Approved Text - Game Context Export\n")
    output.append(f"Generated at: {datetime.now().isoformat()}\n")
    output.append(f"Project root: {ROOT}\n")

    output.append("\n# Package summary\n")
    output.append("```json\n")
    output.append(package_summary())
    output.append("\n```\n")

    output.append("\n# Project file tree\n")
    output.append("```txt\n")
    output.append(build_tree(ROOT))
    output.append("\n```\n")

    output.append("\n# Important keyword matches\n")
    matches = find_keyword_matches(all_files)
    if matches:
        output.append("\n".join(matches))
    else:
        output.append("No keyword matches found.")

    output.append("\n\n# Priority files\n")
    for file in priority_paths:
        output.append(file_block(file))

    output.append("\n\n# Source files\n")
    for file in src_files:
        output.append(file_block(file))

    output.append("\n\n# Test files\n")
    for file in test_files:
        output.append(file_block(file))

    OUTPUT_FILE.write_text("".join(output), encoding="utf-8")

    print("Context export complete.")
    print(f"Created: {OUTPUT_FILE}")
    print(f"Files included: {len(priority_paths) + len(src_files) + len(test_files)}")
    print("Upload game_context_export.md here.")


if __name__ == "__main__":
    main()