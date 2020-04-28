const Cloudant = require('@cloudant/cloudant');

const CLOUDANT_DATABASE= "vive_visits";
const CLOUDANT_USERNAME = "2ad473de-e5c5-4f3e-bbb3-7a518ae880b9-bluemix";
const CLOUDANT_PASSWORD = "ff744127284387c282e8a91be38556501bb9b1fb9f265427ff26fd12dcb5f9e7";

var cloudant = null;

// Configure database connection if already not established in the container @Thanks Mofi
if(cloudant === null){
    cloudant = new Cloudant({
    account: CLOUDANT_USERNAME,
    password: CLOUDANT_PASSWORD
  });
}

function main(params){
    const database = cloudant.db.use(CLOUDANT_DATABASE);
    const { TransactionID, ContributorID, GooglePlaceID, geometry, VisitDictionary };
    if(TransactionID === undefined || ContributorID === undefined || GooglePlaceID === undefined || 
        geometry === undefined || VisitDictionary === undefined){
            return {
                error: "Not Enough Arguments"
            }
    }
    const data = { TransactionID, ContributorID, GooglePlaceID, geometry, VisitDictionary };
    return insert(cloudant, data);
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