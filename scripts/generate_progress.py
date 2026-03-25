#!/usr/bin/env python3
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
import re

TOTAL_GOAL = 300
HARD_MINIMUM = 50
EASY_CAP_FOR_TOTAL = 50
DIFFICULTIES = ("easy", "medium", "hard")
FILENAME_RE = re.compile(
    r"^(?P<id>\d+)(?:--(?P<slug>[A-Za-z0-9][A-Za-z0-9-]*))?\.(?P<ext>[A-Za-z0-9]+)$"
)


@dataclass(frozen=True)
class SolutionEntry:
    problem_id: int
    difficulty: str
    path: Path


def bar(value: int, total: int, width: int = 24) -> str:
    if total <= 0:
        total = 1
    ratio_value = min(value, total)
    filled = round(width * ratio_value / total)
    if ratio_value > 0:
        filled = max(1, filled)
    return "█" * filled + "░" * (width - filled)


def scan_solutions(root: Path) -> list[SolutionEntry]:
    solutions_root = root / "solutions"
    seen: dict[int, SolutionEntry] = {}
    entries: list[SolutionEntry] = []

    for difficulty in DIFFICULTIES:
        folder = solutions_root / difficulty
        if not folder.exists():
            continue

        for path in sorted(folder.iterdir()):
            if path.name.startswith("."):
                continue
            if not path.is_file():
                raise SystemExit(f"Only files are allowed in {folder}: {path}")

            match = FILENAME_RE.fullmatch(path.name)
            if not match:
                raise SystemExit(
                    f"Invalid filename: {path}. Expected <id>.<ext> or <id>--<slug>.<ext>, "
                    "for example 0015.py or 0015--3sum.py"
                )

            problem_id = int(match.group("id"))

            entry = SolutionEntry(
                problem_id=problem_id,
                difficulty=difficulty,
                path=path.relative_to(root),
            )

            if problem_id in seen:
                first = seen[problem_id]
                raise SystemExit(
                    "Duplicate problem id detected:\n"
                    f"- {first.path}\n"
                    f"- {entry.path}\n"
                    "Keep exactly one solution file per LeetCode problem id."
                )

            seen[problem_id] = entry
            entries.append(entry)

    return entries


def render(entries: list[SolutionEntry]) -> str:
    counts = {difficulty: 0 for difficulty in DIFFICULTIES}
    for entry in entries:
        counts[entry.difficulty] += 1

    easy_raw = counts["easy"]
    easy_counted = min(easy_raw, EASY_CAP_FOR_TOTAL)
    hard_count = counts["hard"]
    counted_total = easy_counted + counts["medium"] + hard_count
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    lines = [
        "# Progress",
        "",
        f"_Last updated: {now}_",
        "",
        "Rules for counting toward the 300 total:",
        "",
        f"- Easy counts only up to **{EASY_CAP_FOR_TOTAL}**",
        "- Medium counts fully",
        "- Hard counts fully",
        "",
        "## Total counted",
        "",
        f"`{bar(counted_total, TOTAL_GOAL)}`",
        "",
        f"**{counted_total} / {TOTAL_GOAL}**",
        "",
        "## Hard minimum",
        "",
        f"`{bar(hard_count, HARD_MINIMUM)}`",
        "",
        f"**{hard_count} / {HARD_MINIMUM}**",
        "",
        "## Breakdown",
        "",
        "| Difficulty | Raw solved | Counted toward total |",
        "|---|---:|---:|",
        f"| Easy | {easy_raw} | {easy_counted} |",
        f"| Medium | {counts['medium']} | {counts['medium']} |",
        f"| Hard | {hard_count} | {hard_count} |",
        f"| **Total** | **{easy_raw + counts['medium'] + hard_count}** | **{counted_total}** |",
        "",
    ]
    return "\n".join(lines)


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent
    entries = scan_solutions(repo_root)
    content = render(entries)
    (repo_root / "PROGRESS.md").write_text(content + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
