import type { AWS } from "@serverless/typescript";
import hello from "./hello";
import notes from "./notes";

const functions: AWS["functions"] = { ...hello, ...notes };

export default functions;
