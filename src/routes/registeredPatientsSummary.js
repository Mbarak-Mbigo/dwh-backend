const express = require("express");
const router = express.Router();

const {
  createRegisteredPatientSummary,
  getRegisteredPatientsSummaries,
  getFacilityRegisteredPatientsSummaries,
  getSummariesAggregate,
} = require("../services/registeredPatientsSummary");

const {
  validate,
  RegisteredPatientsSummaryReqBodySchema,
  FacilityRegisteredPatientsReqSchema,
} = require("../middleware");
const {
  getRegisteredPatientsSummariesByFacility,
} = require("../helpers/registeredPatientsSummary");

router.post(
  "/",
  validate(RegisteredPatientsSummaryReqBodySchema),
  createRegisteredPatientSummary
); // create summaries

router.get("/", getRegisteredPatientsSummaries); // get all summaries

router.get("/:facilityCode", getFacilityRegisteredPatientsSummaries); // get all summaries by given a facilityCode

router.get("/:catogory/aggregate", getSummariesAggregate);

// get data following by month, facility, and county.
// Total monthly registrations (month, facility, county)
// Total registration by Gender (month, facility, county)
// Total registration by Age group (month, facility, county)

module.exports = router;
