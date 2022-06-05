import Job from "../models/Job.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import NotFoundError from "../errors/not-found.js";

// @desc    Get all jobs
// @route   GET /api/v1/jobs
// @access  Public
const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userID });
  res.status(StatusCodes.OK).json({ success: true, count: jobs.length, jobs });
});

// @desc    Get a single job
// @route   GET /api/v1/jobs/:id
// @access  Public
const getJob = asyncHandler(async (req, res) => {
  const {
    user: { userID },
    params: { id: jobID },
  } = req;
  const job = await Job.findById({ _id: jobID, createdBy: userID });
  if (!job) {
    throw new NotFoundError(`Job with id ${jobID} not found`);
  }
  res.status(StatusCodes.OK).json({ success: true, job });
});

// @desc    Create a new job
// @route   POST /api/v1/jobs
// @access  Private
const createJob = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.userID;

  const job = await Job.create(req.body);

  if (job) {
    res.status(StatusCodes.CREATED).json({
      success: true,
      job,
    });
  }
});

// @desc    Update a job
// @route   PUT /api/v1/jobs/:id
// @access  Private
const updateJob = asyncHandler(async (req, res) => {
  const {
    user: { userID },
    body: { company, position },
    params: { id: jobID },
  } = req;
  if (company || position) {
    const job = await Job.findByIdAndUpdate(
      { _id: jobID, createdBy: userID },
      { $set: { company, position } },
      { new: true }
    );
    if (!job) {
      throw new NotFoundError(`Job with id ${jobID} not found`);
    }
    res.status(StatusCodes.OK).json({ success: true, job });
  } else {
    throw new BadRequestError("Please provide a company or position");
  }
});

// @desc    Delete a job
// @route   DELETE /api/v1/jobs/:id
// @access  Private
const deleteJob = asyncHandler(async (req, res) => {
  const {
    user: { userID },
    params: { id: jobID },
  } = req;
  const job = await Job.findByIdAndDelete({ _id: jobID, createdBy: userID });
  if (!job) {
    throw new NotFoundError(`Job with id ${jobID} not found`);
  }
  res.status(StatusCodes.OK).send({ success: true });
});

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
