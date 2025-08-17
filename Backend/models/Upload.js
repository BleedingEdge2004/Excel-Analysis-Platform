import { Schema, model } from "mongoose";

const uploadSchema = new Schema({
  filename: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model("Upload", uploadSchema);
