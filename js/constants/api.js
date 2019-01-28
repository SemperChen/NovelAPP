/**
 * @author Semper
 */
//const BASE_URL = 'http://192.168.0.104:8080/';
const BASE_URL = 'http://192.168.1.120:8000/';
export const BOOKMARKS_URL = BASE_URL + 'bookmark.json';

export const baseUrl = 'http://104.168.29.114:8000/';
export const loginUrl = baseUrl+'login';
export const registerUrl = baseUrl+'register';
export const saveUrl = baseUrl+'save';

export const notificationUrl = 'https://github.com/SemperChen/Notification/blob/master/README.md';

export const M_DAIZHUZAI_URL = 'http://m.daizhuzai.com';
export const W_DAIZHUZAI_URL = 'http://www.daizhuzai.com';

const ZSSQ_BASE_URL = 'http://api.zhuishushenqi.com';
const W_ZSSQ_URL = 'http://www.zhuishushenqi.com';
export const ZSSQ_IMG_URL = 'http://statics.zhuishushenqi.com';
export const BQG_BASE_URL = 'http://www.qu.la';
export const BQT_BASE_URL = 'http://www.biquta.com';

export const ZSSQ_SEARCH = ZSSQ_BASE_URL + '/book/fuzzy-search?query=';
export const DAIZHUZAI_SEARCH = 'http://www.daizhuzai.com/search.html?searchtype=novelname&searchkey=';
export const WLZW_SEARCH = 'http://zhannei.baidu.com/cse/search?s=5516679623550761859&q=';
export const BQT_SEARCH = 'http://zhannei.baidu.com/cse/search?s=11634943235346415327&q=';

export const BQG_SEARCH = 'http://zhannei.baidu.com/cse/search?s=920895234054625192&q=';
export const BQG2_SEARCH = 'http://zhannei.baidu.com/cse/search?s=14041278195252845489&q=';
export const PBDZS_SEARCH = 'http://zhannei.baidu.com/cse/search?s=13386898804301110817&q=';
export const DDXS_SEARCH = 'http://zhannei.baidu.com/cse/search?s=5513259216532962936&q=';


export const DZZ_NAME = '大主宰网';
export const ZSSQ_NAME = '追书神器网';
export const WLZW_NAME = '武林中文网';
export const BQT_NAME = '天天中文网';
export const BQG_NAME = '笔趣阁';
export const BQG2_NAME = '笔趣阁2';
export const PBDZS_NAME = '平板电子书网';
export const DDXS_NAME = '顶点小说';

export const ZSSQ_CHARTER_BASE = 'http://chapter2.zhuishushenqi.com/chapter/';
export const BOOK_DETAIL_BASE = ZSSQ_BASE_URL + '/book/';
export const ZSSQ_CATALOG_BASE = ZSSQ_BASE_URL + '/mix-atoc/';

export const RANKINGS_URL = 'http://api.zhuishushenqi.com/ranking/gender';
export const RANKING_BASE_URL = 'http://api.zhuishushenqi.com/ranking/';
export const CATEGORY_URL = ZSSQ_BASE_URL + '/cats/lv2/statistics';
export const CATEGORY_LV2_URL = ZSSQ_BASE_URL + '/cats/lv2';
/**
 * GET 按分类获取书籍列表
 * @param gender male、female
 * @param type   hot(热门)、new(新书)、reputation(好评)、over(完结)
 * @param major  玄幻
 * @param start  从多少开始请求
 * @param minor  东方玄幻、异界大陆、异界争霸、远古神话
 * @param limit  50
 */
export const CATEGORY_BOOKS_URL = ZSSQ_BASE_URL + '/book/by-categories';

export const SPREAD_URL = W_ZSSQ_URL + '/spread';
export const OTHER_SEARCH_URLS = [
    //http://m.qu.la/
    // {siteName:'笔趣阁',searchUrl:'http://zhannei.baidu.com/cse/search?s=920895234054625192&q='},
    //http://m.x23us.com/
    // {siteName:'顶点小说',searchUrl:'http://zhannei.baidu.com/cse/search?s=5592277830829141693&q='},
    // {siteName: DZZ_NAME, searchUrl: DAIZHUZAI_SEARCH},
    // {siteName:BQG_NAME,searchUrl:BQG_SEARCH,unicodeName:'UTF-8'},
    {siteName: PBDZS_NAME, searchUrl: PBDZS_SEARCH},
    {siteName: WLZW_NAME, searchUrl: WLZW_SEARCH},
    // {siteName:BQT_NAME,searchUrl:BQT_SEARCH,unicodeName:'UTF-8'},
    // {siteName: BQG2_NAME, searchUrl: BQG2_SEARCH},

    // {siteName:DDXS_NAME,searchUrl:DDXS_SEARCH},

];
