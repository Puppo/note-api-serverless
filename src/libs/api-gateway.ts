import type { Static, TSchema } from "@sinclair/typebox";
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";

type ValidatedAPIGatewayProxyEvent<
  S extends TSchema = never,
  P extends TSchema = never
> = Omit<APIGatewayProxyEvent, "body" | "pathParameters"> & {
  body: Static<S>;
  pathParameters: Static<P>;
};
export type ValidatedEventAPIGatewayProxyEvent<
  S extends TSchema = never,
  P extends TSchema = never
> = Handler<ValidatedAPIGatewayProxyEvent<S, P>, APIGatewayProxyResult>;

export const formatJSONResponse = (
  response: Record<string, unknown>,
  statusCode: number = 200
) => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};
