import { Static, TObject } from "@sinclair/typebox";
import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { env } from "process";
import validate from "./validation";
type DynamoDBClient<
  Schema extends TObject,
  Key extends keyof Static<Schema> & string,
  TModel extends Static<Schema> = Static<Schema>
> = {
  get: (id: TModel[Key]) => Promise<TModel | null>;
  find: () => Promise<TModel[]>;
  insert: (model: TModel) => Promise<TModel>;
  update: (id: TModel[Key], model: TModel) => Promise<TModel | null>;
  delete: (id: TModel[Key]) => Promise<TModel | null>;
};

export default function <
  Schema extends TObject,
  Key extends keyof Static<Schema> & string,
  TModel extends Static<Schema> = Static<Schema>
>(
  schema: Schema,
  key: Key,
  tableName: string
): DynamoDBClient<Schema, Key, TModel> {
  const getConnectionOpts = ():
    | AWS.DynamoDB.Types.ClientConfiguration
    | undefined => {
    if (env.IS_OFFLINE) {
      return {
        region: "localhost",
        endpoint: "http://localhost:8000",
        accessKeyId: "DEFAULT_ACCESS_KEY",
        secretAccessKey: "DEFAULT_SECRET",
      };
    }

    return undefined;
  };

  const dynamoClient = new DocumentClient(getConnectionOpts());

  const get = async (id: TModel[Key]): Promise<TModel | null> => {
    const { Item } = await dynamoClient
      .get({
        TableName: tableName,
        Key: {
          Id: id,
        },
      })
      .promise();

    if (!Item) return null;

    validate<Schema, TModel>(schema, Item);
    return Item;
  };

  const find = async (): Promise<TModel[]> => {
    console.log("find started at", new Date().toISOString());
    const { Items } = await dynamoClient
      .scan({
        TableName: tableName,
      })
      .promise();

    console.log(Items);

    if (!Items) return [];

    return Items.map(item => {
      validate<Schema, TModel>(schema, item);
      return item;
    });
  };

  const remove = async (id: TModel[Key]): Promise<TModel | null> => {
    const item = await get(id);
    if (!item) return null;

    await dynamoClient
      .delete({
        TableName: tableName,
        Key: {
          Id: id,
        },
      })
      .promise();
    return item;
  };

  const insert = async (item: TModel): Promise<TModel> => {
    await dynamoClient
      .put({
        TableName: tableName,
        Item: item,
        ConditionExpression: "attribute_not_exists(Id)",
      })
      .promise();

    return item;
  };

  const update = async (
    id: TModel[Key],
    item: TModel
  ): Promise<TModel | null> => {
    const fields = Object.entries(item).filter(
      ([fieldKey]) => fieldKey !== key
    );
    let UpdateExpression = fields
      .reduce<string>((acc, [fieldKey]) => {
        return `${acc} #${fieldKey} = :${fieldKey},`;
      }, "set")
      .slice(0, -1);

    let ExpressionAttributeNames = fields.reduce<Record<string, string>>(
      (acc, [fieldKey]) => {
        acc[`#${fieldKey}`] = fieldKey;
        return acc;
      },
      {}
    );

    let ExpressionAttributeValues = fields.reduce<Record<string, unknown>>(
      (acc, [fieldKey, value]) => {
        acc[`:${fieldKey}`] = value;
        return acc;
      },
      {}
    );

    await dynamoClient
      .update({
        TableName: tableName,
        Key: { Id: id },
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
      })
      .promise();

    return get(id);
  };

  return { get, find, insert, update, delete: remove };
}
