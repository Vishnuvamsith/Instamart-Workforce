const express = require('express');
const { GetCommand, PutCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const router = express.Router();
const DynamoDBManager = require('../utils/DynamoDBManager');
const db = new DynamoDBManager();
const docClient = db.getClient();

const TABLE_NAME = 'WarehouseAttendanceRecords';

router.post('/attendance/upload', async (req, res) => {
  const records = req.body.records;

  if (!Array.isArray(records)) {
    return res.status(400).json({ status: 'error', message: 'Invalid data format' });
  }

  let inserted = 0;
  let updated = 0;
  let unchanged = 0;

  for (const item of records) {
    const key = {
      mobile: item.mobile,
      date: item.date,
    };

    try {
      const existing = await docClient.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: key,
      }));

      const existingItem = existing.Item;

      if (!existingItem) {
        await docClient.send(new PutCommand({
          TableName: TABLE_NAME,
          Item: item,
        }));
        inserted++;
        continue;
      }

      const updateFields = {};
      let hasChanges = false;

      for (const field of Object.keys(item)) {
        if ((field === 'mobile' || field === 'date') || item[field] === existingItem[field]) continue;
        updateFields[field] = item[field];
        hasChanges = true;
      }

      if (hasChanges) {
        const UpdateExpression = 'SET ' + Object.keys(updateFields).map((k, i) => `#f${i} = :v${i}`).join(', ');
        const ExpressionAttributeNames = {};
        const ExpressionAttributeValues = {};

        Object.keys(updateFields).forEach((k, i) => {
          ExpressionAttributeNames[`#f${i}`] = k;
          ExpressionAttributeValues[`:v${i}`] = updateFields[k];
        });

        await docClient.send(new UpdateCommand({
          TableName: TABLE_NAME,
          Key: key,
          UpdateExpression,
          ExpressionAttributeNames,
          ExpressionAttributeValues,
        }));
        updated++;
      } else {
        unchanged++;
      }

    } catch (error) {
      console.error(`❌ Error processing ${item.mobile} - ${item.date}:`, error);
    }
  }

  res.json({ status: 'success', inserted, updated, unchanged, total: records.length });
});

module.exports = router;
