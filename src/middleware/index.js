const HealthFacilityReqBodySchema = require("./validations/healthFacility");
const {
  RegisteredPatientsSummaryReqBodySchema,
  FacilityRegisteredPatientsReqSchema,
} = require("./validations/registeredPatientsSummary");

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    res
      .status(400)
      .json({ error: { type: err.name, message: err.message }, data: null });
  }
};

const unhandledErrors = (err, req, res, next) => {
  // catch unhandled errors
  if (res.headersSent) {
    return next(err);
  }

  console.error(err.stack);

  res.status(500).json({
    error: err.message,
    data: null,
  });
};

module.exports = {
  validate,
  HealthFacilityReqBodySchema,
  RegisteredPatientsSummaryReqBodySchema,
  FacilityRegisteredPatientsReqSchema,
  unhandledErrors,
};



// {/* <Grid container spacing={3}>
// {/* Chart */}
// <Grid item xs={12} md={8} lg={9}>
//   <Paper className={fixedHeightPaper}>
//     <Chart />
//   </Paper>
// </Grid>

// {/* Recent Deposits */}
// <Grid item xs={12} md={4} lg={3}>
//   <Paper className={fixedHeightPaper}>
//     <Deposits />
//   </Paper>
// </Grid>

// {/* Recent Orders */}
// <Grid item xs={12}>
//   <Paper className={classes.paper}>
//     <Orders />
//   </Paper>
// </Grid>
// </Grid> */}
