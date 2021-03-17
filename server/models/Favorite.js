const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }

}, { timestamps: true }) // timestamps: 생성된 시간 자동 처리 


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }