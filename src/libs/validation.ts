//--------------------------------------------------------------------------------------------
//
// Import TypeBox and Ajv
//
//--------------------------------------------------------------------------------------------

import { Static, TSchema } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

export default function validate<
  Schema extends TSchema,
  TModel extends Static<Schema> = Static<Schema>
>(schema: Schema, data: unknown): asserts data is TModel {
  const C = TypeCompiler.Compile(schema);
  if (!C.Check(data)) {
    const errors = Array.from(C.Errors(data));
    throw new Error(`Validation error: ${JSON.stringify(errors)}`);
  }
}
