/**
 * This action downloads an IBM logo, and returns an object to be written to a cloudant database.
 * This action is idempotent. If it fails, it can be retried.
 *
 * @param   params.CLOUDANT_USERNAME               Cloudant username
 * @param   params.CLOUDANT_PASSWORD               Cloudant password
 * @param   params.CLOUDANT_DATABASE               Cloudant database to store the file to
 * @return  Promise for the downloaded image object
 */

/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  * 
  * params must include the following properties
  *     contributor: boolean
  *     symptoms_start: string
  *     share_covid_status: boolean
  *     risk: [high, low, mid]
  *     
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
function main(params) {

var Cloudant = require('@cloudant/cloudant');
    var cloudant;
	
	// Configure database connection
  var cloudant = new Cloudant({
    account: CLOUDANT_USERNAME,
    password: CLOUDANT_PASSWORD
  });
//   var database = cloudant.db.use(CLOUDANT_DATABASE);
  
  data = { a: 1, b: 'two' };

    // return insert(database, data, params);
    console.log(params);
    
    return data;

}

/**
 * Create document in database.
 */
function insert(cloudantDb, doc, params) {
    return new Promise(function (resolve, reject) {
        cloudantDb.insert(doc, params, function (error, response) {
            if (!error) {
                resolve(response);
            } else {
                console.log("error", error);
                reject(error);
            }
        });
    });
}
