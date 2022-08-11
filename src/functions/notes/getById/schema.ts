import { Type } from "@sinclair/typebox";

const GetNoteParameterSchema = Type.Object({
  id: Type.String({
    format: "uuid",
  }),
});

export default GetNoteParameterSchema;
