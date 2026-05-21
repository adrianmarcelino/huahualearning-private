#!/bin/bash
# Deploy huahualearning-private to Cloudflare Pages.
# Usage:  bash deploy.sh [branch]     (branch defaults to "v6-clean")
# NOTE: the Cloudflare Pages PRODUCTION branch for this project is "v6-clean"
# (verified via `wrangler pages deployment list`). Deploying any other branch
# only creates a Preview deployment — private.huahualearning.com won't update.
set -e
cd "$(dirname "$0")"
BRANCH="${1:-v6-clean}"

# Node needs the machine's trusted CA roots to get past the corporate proxy.
if [ ! -f /tmp/cacerts.pem ]; then
  security find-certificate -a -p \
    /Library/Keychains/System.keychain \
    /System/Library/Keychains/SystemRootCertificates.keychain > /tmp/cacerts.pem
fi
export NODE_EXTRA_CA_CERTS=/tmp/cacerts.pem
export CLOUDFLARE_API_TOKEN="$(grep '^CLOUDFLARE_API_TOKEN=' .env | cut -d= -f2)"

echo "Deploying .vercel/output/static -> project huahualearning-private (branch: $BRANCH)"
npx wrangler pages deploy .vercel/output/static \
  --project-name=huahualearning-private \
  --branch="$BRANCH" \
  --commit-dirty=true
