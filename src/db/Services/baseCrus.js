module.exports = {
    // Traz x dados do schema informado     
    create(schema, item) {
        return schema.create(item);
    },

    read(schema, query, skip= 0, limit= 10) {     
        return schema.find(query).skip(skip).limit(limit); 
    },

    update(schema, id, item) {
        return schema.updateOne({
            _id: id
        }, {
            $set: item
        }) //updateOne é o novo update
    },

    delete(schema, id) {
        return schema.deleteOne({
            _id: id
        });
    },
}