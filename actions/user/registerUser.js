const Cloudant = require('@cloudant/cloudant');

//I know this isn't safe
const CLOUDANT_DATABASE= "vive_users";
const CLOUDANT_USERNAME = "9ff96b9c-0f10-4071-baab-d45827e371b2-bluemix";
const CLOUDANT_PASSWORD = "276257bad4485cdd695814bc145fee9eee7407e4cc30223e75c6f4f3c77de350"

var cloudant;

if(cloudant === null){
    cloudant = new Cloudant({
    account: CLOUDANT_USERNAME,
    password: CLOUDANT_PASSWORD
  });
}

  
  
  
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
  * @return The output of this action, which must be a JSON object.
  *
  */
function main(params) {

	// Configure database connection
  
  var database = cloudant.db.use(CLOUDANT_DATABASE);
  
//   console.log(params)

return params
  
//   data = { a: 1, b: 'two' }

//     return insert(database, data, params);

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
