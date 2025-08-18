import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from "fs";
import path from "path";

const schemaPath = path.resolve("./gpt/shared/response_generic.json");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));

const ajv = new Ajv({ allErrors: true });
addFormats(ajv); // Para validar "date-time" y otros formatos
const validate = ajv.compile(schema);

export function validateMessage(message) {
  const valid = validate(message);
  if (!valid) {
    console.log("Errores de validación AJV:", validate.errors);
  }
  return valid;
}
