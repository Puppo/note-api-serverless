import { AWS } from "@serverless/typescript";
import helloPost from "./post";

const helloFunctions: AWS["functions"] = {
  helloPost,
};

export default helloFunctions;
