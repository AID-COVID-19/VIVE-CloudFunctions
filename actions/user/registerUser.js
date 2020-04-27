const Cloudant = require('@cloudant/cloudant');

//I know this isn't safe
const CLOUDANT_DATABASE= "vive_users";
const CLOUDANT_USERNAME = "2ad473de-e5c5-4f3e-bbb3-7a518ae880b9-bluemix"; // if u can use environment variable good.
const CLOUDANT_PASSWORD = "ff744127284387c282e8a91be38556501bb9b1fb9f265427ff26fd12dcb5f9e7";

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
  
  const { contributor, symptoms_start, share_covid_status, risk } = params;
  // check that params contain all the info it needs. if not send error status code 
  if (contributor === undefined || symptoms_start === undefined || share_covid_status === undefined || risk === undefined) {
    return {
      error: "Not Enough Arguments",
    }
}
//   console.log(params)
  
  const data = { contributor, symptoms_start, share_covid_status, risk } // this data is what is being added to the database. structure it from params

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
