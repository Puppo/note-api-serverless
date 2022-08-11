import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import noteService from "@notes/service";

const handler: ValidatedEventAPIGatewayProxyEvent = async () => {
  try {
    console.log("getAllNotes");
    const notes = await noteService.find();
    console.log("getAllNotes", notes);

    return formatJSONResponse({
      notes,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const main = middyfy(handler);
