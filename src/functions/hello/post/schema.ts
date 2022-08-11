import { Type } from "@sinclair/typebox";

const Hello = Type.Object({
  name: Type.String(),
});

export default Hello;
