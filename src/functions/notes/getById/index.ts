import { handlerPath } from "@libs/handler-resolver";

const functionSchema = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "notes/{id}",
      },
    },
  ],
};

export default functionSchema;
