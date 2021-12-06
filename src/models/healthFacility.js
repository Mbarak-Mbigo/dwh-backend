const mongoose = require("mongoose");

const { Schema } = mongoose;

const healthFacilitySchema = new Schema({
  facilityId: {
    type: Number,
    required: true,
  },
  facilityName: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    min: [1, "Facility level cannot be less than 1"],
    max: [5, "Facility level cannot be more than 5"],
  },
});

const HealthFacility = mongoose.model("HealthFacility", healthFacilitySchema);

module.exports = HealthFacility;
