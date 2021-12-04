const { HealthFacility } = require("../../models");

const createFacilityRecord = async (req) => {
  try {
    const newFacility = await HealthFacility({
      facilityName: req.body.facilityName,
      county: req.body.county,
      level: req.body.level,
    });

    const savedFacility = await newFacility.save();
    if (savedFacility) {
      return savedFacility;
    }

    throw Error("Error creating facility record");
  } catch (error) {
    throw error;
  }
};
const getFacilityById = async (req) => {
  try {
    const facility = await HealthFacility.findById({
      _id: req.params.facilityId,
    });

    if (facility) {
      return facility;
    }

    throw Error(`Failed to get Facility record ${req.params.facilityId}`);
  } catch (error) {
    throw error;
  }
};

const getAllFacilities = async () => {
  try {
    const facilities = await HealthFacility.find({});

    if (facilities) {
      return facilities;
    }
    throw Error("Failed to get facilities");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createFacilityRecord,
  getFacilityById,
  getAllFacilities,
};
