import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import noteService from "@notes/service";
import schema from "./schema";

const create: ValidatedEventAPIGatewayProxyEvent<
  never,
  typeof schema
> = async event => {
  const deletedNote = await noteService.delete(event.pathParameters.id);
  if (!deletedNote) {
    return formatJSONResponse(
      {
        message: "Not found",
      },
      404
    );
  }
  return formatJSONResponse({
    note: deletedNote,
  });
};

export const main = middyfy(create);
