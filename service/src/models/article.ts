/**
 * Created by jiayi on 2017/5/24.
 */

import * as mongoose from 'mongoose';
const articleSchema = new mongoose.Schema({
    title:  String
});

module.exports = mongoose.model('Article', articleSchema);