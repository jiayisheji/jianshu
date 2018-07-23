export function schemaPlugin(schema) {
    const updateDate = function(next) {
        this.updated_at = new Date();
        next();
    };
    // update date for bellow 4 methods
    schema.pre('update', updateDate)
        .pre('findOneAndUpdate', updateDate)
        .pre('findByIdAndUpdate', updateDate);
}