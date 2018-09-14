/**
 * @author Semper
 */
import {contentFormat} from "./FormatUtil";
import {BookInfo} from "../model/BookInfo";
import {Article} from "../model/Article";

let _split = require('lodash/split');
let _compact = require('lodash/compact');
let _dropRight = require('lodash/dropRight');

/**
 * 解析百度站长网站
 * @param htmlText
 */
export function getSearchBookInfoByParseHtml(htmlText) {

    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let content = htmlText.substring(htmlText.indexOf('game-item'));
            let mainContent = content.substring(0, content.indexOf('m result'));
            let articleUrlTagContent = mainContent.substring(mainContent.indexOf('href') + 6);
            let articleUrlTag = articleUrlTagContent.substring(0, articleUrlTagContent.indexOf('"'));

            let imgContent = mainContent.substring(mainContent.indexOf('src') + 5);
            let img = imgContent.substring(0, imgContent.indexOf('"'));
            let titleContent = imgContent.substring(imgContent.indexOf(' title') + 8);
            let title = titleContent.substring(0, titleContent.indexOf('"'));
            let descContent = titleContent.substring(titleContent.indexOf('desc') + 6);
            let desc = descContent.substring(0, descContent.indexOf('</p>'));
            // console.log('titleContent',mainContent);

            /*let authorContent = mainContent.substring(mainContent.indexOf('<span>') + 6);
            let author = authorContent.substring(0, authorContent.indexOf('</span>')).trim();*/
            let tagTitleContent = mainContent.substring(mainContent.indexOf('Bold') + 6);
            let tagTitleList = tagTitleContent.split('preBold">');
            let array = [];
            for (let i = 0; i < tagTitleList.length; i++) {
                let tagTitle = tagTitleList[i];
                // let tagKey = tagTitle.substring(0, tagTitle.indexOf('</span>'));
                let tagValueContent = tagTitle.substring(tagTitle.indexOf('</span>') + 7, tagTitle.lastIndexOf('</p>'));
                let tagValue = tagValueContent.substring(tagValueContent.indexOf('>') + 1,
                    tagValueContent.lastIndexOf('<')).trim();
                array.push(tagValue);
                // console.log('map key=', tagKey, 'value=', tagValue);
            }
            // console.log('title',title,'desc',desc,'array',array,'articleUrlTag',articleUrlTag);
            // console.log(new BookInfo(title, array[0], array[1], desc, array[3], array[2], img, articleUrlTag))
            return new BookInfo(title, array[0], array[1], desc, array[3], array[2], img, articleUrlTag);

        } catch (e) {
            console.warn('getSearchBookInfoByParseHtml 解析失败', e.message)
        }
    }
}

/**
 * 解析大主宰网 http://m.daizhuzai.com/
 * @param htmlText
 */
export function getBookInfoDZZ(htmlText) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let mainContent = htmlText.substring(htmlText.indexOf('info'), htmlText.lastIndexOf('clear'));
            let imageContent1 = htmlText.substring(htmlText.indexOf('pt-ll-l'));
            let imageContent2 = imageContent1.substring(imageContent1.indexOf('src') + 5);
            let image = imageContent2.substring(0, imageContent2.indexOf('"')).trim();

            let titleContent = mainContent.substring(mainContent.indexOf('title="') + 7);
            let title = titleContent.substring(0, titleContent.indexOf('">')).trim();
            if (title === '大主宰小说网手机版') {
                return
            }
            let authorContent = titleContent.substring(titleContent.indexOf('title="') + 7);
            let author = authorContent.split(' ')[0];

            let categoryContent1 = authorContent.substring(authorContent.indexOf('title="') + 7);
            let categoryContent2 = categoryContent1.substring(categoryContent1.indexOf('">') + 2);
            let category = categoryContent2.substring(0, categoryContent2.indexOf('</a>')).trim();

            let introContent = categoryContent2.substring(categoryContent2.indexOf('intro') + 7);
            let intro = introContent.substring(0, introContent.indexOf('</p>')).trim();

            let lastChapter = introContent.substring(introContent.indexOf('_blank') + 8, introContent.indexOf('</a>')).trim();

            let dateContent = introContent.substring(introContent.indexOf('</a>') + 5).trim();

            let date = dateContent.substring(0, dateContent.indexOf(')')).trim();

            let articleUrlTag = mainContent.substring(mainContent.indexOf('href') + 6, mainContent.indexOf('class="novelname"') - 2).trim();
            console.log('articleUrlTag', articleUrlTag);

            // console.log(new BookInfo(title, author, cat, shortIntro, lastChapter, date));
            return new BookInfo(title, author, category, intro, lastChapter, date, image, articleUrlTag);
        } catch (e) {
            console.warn('getBookInfoDZZ 解析失败', e.message)
        }
    }

}

