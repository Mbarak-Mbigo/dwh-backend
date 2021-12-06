const mongoose = require("mongoose");

const { Schema } = mongoose;

const AgeGroups = new Schema({
  "0-4": {
    type: Number,
    required: true,
    min: 0,
  },
  "5-14": {
    type: Number,
    required: true,
    min: 0,
  },
  "15-24": {
    type: Number,
    required: true,
    min: 0,
  },
  "25-34": {
    type: Number,
    required: true,
    min: 0,
  },
  "35-44": {
    type: Number,
    required: true,
    min: 0,
  },
  "45-54": {
    type: Number,
    required: true,
    min: 0,
  },
  "55-64": {
    type: Number,
    required: true,
    min: 0,
  },
  "65-74": {
    type: Number,
    required: true,
    min: 0,
  },
  "75-84": {
    type: Number,
    required: true,
    min: 0,
  },
  "85-94": {
    type: Number,
    required: true,
    min: 0,
  },
  "95-104": {
    type: Number,
    required: true,
    min: 0,
  },
  "105 and over": {
    type: Number,
    required: true,
    min: 0,
  },
});

const registeredPatientsSchema = Schema({
  facilityCode: {
    type: Number,
    required: true,
  },
  month: {
    type: String, // Jan to Dec | 0 - 11
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  totalRegisteredPatients: {
    type: Number,
    required: true,
    min: [0, "Registered patients cannot be negative"],
  },
  dataSummary: {
    male: {
      type: Number,
      required: true,
    },
    female: {
      type: Number,
      required: true,
    },
    ageGroupsData: AgeGroups,
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
});

const RegisteredPatients = mongoose.model(
  "RegisteredPatients",
  registeredPatientsSchema
);

module.exports = RegisteredPatients;
