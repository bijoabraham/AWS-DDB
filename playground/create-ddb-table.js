const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-2'});

const dynamodb = new AWS.DynamoDB();

createDynamoTable('NoteApp').then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
});

function createDynamoTable(tableName){
    const params = {
        AttributeDefinitions: [
           {
          AttributeName: "Title", 
          AttributeType: "S"
         }, 
           {
          AttributeName: "Description", 
          AttributeType: "S"
         }
        ], 
        KeySchema: [
           {
          AttributeName: "Title", 
          KeyType: "HASH"
         }, 
           {
          AttributeName: "Description", 
          KeyType: "RANGE"
         }
        ], 
        ProvisionedThroughput: {
         ReadCapacityUnits: 5, 
         WriteCapacityUnits: 5
        }, 
        TableName: tableName
    };/*
       dynamodb.createTable(params, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(data);   
       }*/
       return new Promise((resolve,reject)=>{
           dynamodb.createTable(params,function(err,data){
                if(err){
                    reject(err);
                }
                else{
                    resolve(data);
                }
           });

       });

       
}