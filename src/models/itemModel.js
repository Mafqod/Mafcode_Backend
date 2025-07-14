import mongoose from "mongoose";
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
