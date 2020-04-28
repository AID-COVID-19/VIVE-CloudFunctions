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

function main(params) {
    var database = cloudant.db.use(CLOUDANT_DATABASE);
    const { id, contributor, symptoms_start, share_covid_status, risk } = params;
    const userToBeEdited = { id, contributor, symptoms_start, share_covid_status, risk };
    // check that params contain all the info it needs. if not send error status code 
    if (id === undefined || contributor === undefined || symptoms_start === undefined || share_covid_status === undefined || risk === undefined) {
      return {
        error: "Not Enough Arguments",
      }
    }
    database.find({selector: {id: id}}, function(err, res){
        if(err){
            return {
                error: err
            }
        }
        database.insert(userToBeEdited, function(err, res){
            if(err){
                return {
                    error: err
                }
            }
            return res
        })
    })
    
}