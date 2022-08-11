import { AWS } from "@serverless/typescript";
import noteDelete from "./delete";
import noteGetAll from "./getAllNotes";
import noteGetById from "./getById";
import notePost from "./post";
import notePut from "./put";

const noteFunctions: AWS["functions"] = {
  noteDelete,
  noteGetAll,
  noteGetById,
  notePost,
  notePut,
};

export default noteFunctions;
