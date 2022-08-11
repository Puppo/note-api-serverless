import CreateNoteSchema from "@functions/notes/post/schema";
import { Static } from "@sinclair/typebox";

export type NoteEntity = {
  id: string;
  title: string;
  content: string;
};

export type CreateNoteDto = Static<typeof CreateNoteSchema>;
