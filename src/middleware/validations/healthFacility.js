const yup = require("yup");

const HealthFacilityReqBodySchema = yup.object({
  body: yup.object({
    facilityName: yup.string().required(),
    county: yup.string().required(),
    level: yup.number().min(1).max(5).required()
  }),
});

module.exports = HealthFacilityReqBodySchema;
