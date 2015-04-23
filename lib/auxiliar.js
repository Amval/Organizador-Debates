_ = lodash

_.filterSelection = function(array,selection) {
    return _.filter(array, function(num) {return _.contains(selection,num)})
}




_.processForm = function(e, schemaName, autovalues  ) {
    
    var keys = schemaName._schemaKeys;
    var schema = schemaName._schema;
    var autoKeys = _.keys(autovalues);


    var result = {};

    var formKeys = _.filter(keys, function(key) {
        return _.has(schema[key], "label");
    });

    _.each(formKeys,function(item) {
        result[item] = $(e.target).find('[name='+item+']').val() 
   });

    _.each(autoKeys, function(item) {
        result[item] = autovalues[item]();
    });
    console.log(result);
    return result;
}
