const express = require('express');
const router = express.Router();

const {
  createFacility,
  getFacility,
  getFacilities,
} = require('../services/healthFacility')

const { validate, HealthFacilityReqBodySchema } = require('../middleware');

router.post('/', validate(HealthFacilityReqBodySchema), createFacility)

router.get('/', getFacilities)

router.get('/:facilityId', getFacility)



module.exports = router;
