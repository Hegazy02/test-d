// src\models\shortcut.js
import mongoose from "mongoose";

const shortcutSchema = new mongoose.Schema({
  link: { type: String, required: true },
  name: { type: String, required: true },
});

function createModel(modelName, schema) {
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }
  return mongoose.model(modelName, schema);
}
const shortcut = createModel("shortcut", shortcutSchema);

export default shortcut;
