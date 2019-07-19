module.exports = {
    // Traz x dados do schema informado     
    create(schema, item) {
        return schema.create(item);
    },

    read(schema, query) {
        return schema.find(query);
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