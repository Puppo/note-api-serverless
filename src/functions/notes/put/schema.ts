import { Type } from "@sinclair/typebox";

export const UpdateNoteSchema = Type.Object({
  title: Type.String(),
  content: Type.String(),
});

export const GetNoteParameterSchema = Type.Object({
  id: Type.String({
    format: "uuid",
  }),
});
