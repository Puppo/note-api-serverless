import { Type } from "@sinclair/typebox";

const DeleteNoteParameterSchema = Type.Object({
  id: Type.String({
    format: "uuid",
  }),
});

export default DeleteNoteParameterSchema;
