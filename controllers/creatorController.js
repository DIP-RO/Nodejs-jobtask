const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const Creator = require("../models/creatorModel");

const getCreators = asyncHandler(async (req, res) => {
  const creators = await Creator.find();
  res.status(200).json(creators);
});
const createCreator = asyncHandler(async (req, res) => {
  const { userName, id, profileUrl, profession } = req.body;
  if (!userName || !id || !profileUrl || !profession) {
    res.status(400);
    throw new Error("All fields required");
  }
  const creator = await Creator.create({
    userName,
    id,
    profileUrl,
    profession,
  });

  res.status(201).json(creator);
});
const updateCreator = asyncHandler(async (req, res) => {
  const creator = await Creator.findById(req.params.id);
  if (!creator) {
    res.status(404);
    throw new Error("Creator not found");
  }
  const updatedCreator = await Creator.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedCreator);
});
const deleteCreator = asyncHandler(async (req, res) => {
  const creator = await Creator.findById(req.params.id);
  if (!creator) {
    res.status(404);
    throw new Error("Creator not found");
  }
  await Creator.remove();
  res.status(200).json(creator);
});
const getCreator = asyncHandler(async (req, res) => {
  const creator = await Creator.findById(req.params.id);
  if (!creator) {
    res.status(404);
    throw new Error("Creator not found");
  }

  res.status(200).json(creator);
});

module.exports = {
  getCreator,
  getCreators,
  createCreator,
  updateCreator,
  deleteCreator,
};
