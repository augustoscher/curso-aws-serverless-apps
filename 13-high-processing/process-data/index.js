const AWS = require('aws-sdk');
const csvtojson = require("csvtojson");
const XLSXChart = require("xlsx-chart");
const { createReadStream, promises: { readFile } } = require("fs");
const { Transform, Writable, pipeline } = require("stream");
const { promisify } = require('util');
const assert = require('assert');

const chart = new XLSXChart();
const S3 = new AWS.S3();

const pipelineAsync = promisify(pipeline); //pipeline usa callbacks. Convertendo para promise para usar Await.

const processDataStream = (salaryTypes, finalData) => new Writable({
  write: (chunk, encoding, cb) => {
    const item = JSON.parse(chunk);
    console.log('Respondent: ', item.Respondent);
    if (item.SalaryType === "NA") {
      return cb();
    }

    finalData.titles.push(item.SalaryType);
    finalData.fields.push(item.Country);
    
    //agregação de salarios
    if (!salaryTypes[item.SalaryType]) {
      //na primeira vez, incializa o objeto para a agregação
      /*
      {
        Monthly: {},
        Annuals: {},
        Weekly: {}
      }
      */
      salaryTypes[item.SalaryType] = {}
    }

    if (!salaryTypes[item.SalaryType][item.Country]) {
      /*
      {
        Monthly: {
          Brazil: 1,
        },
        Annuals: {
          Brasil: 2
        },
        Weekly: {
          USA: 1
        }
      }
      */
      
      salaryTypes[item.SalaryType][item.Country] = 1
      //só modificamos os objetos passados por referência.
      return cb();
    }

    //Incrementa os valores por país e tipo de salário
    salaryTypes[item.SalaryType][item.Country] += 1
    
    cb();
  }
});

const mapStream = elapsedBytes => {
  //Map das propriedades que precisamos no objeto
  return new Transform({
    objectMode: true,
    transform: (chunk, encoding, cb) => {
      //Arquivo tem 190mb, mas no final, serão processados mais bytes 
      //pelo fato de transformarmos em json
      elapsedBytes.count += chunk.length;
      const item = JSON.parse(chunk);
      const data = JSON.stringify({
        Country: item.Country,
        SalaryType: item.SalaryType,
        Respondent: item.Respondent
      });

      return cb(null, data)
    }
  })
}

const generateFile = async (finalData, salaryTypes) => {
  const opts = {
    file: `chart-${new Date().getTime()}.xlsx`,
    chart: "column",
    //set transforma um array em itens unicos
    titles: [... new Set(finalData.titles)].sort(),
    fields: [... new Set(finalData.fields)].sort(),
    data: salaryTypes
  }
  const writeFileAsync = promisify(chart.writeFile.bind(chart));
  await writeFileAsync(opts);

  return {
    fileName: opts.file
  }
}

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes"

  const key = 1024
  const decimalsValue = decimals < 0 ? 0 : decimals
  const sizes = [ "Bytes", "KB", "MB", "GB", "TB", "PB" ];

  const unities = Math.floor(Math.log(bytes) / Math.log(key));
  return parseFloat((bytes / Math.pow(key, unities)).toFixed(decimalsValue)) + " " + sizes[unities]
}

async function main() {

  const reportsFolder = process.env.BUCKET_REPORTS;
  assert.ok(reportsFolder, 'env BUCKET_REPORTS is required.');
  const surveyFile = process.env.SURVEY_FILE;
  assert.ok(surveyFile, 'env SURVEY_FILE is required.');
  
  const data = JSON.parse(surveyFile);

  console.log('starting at..', new Date().toISOString);
  console.time('elapsed time');

  const elapsedBytes = { count: 0 }
  const refSalaryTypes = {}
  const refFinalData = {
    fields: [],
    titles: [],
  }

  //usa o pipelineAsync passando todas as streams que serão executadas.
  //executa em partes e manda para o próximo processo do pipeline
  //ou seja, pega um pedaço do arquivo e transforma para json
  
  //readStream de arquivo local
  // const fileStream = createReadStream("./../survey_results_public.csv");

  console.log('downloading file on demand...');
  const fileStream = S3.getObject(data).createReadStream();

  await pipelineAsync(
    fileStream,
    csvtojson(),
    mapStream(elapsedBytes),
    processDataStream(refSalaryTypes, refFinalData)
  );
  
  // console.log('salaryTypes: ', refSalaryTypes);
  const { fileName } = await generateFile(refFinalData, refSalaryTypes);
  console.log('filename: ', fileName);
  console.log('elapsedBytes: ', formatBytes(elapsedBytes.count));

  console.log('uploading results to s3 bucket...');
  const s3Response = await S3.putObject({
    Body: await readFile(fileName),
    Key: fileName,
    Bucket: `${data.Bucket}/${reportsFolder}`
  }).promise();

  console.timeEnd('elapsed time');
  console.log('s3Response: ', JSON.stringify(s3Response));
  console.log('finished at...', new Date().toISOString());
}

// process.env.SURVEY_FILE = JSON.stringify({
//   Bucket: 'surveys-augustoscher-001',
//   Key: 'survey_results_public.csv'
// });

// process.env.BUCKET_REPORTS = 'reports'

main();
