import Review from "../models/reviewModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Service from "../models/serviceModel.js";

export const createReview = catchAsync(async (req, res, next) => {
  const { review, rating, serviceId } = req.body;
  const user = req.user.id;
  const newReview = await Review.create({
    review: review,
    rating: rating,
    service: serviceId,
    user: user,
  });

  //push the review to the service reviews array
  const service = await Service.findById(serviceId);
  service.reviews.push(newReview._id);
  await service.save();

  res.status(201).json({
    status: "success",
    data: {
      newReview,
    },
  });
});

export const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

export const getAllReviewsForService = catchAsync(async (req, res, next) => {
  const service = req.params.id;

  const reviews = await Review.find({ service: service });

  if (!reviews) {
    return next(new AppError("No reviews found for that service", 404));
  }

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
