import Service from "../models/serviceModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const createService = catchAsync(async (req, res, next) => {
  const service = await Service.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      service,
    },
  });
});

export const getAllServices = catchAsync(async (req, res, next) => {
  const services = await Service.find({ isAvailable: true });

  res.status(200).json({
    status: "success",
    results: services.length,
    data: {
      services,
    },
  });
});

export const getService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new AppError("Service not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      service,
    },
  });
});

export const updateService = catchAsync(async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    return next(new AppError("Service not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      service,
    },
  });
});

export const deleteService = catchAsync(async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(req.params.id, {
    isAvailable: false,
  });

  if (!service) {
    return next(new AppError("Service not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
