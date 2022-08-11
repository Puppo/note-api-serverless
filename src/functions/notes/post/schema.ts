import { Type } from "@sinclair/typebox";

const CreateNoteSchema = Type.Object({
  title: Type.String(),
  content: Type.String(),
});

export default CreateNoteSchema;
