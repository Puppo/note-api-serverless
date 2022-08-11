import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import noteService from "@notes/service";

import { GetNoteParameterSchema, UpdateNoteSchema } from "./schema";

const create: ValidatedEventAPIGatewayProxyEvent<
  typeof UpdateNoteSchema,
  typeof GetNoteParameterSchema
> = async event => {
  const updatedNote = await noteService.update({
    ...event.body,
    id: event.pathParameters.id,
  });
  if (!updatedNote) {
    return formatJSONResponse(
      {
        message: "Not found",
      },
      404
    );
  }
  return formatJSONResponse({
    note: updatedNote,
  });
};

export const main = middyfy(create);
