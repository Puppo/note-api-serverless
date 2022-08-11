import { handlerPath } from "@libs/handler-resolver";
import { UpdateNoteSchema } from "./schema";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "put",
        path: "notes/{id}",
        request: {
          parameters: {
            paths: {
              id: {
                required: true,
                mappedValue: "id",
              },
            },
          },
          schemas: {
            "application/json": UpdateNoteSchema,
          },
        },
      },
    },
  ],
};