export function getBookContentDZZ(htmlText, bookUrl, bookName, currentChapterNum, fontSize) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let title = htmlText.substring(htmlText.indexOf('class="title"') + 14, htmlText.indexOf('</h1>'));
            console.log('title:', title);
            let mainContent = htmlText.substring(htmlText.indexOf('class="articlecon"') + 22);
            let articleContent = mainContent.substring(0, mainContent.indexOf('</p></div>'));
            articleContent = contentFormat(_split(articleContent, '</p><p>'), fontSize);
            // console.log('articleContent',articleContent);
            let articles = [];
            for (let i = 0; i < articleContent.length; i++) {
                articles[i] = new Article(bookName, bookUrl, title, currentChapterNum, i + 1, articleContent.length, articleContent[i]);
            }
            return articles
        } catch (e) {
            console.warn('getBookContentDZZ 解析失败', e.message)
        }

    }
    console.warn('getBookContentDZZ return null');
    return null;
}

export function getBookContentPBDZS(htmlText, bookUrl, bookName, currentChapterNum, fontSize) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let title = htmlText.substring(htmlText.indexOf('_bqgmb_h1') + 11, htmlText.indexOf('</h1>'));
            console.log('title:', title);
            let mainContent = htmlText.substring(htmlText.indexOf('nr1') + 5);
            let articleContent = mainContent.substring(0, mainContent.indexOf('</div>')).trim();
            // console.log('articleContent',articleContent)
            let article = _split(articleContent, '<br />');
            // console.log('article',article)
            let newArticle = [];

            for (let i = 0; i < article.length; i++) {
                let a = article[i];
                while (a.indexOf('\n') !== -1) {
                    a = a.replace('\n', '')
                }
                while (a.indexOf('&nbsp;') !== -1) {
                    a = a.replace('&nbsp;', '')
                }
                newArticle.push(a)
            }
            newArticle = _compact(newArticle);
            // console.log('newArticle',newArticle);
            articleContent = contentFormat(newArticle, fontSize);
            // console.log('articleContent',articleContent);
            let articles = [];
            for (let i = 0; i < articleContent.length; i++) {
                articles[i] = new Article(bookName, bookUrl, title, currentChapterNum, i + 1, articleContent.length, articleContent[i]);
            }
            return articles
        } catch (e) {
            console.warn('getBookContentPBDZS 解析失败↵', e.message)
        }

    }
    console.warn('getBookContentPBDZS return null');
    return null;
}

export function getBookContentBQG(htmlText, bookUrl, bookName, currentChapterNum, fontSize) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let title = htmlText.substring(htmlText.indexOf('<h1>') + 4, htmlText.indexOf('</h1>'));
            console.log('title:', title);
            let mainContent = htmlText.substring(htmlText.indexOf('"content">') + 10);
            let articleContent = mainContent.substring(0, mainContent.indexOf('<script>')).trim();
            // console.log('articleContent',articleContent)
            let article = _split(articleContent, '<br/>');
            // console.log('article',article)
            let newArticle = [];
            for (let i = 0; i < article.length; i++) {
                // console.log('article[i]',article[i])
                if (i === 0) {
                    newArticle.push(article[i].substring(24).trim())
                } else {
                    newArticle.push(article[i].substring(26).trim())
                }
            }
            newArticle = _compact(newArticle);
            // console.log('newArticle',newArticle);
            articleContent = contentFormat(newArticle, fontSize);
            // console.log('articleContent',articleContent);
            let articles = [];
            for (let i = 0; i < articleContent.length; i++) {
                articles[i] = new Article(bookName, bookUrl, title, currentChapterNum, i + 1, articleContent.length, articleContent[i]);
            }
            // console.log(articles)
            return articles
        } catch (e) {
            console.warn('getBookContentPBDZS 解析失败', e.message)
        }

    }
    console.warn('getBookContentPBDZS return null');
    return null;
}

