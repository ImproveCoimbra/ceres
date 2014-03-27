var OperationLog, dateNow;

OperationLog = new Meteor.Collection('operation_log');
dateNow = Date.now;

function logOperation(collectionName, operationType, userId, doc, fieldNames, modifier) {
    OperationLog.insert({
        collectionName: 'produtores',
        operation: 'update',
        user: userId,
        timestamp:  dateNow(),
        docJSON: JSON.stringify(doc),
        modifierJSON: _.isObject(modifier) ? JSON.stringify(modifier) : null
    });

    return false;
};

//External API
logOperationsOf = function (collection) {
	collection.deny({
	    insert: _.partial(logOperation, collection._name, "insert"),
	    update : _.partial(logOperation, collection._name, "update"),
	    remove : _.partial(logOperation, collection._name, "remove")
	  });
};