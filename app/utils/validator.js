/**
 * Check required fields
 *
 * @param {Array} fields an array of fields name
 * @param {Array} body post body in JSON
 */
exports.checkRequiredFields = function (fields, body) {

  if (fields == false)
    throw new Error('Required a list of fields to validate');

  for (var i = 0; i < fields.length; i++) {
    if (!body.hasOwnProperty(fields[i]))
      return false;
  }

  return true;
};