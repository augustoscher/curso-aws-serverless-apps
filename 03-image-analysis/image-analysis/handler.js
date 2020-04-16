'use strict';

const { promises: { readFile } } = require('fs');

class Handler {
  constructor({ rekoSvc, translatorSvc }){
    this.rekoSvc = rekoSvc;
    this.translatorSvc = translatorSvc;
  }

  async detectImageLabels(buffer) {
    const result = await this.rekoSvc.detectLabels({
      Image: {
        Bytes: buffer
      }
    }).promise();

    const workingItems = result.Labels.filter(({ Confidence }) => Confidence > 80)
    const names = workingItems.map(({ Name }) => Name ).join(' and ');
    return { names, workingItems };
  }

  async translateText(text) {
    const params = {
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'pt',
      Text: text
    }

    return await this.translatorSvc.translateText(params).promise();
  }

  async main(event) {
    try {
      const imgBuffer = await readFile('./images/teste.jpeg');
      console.log('Detecting labels...');
      const { names, workingItems } = await this.detectImageLabels(imgBuffer);

      console.log('Translate to portuguese...');
      const translatedText = await this.translateText(names);

      console.log('Handling final object...')
      return {
        statusCode: 200,
        body: 'Hi'
      }
    } catch (error) {
      console.log('Error: ', error.stack);
      return {
        statusCode: 500,
        body: 'Internal Server Error'
      }
    }
  }
}

const aws = require('aws-sdk');
const reko = new aws.Rekognition();
const translator = new aws.Translate();

const handler = new Handler({
  rekoSvc: reko,
  translatorSvc: translator
});

module.exports.main = handler.main.bind(handler)