export function getBookContentWLZW(htmlText, bookUrl, bookName, currentChapterNum, fontSize) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let title = htmlText.substring(htmlText.indexOf('h1title') + 13, htmlText.indexOf('</h1>'));
            title = title.trim().substring(4);
            console.log('title:', title);
            let mainContent = htmlText.substring(htmlText.indexOf('contentbox clear') + 18);
            let articleContent = mainContent.substring(0, mainContent.indexOf('<center')).trim();
            // console.log('articleContent',articleContent)
            let article = _split(articleContent, '<br />');
            // console.log('article',article)
            let newArticle = [];
            for (let i = 0; i < article.length; i++) {
                let a = article[i];
                if (i === 0) {
                    a = a.substring(a.lastIndexOf('<br>') + 4).trim()
                }
                if (i === article.length - 1 && a.indexOf('</div>') !== -1) {
                    a = a.replace('</div>', '')
                }
                while (a.indexOf('\n') !== -1) {
                    a = a.replace('\n', '')
                }
                while (a.indexOf('&nbsp;') !== -1) {
                    a = a.replace('&nbsp;', '')
                }
                newArticle.push(a.trim())
            }
            newArticle = _compact(newArticle);
            // console.log('newArticle',newArticle);
            articleContent = contentFormat(newArticle, fontSize);
            // console.log('articleContent',articleContent);
            let articles = [];
            for (let i = 0; i < articleContent.length; i++) {
                articles[i] = new Article(bookName, bookUrl, title, currentChapterNum, i + 1, articleContent.length, articleContent[i]);
            }
            return articles
        } catch (e) {
            console.warn('getBookContentPBDZS 解析失败', e.message)
        }

    }
    console.warn('getBookContentPBDZS return null');
    return null;
}

export function getBookContentBQT(htmlText, bookUrl, bookName, currentChapterNum, fontSize) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let title = htmlText.substring(htmlText.indexOf('<h1>') + 4, htmlText.indexOf('</h1>'));
            console.log('title:', title);
            let mainContent = htmlText.substring(htmlText.indexOf('id="content"') + 13);
            let articleContent = mainContent.substring(0, mainContent.indexOf('<script>chapter')).trim();
            // console.log('articleContent',articleContent)
            let article = _split(articleContent, '<br/>');
            // console.log('article',article)
            let newArticle = [];
            for (let i = 0; i < article.length; i++) {
                let a = article[i];
                /* while (a.indexOf('\n') !== -1) {
                     a = a.replace('\n', '')
                 }*/
                while (a.indexOf('&nbsp;') !== -1) {
                    a = a.replace('&nbsp;', '')
                }
                newArticle.push(a.trim())
            }
            newArticle = _compact(newArticle);
            // console.log('newArticle',newArticle);
            articleContent = contentFormat(newArticle, fontSize);
            // console.log('articleContent',articleContent);
            let articles = [];
            for (let i = 0; i < articleContent.length; i++) {
                articles[i] = new Article(bookName, bookUrl, title, currentChapterNum, i + 1, articleContent.length, articleContent[i]);
            }
            return articles
        } catch (e) {
            console.warn('getBookContentBQT 解析失败', e.message)
        }

    }
    console.warn('getBookContentBQT return null');
    return null;
}

export function getBookContentBQG2(htmlText, bookUrl, bookName, currentChapterNum, fontSize) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let title = htmlText.substring(htmlText.indexOf('<h1>') + 4, htmlText.indexOf('</h1>'));
            console.log('title:', title);
            let mainContent = htmlText.substring(htmlText.indexOf('id="content"') + 13);
            let articleContent = mainContent.substring(0, mainContent.indexOf('<br>')).trim();
            // console.log('articleContent',articleContent)
            let article = _split(articleContent, '<br/>');
            // console.log('article',article)
            let newArticle = [];
            for (let i = 0; i < article.length; i++) {
                let a = article[i];
                while (a.indexOf('&nbsp;') !== -1) {
                    a = a.replace('&nbsp;', '')
                }
                newArticle.push(a.trim())
            }
            newArticle = _compact(newArticle);
            // console.log('newArticle',newArticle);
            articleContent = contentFormat(newArticle, fontSize);
            // console.log('articleContent',articleContent);
            let articles = [];
            for (let i = 0; i < articleContent.length; i++) {
                articles[i] = new Article(bookName, bookUrl, title, currentChapterNum, i + 1, articleContent.length, articleContent[i]);
            }
            return articles
        } catch (e) {
            console.warn('getBookContentBQG2 解析失败', e.message)
        }

    }
    console.warn('getBookContentBQG2 return null');
    return null;
}

