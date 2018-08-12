/**
 * @author Semper
 */
export class Article {
    constructor(bookName, bookUrl, chapterName, currentChapterNum, pageNum, totalPage, chapterContent) {
        this.bookName = bookName;
        this.bookUrl = bookUrl;
        this.chapterName = chapterName;
        this.currentChapterNum = currentChapterNum;
        this.pageNum = pageNum;
        this.totalPage = totalPage;
        this.chapterContent = chapterContent;
    }
}