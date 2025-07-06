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

class DynamoDBManager {
  constructor(region = 'ap-southeast-1') {
    this.region = region;
    
    // AWS SDK will automatically use EC2 instance role credentials
    this.client = new DynamoDBClient({
      region: this.region
    });

    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  getClient() {
    return this.docClient;
  }
}

module.exports = DynamoDBManager;
