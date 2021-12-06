const {
  createRegisteredPatientSummaryRecord,
  getRegisteredPatientsSummariesRecords,
  getRegisteredPatientsSummariesByFacility,
  getRegisteredPatientsSummariesMonthYear,
  getSummariesAggregateRecords,
} = require("../helpers/registeredPatientsSummary");

const createRegisteredPatientSummary = async (req, res) => {
  console.log("reg");
  try {
    const record = await createRegisteredPatientSummaryRecord(req, res);
    if (record) {
      return record;
    }
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

const getRegisteredPatientsSummariesByMonthYear = async (req, res) => {
  try {
    const records = await getRegisteredPatientsSummariesMonthYear(
      req.params.monthyear
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

const getSummariesAggregate = async (req, res) => {
  try {
    const records = await getSummariesAggregateRecords(req);
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
  getRegisteredPatientsSummariesByMonthYear,
  getSummariesAggregate,
};
