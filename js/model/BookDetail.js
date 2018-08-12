/**
 * @author Semper
 */
export class BookDetail {
    rating: Rating;
    tags: [];

    constructor(_id, title, author, isSerial, majorCate, minorCate,
                longIntro, lastChapter, updated, cover, rating, latelyFollower, retentionRatio, serializeWordCount, tags) {
        this._id = _id;
        this.title = title;
        this.author = author;
        this.isSerial = isSerial;
        this.majorCate = majorCate;
        this.minorCate = minorCate;
        this.longIntro = longIntro;
        this.lastChapter = lastChapter;
        this.updated = updated;
        this.cover = cover;
        this.rating = rating;
        this.latelyFollower = latelyFollower;
        this.retentionRatio = retentionRatio;
        this.serializeWordCount = serializeWordCount;
        this.tags = tags

    }
}

class Rating {
    constructor(count, score, isEffect) {
        this.count = count;
        this.score = score;
        this.isEffect = isEffect
    }
}