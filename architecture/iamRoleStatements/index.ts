import { AWS } from "@serverless/typescript";
import noteTable from "../resources/noteTable";

const iamRoleStatement: AWS["provider"]["iamRoleStatements"] = [
  {
    Effect: "Allow",
    Action: ["dynamodb:PutItem", "dynamodb:DeleteItem", "dynamodb:Scan"],
    Resource: {
      "Fn::GetAtt": [noteTable.logicalName, "Arn"],
    },
  },
];

export default iamRoleStatement;
