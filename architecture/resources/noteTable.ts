const table = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    TableName: "${self:service}-${self:custom.stage}-notes",
    BillingMode: "PAY_PER_REQUEST",
    AttributeDefinitions: [
      {
        AttributeName: "Id",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "Id",
        KeyType: "HASH",
      },
    ],
  },
};

const logicalName = "noteTable";

export default { logicalName, table };
