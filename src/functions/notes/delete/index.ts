import { handlerPath } from "@libs/handler-resolver";

const functionSchema = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "delete",
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
        },
      },
    },
  ],
};

export default functionSchema;
