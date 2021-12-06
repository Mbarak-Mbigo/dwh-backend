const { HealthFacility } = require("../../models");

const createFacilityRecord = async (req) => {
  try {
    const newFacility = await HealthFacility({
      facilityId: req.body.facilityId,
      facilityName: req.body.facilityName,
      county: req.body.county,
      level: req.body.level,
    });

    const savedFacility = await newFacility.save();
    if (savedFacility) {
      return savedFacility;
    }

    throw new Error("Error creating facility record");
  } catch (error) {
    throw error;
  }
};
const getFacilityById = async (facilityCode) => {
  try {
    const facility = await HealthFacility.find({
      facilityId: facilityCode,
    });
    if (facility) {
      return facility;
    }

    throw new Error(`Failed to get Facility record ${facilityCode}`);
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
    throw new Error("Failed to get facilities");
  } catch (error) {
    throw error;
  }
};

const getFacilitiesAndSubmissions = async () => {
  try {
    const facilitiesSummariesAggregate = await HealthFacility.aggregate([
      {
        $lookup: {
          from: "registeredpatients",
          as: "submissions",
          let: { facilityId: "$facilityId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$facilityCode", "$$facilityId"],
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          __v: 0,
          _id: 0,
          "submissions.facilityCode": 0,
          "submissions._id": 0,
          "submissions.__v": 0,
          "submissions.dataSummary.ageGroupsData._id": 0,
        },
      },
    ]);

    if (facilitiesSummariesAggregate) {
      return facilitiesSummariesAggregate;
    }
    return [];
    // throw Error("Failed to get facilities");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createFacilityRecord,
  getFacilityById,
  getAllFacilities,
  getFacilitiesAndSubmissions,
};
