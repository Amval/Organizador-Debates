_ = lodash

_.filterSelection = function(array,selection) {
    return _.filter(array, function(num) {return _.contains(selection,num)})
}


_.switch = (object) => {
  object.set(!object.get())
};


_.processForm = (e, schemaName, autovalues) => {

    const keys = schemaName._schemaKeys;
    const schema = schemaName._schema;
    const autoKeys = _.keys(autovalues);


    const result = {};

    const formKeys = _.filter(keys, function(key) {
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
