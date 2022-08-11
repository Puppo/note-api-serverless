import DynamoDbClient from "@libs/dynamodb-client";
import ENV from "@libs/env";
import { Static, Type } from "@sinclair/typebox";
import { randomUUID } from "crypto";
import Mapper from "./mappers";
import { NoteEntity } from "./types";

const NoteTable = Type.Object({
  Id: Type.String(),
  Title: Type.String(),
  Content: Type.String(),
});

export type NoteTable = Static<typeof NoteTable>;

const client = DynamoDbClient(NoteTable, "Id", ENV.noteTableName);

const create = async (note: Omit<NoteEntity, "id">): Promise<NoteEntity> => {
  const tableValue = Mapper.toTable({ ...note, id: randomUUID() });
  const result = await client.insert(tableValue);
  return Mapper.toEntity(result);
};

const update = async (note: NoteEntity): Promise<NoteEntity | null> => {
  const tableValue = Mapper.toTable(note);
  const result = await client.update(tableValue.Id, tableValue);
  return result && Mapper.toEntity(result);
};

const get = async (id: NoteEntity["id"]): Promise<NoteEntity | null> => {
  const result = await client.get(id);
  return result && Mapper.toEntity(result);
};

const find = async (): Promise<NoteEntity[]> => {
  const result = await client.find();
  return result.map(Mapper.toEntity);
};

const remove = async (id: NoteEntity["id"]): Promise<NoteEntity | null> => {
  const result = await client.delete(id);
  return result && Mapper.toEntity(result);
};

const repository = { get, find, create, update, delete: remove };

export default repository;
