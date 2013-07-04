
0.3.8 / 2013-07-05 
==================

  * Update dependencie8s and minor changes on the task runner

0.3.7 / 2013-06-14 
==================

  * Fix CI build script

0.3.6 / 2013-06-11 
==================

  * Fallback to default db credentials if failed to load the production db credentials
  * Fix broken commands
  * Ignore benchmark directory when deploying to AppFog
  * Add dependencies status and overview

0.3.5 / 2013-05-15
==================

  * Update dependencies and use Gemnasium to monitor new dependencies releases
  * Add help command

0.3.4 / 2013-05-07
==================

  * Add command to run benchmark with just one request
  * Ignored benchmark dir when deploy to AppFog
  * Narrowed the benchmark scenario

0.3.3 / 2013-04-28
==================

  * Add benchmark: Load testing Web API in Normal Resource scenario #5219951777808 #5219951777810
  * Add benchmark: Load testing Web API in Empty Schema scenario #5219951777799 #5219951777801

0.3.2 / 2013-04-27
==================

  * Write helper function to get the API base path
  * Enhance source code documentations
  * Removed dead codes
  * Rename middleware and extract configs loading
  * Extract a function to select MongoDB collection

0.3.1 / 2013-04-25
==================

  * Stabilize the MongoDB connection middleware.
  * Minified the XML resource output when run in production mode
  * Listen to process.env.VCAP_APP_PORT
  * Make sure the XML resource structure are cool enough
  * Make sure the url field is exists in resource representation

0.3.0 / 2013-04-23
==================

  * Write get Event List API #5039891759727 #5039891759729
  * Add getting started steps

0.2.0 / 2013-04-23
==================

  * Write get Event Details API
  * Write a middlewares to expose MongoDB connection
  * Write a middlewares to custom the response output
  * Write a middlewares to check the request content type
  * Restructure repository directory layout
  * Other small enhancements

0.1.0 / 2013-04-18
==================

  * Enhance the test automation
  * Add License
  * Fix typo
  * Update CI commands #5014000864084
  * Update the test suite title #5014000864084
  * Enhanced modules
  * Setup initial test suites runner #5014000864084
  * Enhanced the configs for each of mode #5008018238609
  * Update the app properties #5008018238609
  * Add build status image #5008018238648
  * Set the CI to run on testing mode #5008018238648
  * Add MongoDB service #5008018238648
  * Set runtime to Node.JS #5008018238648
  * Update app properties
  * Update README.md
  * Generate an app #5008018238607 #5008018238609
  * Setup Express framework
  * Build initial REST API doc.
  * Initial commit
