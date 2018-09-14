/**
 * @author Semper
 */
export class BookInfo {
    constructor(title, author, cat, shortIntro, lastChapter, date, cover, articleUrlTag, isSerial, _id) {
        this.title = title;
        this.author = author;
        this.cat = cat;
        this.shortIntro = shortIntro;
        this.lastChapter = lastChapter;
        this.date = date;
        this.cover = cover;
        this.articleUrlTag = articleUrlTag;
        this.isSerial = isSerial;
        this._id = _id

    }
}