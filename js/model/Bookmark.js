/**
 * @author Semper
 */
export class Bookmark {
    constructor(tag, bookName, bookUrl, chapterName, currentChapterNum, pageNum, totalPage, image, siteName, id, lastReadTime) {
        this.tag = tag;
        this.bookName = bookName;
        this.bookUrl = bookUrl;
        this.chapterName = chapterName;
        this.currentChapterNum = currentChapterNum;
        this.pageNum = pageNum;
        this.totalPage = totalPage;
        this.image = image;
        this.siteName = siteName;
        this.id = id;
        this.lastReadTime = lastReadTime
    }
}