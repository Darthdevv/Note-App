import { cleanEnv } from "envalid";
import { str, port } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGO_DB_URI : str(),
  PORT: port(),
});
