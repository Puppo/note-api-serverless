import { Type } from "@sinclair/typebox";
import validate from "./validation";

const EnvSchema = Type.Object({
  isOffline: Type.Boolean(),
  stage: Type.Union([
    Type.Literal("dev"),
    Type.Literal("prod"),
    Type.Literal("stage"),
  ]),
  awsRegion: Type.Literal("eu-west-1"),
  noteTableName: Type.String(),
});

function buildEnv() {
  const env = {
    isOffline: !!process.env.IS_OFFLINE,
    stage: process.env.STAGE,
    awsRegion: process.env.AWS_REGION,
    noteTableName: process.env.NOTES_TABLE_NAME,
  };
  validate(EnvSchema, env);
  return env;
}

const ENV = buildEnv();

export default ENV;
