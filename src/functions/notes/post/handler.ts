import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import noteService from "@notes/service";

import schema from "./schema";

const create: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  const newNote = await noteService.create(event.body);
  return formatJSONResponse(
    {
      note: newNote,
    },
    201
  );
};

export const main = middyfy(create);
