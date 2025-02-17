import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.ObjectId,
      ref: "Service",
      required: [true, "Service is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    bookingDate: {
      type: Date,
      required: [true, "Booking date is required"],
    },
    bookingTime: {
      type: String,
      required: [true, "Booking time is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
