import Item from "../models/itemModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const createItem = catchAsync(async (req, res) => {
  const newItem = await Item.create(req.body, { createdBy: req.user._id });
  res.status(201).json({
    status: "success",
    data: {
      item: newItem,
    },
  });
});

export const getAllItemsForUSer = catchAsync(async (req, res) => {
  const items = await Item.find({ createdBy: req.user._id });
  res.status(200).json({
    status: "success",
    results: items.length,
    data: {
      items,
    },
  });
});

export const getAllItems = catchAsync(async (req, res) => {
  const items = await Item.find();
  res.status(200).json({
    status: "success",
    results: items.length,
    data: {
      items,
    },
  });
});

export const getItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return next(new AppError("No item found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      item,
    },
  });
});

export const updateItem = catchAsync(async (req, res, next) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    return next(new AppError("No item found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      item,
    },
  });
});

export const deleteItem = catchAsync(async (req, res, next) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) {
    return next(new AppError("No item found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
export const getItemsByType = catchAsync(async (req, res, next) => {
  const items = await Item.find({ type: req.body.type });
  if (items.length === 0) {
    return next(new AppError("No items found for this type", 404));
  }
  res.status(200).json({
    status: "success",
    results: items.length,
    data: {
      items,
    },
  });
});
