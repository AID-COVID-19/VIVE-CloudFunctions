const Cloudant = require('@cloudant/cloudant');

//I know this isn't safe
const CLOUDANT_DATABASE= "vive_users";
const CLOUDANT_USERNAME = "use ur username"; // if u can use environment variable good.
const CLOUDANT_PASSWORD = "use ur password"

var cloudant;

// Configure database connection if already not established in the container @Thanks Mofi
if(cloudant === null){
    cloudant = new Cloudant({
    account: CLOUDANT_USERNAME,
    password: CLOUDANT_PASSWORD
  });
}

  
/**
 * This action returns an object to be written to a cloudant database.
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
  *  params must include the following properties
  *     contributor: boolean
  *     symptoms_start: string
  *     share_covid_status: boolean
  *     risk: [high, low, mid]
  
  * @return The output of this action, which must be a JSON object.
  *
  */
function main(params) {
	
  var database = cloudant.db.use(CLOUDANT_DATABASE);
  
	// check that params contain all the info it needs. if not send error status code 
//   console.log(params)
  
  data = { a: 1, b: 'two' } // this data is what is being added to the database. structure it from params

    return insert(database, data);

}

/**
 * Create document in database.
 */
function insert(cloudantDb, doc) {
    return new Promise(function (resolve, reject) {
        cloudantDb.insert(doc, function (error, response) {
            if (!error) {
                resolve(response);
            } else {
                console.log("error", error);
                reject(error);
            }
        });
    });
}
