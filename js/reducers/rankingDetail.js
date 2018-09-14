/**
 * @author Semper
 */
import {CLEAR_RANKING_DETAIL, RECEIVE_RANKING_DETAIL, REQUEST_RANKING_DETAIL} from "../constants/ActionTypes";
import {RANKING_TYPE} from "../constants/constants";

const initialState = {
    isFetchingWeekRanking: false,
    isFetchingMonthRanking: false,
    isFetchingTotalRanking: false
};
export default function rankingDetail(state = initialState, action) {
    switch (action.type) {
        case REQUEST_RANKING_DETAIL:
            switch (action.rankingType){
                case RANKING_TYPE.MONTH:
                    return {
                        ...state,
                        isFetchingMonthRanking: true
                    };
                case RANKING_TYPE.TOTAL:
                    return {
                        ...state,
                        isFetchingTotalRanking:true
                    };
                default:
                    return {
                        ...state,
                        isFetchingWeekRanking:true
                    };
            }
        case RECEIVE_RANKING_DETAIL:
            switch (action.rankingType){
                case RANKING_TYPE.MONTH:
                    return {
                        ...state,
                        monthRankingData:action.rankingDetailData,
                        isFetchingMonthRanking: false
                    };
                case RANKING_TYPE.TOTAL:
                    return {
                        ...state,
                        totalRankingData:action.rankingDetailData,
                        isFetchingTotalRanking:false
                    };
                default:
                    return {
                        ...state,
                        weekRankingData:action.rankingDetailData,
                        isFetchingWeekRanking:false
                    };
            }
        case CLEAR_RANKING_DETAIL:
            return {
                ...state,
                monthRankingData:undefined,
                isFetchingMonthRanking: false,
                totalRankingData:undefined,
                isFetchingTotalRanking: false,
                weekRankingData:undefined,
                isFetchingWeekRanking: false
            };
        default:
            return state;
    }
}
