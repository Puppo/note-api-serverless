import { NoteTable } from "./repositories";
import { NoteEntity } from "./types";

const Mapper = {
  toTable(note: NoteEntity): NoteTable {
    return {
      Id: note.id,
      Title: note.title,
      Content: note.content,
    };
  },
  toEntity(note: NoteTable): NoteEntity {
    return {
      id: note.Id,
      title: note.Title,
      content: note.Content,
    };
  },
};

export default Mapper;
