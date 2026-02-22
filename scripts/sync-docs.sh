#!/bin/bash

# Sync documentation from zequent-framework-docs into Next.js page structure.
# Converts raw .md files into routable page.mdx files with proper JS exports
# that the MDX pipeline expects (metadata + sections are handled by rehype).
#
# Usage: ./scripts/sync-docs.sh

set -e

DOCS_REPO="https://github.com/Zequent/zequent-framework-docs.git"
DOCS_BRANCH="main"
TEMP_DIR=".docs-temp"
TARGET_DIR="src/app/docs/sdk"

echo "Syncing documentation..."

# Clone or update
if [ -d "$TEMP_DIR" ]; then
    cd "$TEMP_DIR" && git pull origin "$DOCS_BRANCH" && cd ..
else
    git clone --depth 1 --branch "$DOCS_BRANCH" "$DOCS_REPO" "$TEMP_DIR"
fi

# Clean only synced
rm -rf "$TARGET_DIR/client"
rm -rf "$TARGET_DIR/edge"
mkdir -p "$TARGET_DIR"

# convert_to_page <source_file> <target_directory>

convert_to_page() {
    local src="$1"
    local dest_dir="$2"

    mkdir -p "$dest_dir"

    local title=""
    if head -n 1 "$src" | grep -q "^---$"; then
        title=$(sed -n '/^---$/,/^---$/p' "$src" | grep "^title:" | sed 's/^title:\s*//')
    fi
    if [ -z "$title" ]; then
        title=$(grep -m 1 "^# " "$src" | sed 's/^# //')
    fi
    if [ -z "$title" ]; then
        title=$(basename "$src" .md | sed 's/-/ /g')
    fi

    {
        cat <<EXPORT
export const metadata = {
  title: '$(echo "$title" | sed "s/'/\\\\'/g")',
}

EXPORT

        if head -n 1 "$src" | grep -q "^---$"; then
            sed '1{/^---$/d}' "$src" | sed '1,/^---$/d'
        else
            cat "$src"
        fi
    } > "$dest_dir/page.mdx"

    echo "  $(basename "$src") -> $dest_dir/page.mdx"
}


slugify() {
    local name="$1"
    name=$(echo "$name" | sed 's/\.[^.]*$//')
    name=$(echo "$name" | sed 's/^edge-sdk-//')
    name=$(echo "$name" | tr '[:upper:]' '[:lower:]')
    name=$(echo "$name" | sed 's/_/-/g')
    name=$(echo "$name" | sed 's/_final$//')
    echo "$name"
}

# Client sdk docs
echo "Processing client SDK..."
if [ -d "$TEMP_DIR/client-sdk" ]; then
    for file in "$TEMP_DIR"/client-sdk/*.md; do
        [ -f "$file" ] || continue
        slug=$(slugify "$(basename "$file")")
        convert_to_page "$file" "$TARGET_DIR/client/$slug"
    done
fi

# Edge sdk docs
echo "Processing edge SDK..."
if [ -d "$TEMP_DIR/edge-sdk" ]; then
    for file in "$TEMP_DIR"/edge-sdk/*.md; do
        [ -f "$file" ] || continue
        slug=$(slugify "$(basename "$file")")
        convert_to_page "$file" "$TARGET_DIR/edge/$slug"
    done
fi

# Setup guide
if [ -f "$TEMP_DIR/SETUP.md" ]; then
    echo "Processing setup guide..."
    convert_to_page "$TEMP_DIR/SETUP.md" "$TARGET_DIR/setup"
fi

# Cleanup
rm -rf "$TEMP_DIR"

echo "Done. Docs synced to $TARGET_DIR/"
echo ""
echo "Routes created:"
find "$TARGET_DIR" -name "page.mdx" | sort | while read f; do
    route=$(echo "$f" | sed 's|src/app||' | sed 's|/page\.mdx$||')
    echo "  $route"
done
