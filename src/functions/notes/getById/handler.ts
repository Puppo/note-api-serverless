import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import noteService from "@notes/service";
import schema from "./schema";

const create: ValidatedEventAPIGatewayProxyEvent<
  never,
  typeof schema
> = async event => {
  console.log(event.pathParameters.id);
  const note = await noteService.get(event.pathParameters.id);
  if (!note) {
    return formatJSONResponse(
      {
        message: "Not found",
      },
      404
    );
  }
  return formatJSONResponse({
    note,
  });
};

export const main = middyfy(create);
