# LeetCode 300 challenge

Minimal repo template for tracking a 300-problem challenge from a single source of truth: the solution files.

## Convention

Use:

- `solutions/easy/<id>.<ext>`
- `solutions/medium/<id>.<ext>`
- `solutions/hard/<id>.<ext>`

Or, if you want the filename to be easier to map back to the URL:

- `solutions/easy/<id>--<title-slug>.<ext>`
- `solutions/medium/<id>--<title-slug>.<ext>`
- `solutions/hard/<id>--<title-slug>.<ext>`

Examples:

- `solutions/easy/0001.py`
- `solutions/easy/0001--two-sum.py`
- `solutions/medium/0015--3sum.cpp`
- `solutions/hard/0023--merge-k-sorted-lists.java`

Use the numeric LeetCode problem number as the canonical key. The script also accepts an optional slug after the id for readability.

## Rules

- one solved problem = one file
- difficulty comes from the parent folder
- no separate CSV to keep in sync
- no duplicate ids across the repo, even with different languages or slugs
- total target = **300**
- easy contributes at most **50** toward the total
- hard minimum = **50**

## Output

On every push, GitHub Actions regenerates `PROGRESS.md` with:

- total counted out of 300
- hard solved out of 50
- two progress bars
- a breakdown table showing raw solved vs counted toward total

## Setup

1. Create a new repo and copy these files in.
2. Push once.
3. Add one solution file per solve, in the correct difficulty folder.
4. If the workflow cannot push `PROGRESS.md`, enable:
   `Settings -> Actions -> General -> Workflow permissions -> Read and write`
