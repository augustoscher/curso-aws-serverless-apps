const csvtojson = require('csvtojson');
const { createReadStream } = require('fs');

async function main() {
  const fileStream = createReadStream('./../survey_results_public.csv')
    .pipe(csvtojson())

  let count = 0;
  for await (const line of fileStream) {
    console.log('line', line.toString())
    count++
    if (count > 3) break
  }
}

main();