const {
  createFacilityRecord,
  getFacilityById,
  getAllFacilities,
  getFacilitiesAndSubmissions,
} = require("../helpers/healthFacilities");

const createFacility = async (req, res) => {
  try {
    const record = await createFacilityRecord(req);
    if (record) {
      res.status(201).json({
        error: null,
        data: record,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: error.message,
      data: null,
    });
  }
};

const getFacilities = async (req, res) => {
  try {
    const records = await getAllFacilities(req);
    if (records) {
      res.json({
        error: null,
        data: records,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: error.message,
      data: null,
    });
  }
};

const getFacility = async (req, res) => {
  try {
    const record = await getFacilityById(req);
    if (record) {
      res.json({
        error: null,
        data: record,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: error.message,
      data: null,
    });
  }
};

const getAllFacilitesSubmissions = async (req, res) => {
  try {
    const records = await getFacilitiesAndSubmissions();
    if (records) {
      res.json({
        error: null,
        data: records,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: error.message,
      data: null,
    });
  }
};

module.exports = {
  createFacility,
  getFacilities,
  getFacility,
  getAllFacilitesSubmissions,
};
