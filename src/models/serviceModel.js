import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    type: {
      type: String,
      enum: ["session", "room"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Review",
      },
    ],
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

serviceSchema.pre(/^find/, function (next) {
  this.populate({ path: "reviews", select: "review rating" });
  next();
});

serviceSchema.virtual("averageRating").get(function () {
  let sum = 0;
  this.reviews.forEach((review) => {
    sum += review.rating;
  });

  return sum / this.reviews.length;
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
