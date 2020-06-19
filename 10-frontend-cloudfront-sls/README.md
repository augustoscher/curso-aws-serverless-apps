# Steps

## Requirements

- Serverless Framework should be installed
- Use npx create-react-app or install locally create-react-app

## 1 Create React App

```
npx create-react-app app
```

## 2 Create manually serverless.yml file

```
cd ..
sls
```

It'll create an S3 bucket and cloudfront project
bucket:    website-e1og8er
bucketUrl: http://website-e1og8er.s3-website.us-east-1.amazonaws.com
url:       https://d1r7zwy8quwhut.cloudfront.net

Wait some minutes and test URL link

## 3 Make some changes

Enter on project and make some changes.
Run sls again

```
sls
```

## 4 Remove project

```
sls remove
```