export function getBookContentZSSQ(text, bookUrl, title, bookName, currentChapterNum, fontSize) {
    if (!(text === undefined || text === '')) {
        try {
            // let _string = require('lodash/string');
            // let _content = '\u3000\u3000' + text.replace(/\n/g, '@\u3000\u3000')
            let articleContent = contentFormat(text.split(/\n/g), fontSize);
            let articles = [];
            for (let i = 0; i < articleContent.length; i++) {
                articles[i] = new Article(bookName, bookUrl, title, currentChapterNum, i + 1, articleContent.length, articleContent[i]);
            }
            return articles
        } catch (e) {
            console.warn('getBookContentZSSQ 解析失败', e.message)
        }

    }
    console.warn('getSearchBookContentDZZ return null');
    return null;
}

export function getCatalogDZZ(htmlText) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let mainContent = htmlText.substring(htmlText.indexOf('three c'), htmlText.lastIndexOf('mt20 c'));
            let array = mainContent.split('href="');
            array.shift();
            let catalog = [];
            for (let i = 0; i < array.length; i++) {
                let str = array[i];
                let url = str.substring(0, str.indexOf('"'));
                let title = str.substring(str.indexOf('title="') + 7, str.lastIndexOf('" target'));
                catalog.push({num: i, url, title});
            }
            return catalog
        } catch (e) {
            console.warn('getCatalogDZZ 解析失败', e.message)
        }

    }
}

export function getCatalogBQT(htmlText) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let mainContent = htmlText.substring(htmlText.indexOf('正文</dt>'), htmlText.lastIndexOf('</dl>'));
            let array = mainContent.split('href="');
            array.shift();
            // console.log('array',array);

            let catalog = [];
            for (let i = 0; i < array.length; i++) {
                let str = array[i];
                let url = str.substring(0, str.indexOf('"'));
                let title = str.substring(str.indexOf('">') + 2, str.lastIndexOf('</a>'));
                catalog.push({num: i, url, title});
            }
            console.log('catalog', catalog);

            return catalog
        } catch (e) {
            console.warn('getCatalogDZZ 解析失败', e.message)
        }

    }
}

export function getCatalogPBDZS(htmlText) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let mainContent = htmlText.substring(htmlText.indexOf('<dl>'), htmlText.lastIndexOf('</dl>'));
            let array = mainContent.split('href="');
            array.shift();

            let catalog = [];
            for (let i = 0; i < array.length; i++) {
                let str = array[i];
                let url = str.substring(0, str.indexOf('"'));
                let title = str.substring(str.indexOf('">') + 2, str.indexOf('</a>'));
                catalog.push({num: i, url, title});
            }
            // console.log('catalog',catalog)
            return catalog
        } catch (e) {
            console.warn('getCatalogPBDZS 解析失败', e.message)
        }

    }
}

export function getCatalogWLZW(htmlText) {
    if (!(htmlText === undefined || htmlText === '')) {
        // console.log('htmlText',htmlText)
        try {
            let mainContent = htmlText.substring(htmlText.indexOf('chapterlist'), htmlText.lastIndexOf('articles'));
            let array = mainContent.split('</a>');
            array = _dropRight(array);
            let catalog = [];
            for (let i = 0; i < array.length; i++) {
                let chapter = array[i];
                let title = chapter.substring(chapter.lastIndexOf('>') + 1);
                let url = chapter.substring(chapter.indexOf('href=') + 6, chapter.lastIndexOf('>') - 1);

                catalog.push({num: i, url: url, title: title});
            }
            console.log('catalog', catalog)
            return catalog

        } catch (e) {
            console.warn('getCatalogWLZW 解析失败', e.message)
        }

    } else {
        console.warn('getCatalogWLZW 解析失败', e.message);
        return null
    }
}

export function getNotification(htmlText) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let mainContent = htmlText.substring(htmlText.indexOf('article'), htmlText.lastIndexOf('</article>'));
            let array = mainContent.split('<li>');
            array.shift();
            let title = array[0].substring(0, array[0].indexOf('<'));
            let time = array[1].substring(0, array[1].indexOf('<'));
            let content = array[2].substring(0, array[2].indexOf('<'));
            let button = array[3].substring(0, array[3].indexOf('<'));
            let url = array[4].substring(array[4].indexOf('https'), array[4].indexOf('">'));
            return {title, time, content, button, url};
        } catch (e) {
            console.warn('getNotification 解析失败', e.message)
        }

    }
    console.log('The htmlText of getNotification func for a ParseHtmlUtil cannot be empty');
    return {title: null, time: null, content: null, url: null}
}