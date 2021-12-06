const { RegisteredPatients } = require("../../models");
const { InvalidData } = require("../../errors");
const { getFacilityById } = require("../healthFacilities");

const getRegisteredPatientsSummariesRecords = async () => {
  try {
    const summaries = await RegisteredPatients.find({});
    if (summaries) return summaries;

    throw new Error("Could not get records");
  } catch (error) {
    return null;
  }
};

const getRegisteredPatientsSummariesByFacility = async (facilityId) => {
  try {
    const facility = await getFacilityById(facilityId);
    if (!facility) {
      throw new Error(`Invalid Facility ID:${facilityId}`);
    }

    const summaries = await RegisteredPatients.find({
      facilityCode: facilityId,
    });
    if (summaries) return summaries;

    return [];
  } catch (error) {
    throw error;
  }
};

const createRegisteredPatientSummaryRecord = async (req, res) => {
  try {
    const facility = await getFacilityById(req.body.facilityCode);
    console.log("relatd facility", facility);
    if (!facility) {
      console.log("failed!!!!!!!!!");
      throw new InvalidData(`Invalid facilityCode: ${req.body.facilityCode}`);
    }

    const newRecord = await RegisteredPatients({
      facilityCode: req.body.facilityCode, // map relation
      month: req.body.month,
      year: req.body.year,
      totalRegisteredPatients: req.body.totalRegisteredPatients,
      dataSummary: {
        male: req.body.dataSummary.male,
        female: req.body.dataSummary.female,
        ageGroupsData: {
          "0-4": req.body.dataSummary.ageGroups["0-4"],
          "5-14": req.body.dataSummary.ageGroups["5-14"],
          "15-24": req.body.dataSummary.ageGroups["15-24"],
          "25-34": req.body.dataSummary.ageGroups["25-34"],
          "35-44": req.body.dataSummary.ageGroups["35-44"],
          "45-54": req.body.dataSummary.ageGroups["45-54"],
          "55-64": req.body.dataSummary.ageGroups["55-64"],
          "65-74": req.body.dataSummary.ageGroups["65-74"],
          "75-84": req.body.dataSummary.ageGroups["75-84"],
          "85-94": req.body.dataSummary.ageGroups["85-94"],
          "95-104": req.body.dataSummary.ageGroups["95-104"],
          "105 and over": req.body.dataSummary.ageGroups["105 and over"],
        },
      },
    });

    const savedRecord = await newRecord.save();

    if (savedRecord) {
      return res.status(201).json({
        error: null,
        data: savedRecord,
      });
    }

    throw Error("Unkown Error Occurred");
  } catch (error) {
    if (error instanceof InvalidData) {
      return res.status(400).json({
        error: error.message,
        data: null,
      });
    }

    res.status(500).json({
      error: error.message,
      data: null,
    });
  }
};

const getRegisteredPatientsSummariesMonthYear = async (monthyear) => {
  console.log("monthyear", monthyear);
  try {
    const summaries = await RegisteredPatients.aggregate([
      {
        $project: {
          mnthYr: {
            $concat: [
              { $substr: ["$month", 0, -1] },
              "-",
              { $substr: ["$year", 0, -1] },
            ],
          },
          totalRegisteredPatients: 1,
          dataSummary: 1,
          male: 1,
          female: 1,
          year: 1,
          month: 1,
          ageGroupsData: 1,
        },
      },
      { $match: { mnthYr: monthyear } },
    ]);
    if (summaries) return summaries;

    return [];
  } catch (error) {
    throw error;
  }
};

const getSummariesAggregateRecords = async () => {
  try {
    const summaries = await RegisteredPatients.aggregate([
      {
        $project: {
          mnthYr: {
            $concat: [
              { $substr: ["$month", 0, -1] },
              "-",
              { $substr: ["$year", 0, -1] },
            ],
          },
          totalRegisteredPatients: 1,
          dataSummary: 1,
          male: 1,
          female: 1,
          year: 1,
          month: 1,
          ageGroupsData: 1,
        },
      },
      // { $match: { mnthYr: monthyear } },
    ]);
    if (summaries) return summaries;

    return [];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRegisteredPatientSummaryRecord,
  getRegisteredPatientsSummariesRecords,
  getRegisteredPatientsSummariesByFacility,
  getRegisteredPatientsSummariesMonthYear,
  getSummariesAggregateRecords,
};
