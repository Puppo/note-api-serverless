import type { AWS } from "@serverless/typescript";

import iamRoleStatements from "@architecture/iamRoleStatements";
import resources from "@architecture/resources";
import noteTable from "@architecture/resources/noteTable";
import functions from "@functions/index";

const serverlessConfiguration: AWS = {
  service: "notes-crud-api",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      STAGE: "${self:custom.stage}",
      NOTES_TABLE_NAME: noteTable.table.Properties.TableName,
    },
    iamRoleStatements,
  },
  // import the function via paths
  functions,
  package: { individually: true },
  custom: {
    stage: "${opt:stage, 'dev'}",
    region: "${self:provider.region}",
    "serverless-offline": {
      useChildProcesses: true,
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
      watch: {
        pattern: ["**/**/*.(js|ts)"],
        ignore: ["**/node_modules/**", "**/dist/**"],
      },
    },
    dynamodb: {
      stages: ["dev"],
      start: {
        docker: true,
        port: 8000,
        inMemory: true,
        migrate: true,
        seed: true,
        convertEmptyValues: true,
      },
    },
  },
  resources,
};

module.exports = serverlessConfiguration;
