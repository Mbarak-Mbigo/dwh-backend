const express = require('express');
const router = express.Router();


const {
  createFacility,
  getFacility,
  getFacilities,
  getAllFacilitesSubmissions,
} = require('../services/healthFacility')

const {
  getRegisteredPatientsSummariesByMonthYear,
} = require("../services/registeredPatientsSummary");

const { validate, HealthFacilityReqBodySchema } = require('../middleware');

router.post('/', validate(HealthFacilityReqBodySchema), createFacility) // okay

router.get('/', getFacilities) // get all facilities

router.get('/submissions', getAllFacilitesSubmissions)

router.get('/:facilityId', getFacility) // get one facility

router.get(
  "/registeredPatientsSummary/:monthyear",
  getRegisteredPatientsSummariesByMonthYear
);



module.exports = router;
