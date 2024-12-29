import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  id: string;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: function (_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export default mongoose.model<ITask>("Task", TaskSchema);
