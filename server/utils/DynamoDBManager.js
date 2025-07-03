// // src/utils/DynamoDBManager.js
// const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
// const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
// const { fromSSO } = require('@aws-sdk/credential-providers');

// class DynamoDBManager {
//   constructor(region = 'ap-southeast-1', profile = 'AWSSandboxAdmin-978983596161') {
//     this.region = region;
//     this.profile = profile;

//     // Initialize DynamoDB client with SSO profile credentials
//     this.client = new DynamoDBClient({
//       region: this.region,
//       credentials: fromSSO({ profile: this.profile }),
//     });

//     // Create a higher-level document client for easier usage
//     this.docClient = DynamoDBDocumentClient.from(this.client);
//   }

//   getClient() {
//     return this.docClient;
//   }
// }

// module.exports = DynamoDBManager;


// utils/DynamoDBManager.js
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { fromSSO} = require('@aws-sdk/credential-providers');
const { fromEnv } = require('@aws-sdk/credential-provider-env');
require('dotenv').config();
class DynamoDBManager {
  constructor(region = 'ap-southeast-1', profile = 'AWSSandboxAdmin-978983596161') {
    this.region = region;
    this.profile = profile;
    console.log("profile!!")

    // Fallback logic: use fromSSO if available, else fromEnv
    this.client = new DynamoDBClient({
      region: this.region,
      credentials: async () => {
        try {
          return await fromSSO({ profile: this.profile })();
        } catch (err) {
          console.warn('⚠️ Falling back to fromEnv() due to SSO profile issue:', err.message);
          return fromEnv()();
        }
      }
    });

    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  getClient() {
    return this.docClient;
  }
}

module.exports = DynamoDBManager;
