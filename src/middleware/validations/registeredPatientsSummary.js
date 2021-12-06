const yup = require("yup");

const RegisteredPatientsSummaryReqBodySchema = yup.object({
  body: yup.object({
    facilityCode: yup.number().required(),
    month: yup.string().required(),
    year: yup.number().required(),
    totalRegisteredPatients: yup.number().required(),
    dataSummary: yup.object({
      male: yup.number().required(),
      female: yup.number().required(),
      ageGroups: yup.object({
        "0-4": yup.number().required(),
        "5-14": yup.number().required(),
        "15-24": yup.number().required(),
        "25-34": yup.number().required(),
        "35-44": yup.number().required(),
        "45-54": yup.number().required(),
        "55-64": yup.number().required(),
        "65-74": yup.number().required(),
        "75-84": yup.number().required(),
        "85-94": yup.number().required(),
        "95-104": yup.number().required(),
        "105 and over": yup.number().required()
      })
    }),
    dateSubmitted: yup.date(),
  })
});

const FacilityRegisteredPatientsReqSchema = yup.object({
  params: yup.object({
    facilityCode: yup.string().required('Facility Code must be a string'),
  })
})

module.exports = {
  RegisteredPatientsSummaryReqBodySchema,
  FacilityRegisteredPatientsReqSchema,
}
