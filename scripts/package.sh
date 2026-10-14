#!/usr/bin/env bash
# Builds a Chrome Web Store upload zip: tab-auto-grouper-<version>.zip
set -euo pipefail
cd "$(dirname "$0")/.."

version=$(python3 -c 'import json; print(json.load(open("manifest.json"))["version"])')
out="tab-auto-grouper-${version}.zip"

rm -f "$out"
zip -q -X "$out" manifest.json background.js icons/16.png icons/32.png icons/48.png icons/128.png
echo "$out"
