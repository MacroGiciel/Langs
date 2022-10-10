#!/usr/bin/env bash

set -v            # print commands before execution, but don't expand env vars in output
set -o errexit    # always exit on error
set -o pipefail   # honor exit codes when piping
set -o nounset    # fail on unset variables

git clone "https://MacrogicielBOT:$GH_TOKEN@github.com/Macrogiciel/Langs" Langs

cd Langs

npm install

npm start

# bail if nothing changed
if [ "$(git status --porcelain)" = "" ]; then
  echo "no new content found; goodbye!"
  exit
fi

git config user.email macrogiciel@outlook.fr
git config user.name MacrogicielBOT
git add .
git commit -am '🤖✔️_update_versions' --author "MacrogicielBOT <macrogiciel@outlook.fr>"
git pull --rebase
git push origin main