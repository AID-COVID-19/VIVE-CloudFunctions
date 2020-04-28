const Cloudant = require('@cloudant/cloudant');

//I know this isn't safe
const CLOUDANT_DATABASE= "vive_visits";
const CLOUDANT_USERNAME = "2ad473de-e5c5-4f3e-bbb3-7a518ae880b9-bluemix"; // if u can use environment variable good.
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
    const {long, lat, radius} = params;

    if(long === undefined || lat === undefined || radius === undefined){
        return {
            error: "Not enough arguments"
        }
    }
var query = {
    lat: lat, lon: long,
    radius: radius,
    include_docs:true
  };

  return getLocations(database, query);
}

const getLocations = (db, query) => {
    
    return new Promise(function (resolve, reject) {
        db.geo('city', 'city_points', query, function(err, result) {
            if (err){
                reject(error);
            }
            resolve(result)
          });
    });  
}