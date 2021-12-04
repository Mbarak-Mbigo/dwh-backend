const express = require("express");
const router = express.Router();

const {
  createRegisteredPatientSummary,
  getRegisteredPatientsSummaries,
  getFacilityRegisteredPatientsSummaries,
} = require("../services/registeredPatientsSummary");

const {
  validate,
  RegisteredPatientsSummaryReqBodySchema,
  FacilityRegisteredPatientsReqSchema,
} = require("../middleware");


router.post(
  "/",
  validate(RegisteredPatientsSummaryReqBodySchema),
  createRegisteredPatientSummary
);
router.get("/", getRegisteredPatientsSummaries);

router.get(
  "/:facilityCode",
  validate(FacilityRegisteredPatientsReqSchema),
  getFacilityRegisteredPatientsSummaries
);

module.exports = router;
