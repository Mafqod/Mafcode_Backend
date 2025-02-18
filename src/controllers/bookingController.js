import Booking from "../models/bookingModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const createBooking = catchAsync(async (req, res, next) => {
  const { service, bookingDate, bookingTime } = req.body;
  const booking = await Booking.create({
    service,
    user: req.user.id,
    bookingDate,
    bookingTime,
  });

  res.status(201).json({
    status: "success",
    data: {
      booking,
    },
  });
});

export const getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();

  res.status(200).json({
    status: "success",
    results: bookings.length,
    data: {
      bookings,
    },
  });
});
