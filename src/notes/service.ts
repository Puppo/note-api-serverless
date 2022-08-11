import repository from "./repositories";
import { NoteEntity } from "./types";

const get = (id: NoteEntity["id"]): Promise<NoteEntity | null> =>
  repository.get(id);
const find = (): Promise<NoteEntity[]> => repository.find();

const create = (note: Omit<NoteEntity, "id">): Promise<NoteEntity> =>
  repository.create(note);

const update = (note: NoteEntity): Promise<NoteEntity | null> =>
  repository.update(note);

const remove = (id: NoteEntity["id"]): Promise<NoteEntity | null> =>
  repository.delete(id);

export default { create, update, get, find, delete: remove };
