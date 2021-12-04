const {
  createRegisteredPatientSummaryRecord,
  getRegisteredPatientsSummariesRecords,
  getRegisteredPatientsSummariesByFacility,
} = require("../helpers/registeredPatientsSummary");

const createRegisteredPatientSummary = async (req, res) => {
  try {
    await createRegisteredPatientSummaryRecord(req, res);
  } catch (error) {
    res.json({
      error,
      data: null,
    });
  }
};

const getRegisteredPatientsSummaries = async (req, res) => {
  const records = await getRegisteredPatientsSummariesRecords();
  if (records) {
    return res.json({
      error: null,
      data: records,
    });
  }

  res.status(500).json({
    error: "Unable to get records",
    data: null,
  });
};

const getFacilityRegisteredPatientsSummaries = async (req, res) => {
  try {
    const records = await getRegisteredPatientsSummariesByFacility(
      req.params.facilityCode
    );
    if (records) {
      return res.json({
        error: null,
        data: records,
      });
    }

    res.status(404).json({
      error: "Records not found",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      error: `Records not found ${error}`,
      data: null,
    });
  }
};

module.exports = {
  createRegisteredPatientSummary,
  getRegisteredPatientsSummaries,
  getFacilityRegisteredPatientsSummaries,
};
