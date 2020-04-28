const Cloudant = require('@cloudant/cloudant');

//I know this isn't safe
const CLOUDANT_DATABASE= "vive_users";
const CLOUDANT_USERNAME = "2ad473de-e5c5-4f3e-bbb3-7a518ae880b9-bluemix"; // if u can use environment variable good.
const CLOUDANT_PASSWORD = "ff744127284387c282e8a91be38556501bb9b1fb9f265427ff26fd12dcb5f9e7";

let cloudant = null;

// Configure database connection if already not established in the container @Thanks Mofi
if(cloudant === null){
    cloudant = new Cloudant({
    account: CLOUDANT_USERNAME,
    password: CLOUDANT_PASSWORD
  });
}

function main(params){
    const database = cloudant.db.use(CLOUDANT_DATABASE);
    const { userId } = params;
    if (userId === undefined){
        return {
            error: "User id is required"
        }
    }
    return getUser(database, userId);
}

const getUser = (db, userId) => {
    return new Promise((resolve, reject) => {
        db.find({selector: {_id: userId}}, (err, res) => {
            if(err){
                reject(err);
            }
            resolve(res);
        })
    })
}