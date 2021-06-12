echo "Build script starts..."

# exit on any failure
set -e

# cd to code root directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${DIR}"

# build React app
echo "Building React app..."
rm -rf build
craco build

# compress built files
echo "Compressing built files..."
gzip --verbose --keep --best build/*.html build/*.json build/*.js
gzip --verbose --keep --best --recursive build/static/css
gzip --verbose --keep --best --recursive build/static/js

# remove unused packages
if [ "${NODE_ENV}" = "production" ]
then
  echo "Pruning all packages except express.js..."
  NON_EXPRESS_PACKAGES=$(node -e "console.log(Object.keys(require('./package.json').dependencies))" | tr -d "[],'\"" | grep -v express | tr -d "\n")
  yarn remove $NON_EXPRESS_PACKAGES
fi
