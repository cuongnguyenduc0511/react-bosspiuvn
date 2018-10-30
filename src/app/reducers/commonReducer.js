import { commonActions } from '../actions/Common/commonActionTypes'

const INITIAL_STATE = {
};

const STEPCHART_LEVELS = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
const COOP_STEPCHART_LEVELS = ['X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'X8', 'X9'];

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case commonActions.GET_COMMON_DATA:
            console.log('Dispatched');
            const { stepchartTypeItems, statusItems, songItems } = action.payload;

            let stepchartTypeItemsSelect = [{ value: '', title: 'Choose Stepchart Types' }, ...stepchartTypeItems];

            let statusItemsSelect = statusItems.map(item => {
                return { value: item.status_value, title: item.status_name }
            });
            statusItemsSelect = [{ value: '', title: 'Choose Status' }, ...statusItemsSelect];

            return {
                ...state,
                isLoading: false,
                stepchartTypeItems: stepchartTypeItemsSelect,
                statusItems: statusItemsSelect,
                songItems: getSongItems(songItems)
            };
        case commonActions.REQUEST_COMMON_DATA:
            return {
                ...state,
                isLoading: true
            }
        case commonActions.END_REQUEST:
            return {
                ...state,
                isLoading: false
            }
        case commonActions.FETCH_COOP_STEPCHART_LEVELS:
            let coopStepchartLevelItems = COOP_STEPCHART_LEVELS.map(item => {
                return { value: item, title: item }
            });

            coopStepchartLevelItems = [{ value: '', title: 'Choose Stepchart Level' }, ...coopStepchartLevelItems]

            return {
                ...state,
                stepchartLevelItems: coopStepchartLevelItems
            };
        case commonActions.FETCH_STANDARD_STEPCHART_LEVELS:
            let regularStepchartLevelItems = STEPCHART_LEVELS.map(item => {
                return { value: item, title: item }
            });

            regularStepchartLevelItems = [{ value: '', title: 'Choose Stepchart Level' }, ...regularStepchartLevelItems]

            return {
                ...state,
                stepchartLevelItems: regularStepchartLevelItems
            };
        case commonActions.FETCH_ALL_STEPCHART_LEVELS:
            let allStepchartLevelItems = [...STEPCHART_LEVELS, ...COOP_STEPCHART_LEVELS];

            allStepchartLevelItems = allStepchartLevelItems.map(item => {
                return { value: item, title: item }
            });
            allStepchartLevelItems = [{ value: '', title: 'Choose Stepchart Level' }, ...allStepchartLevelItems]

            return {
                ...state,
                stepchartLevelItems: allStepchartLevelItems
            };
        case commonActions.RESET_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}

function getDistinctCategory(items) {
    const distinctCategory = [...new Set(items.map(x => x.group))];
    return distinctCategory;
}

function getSongItems(items) {
    const distinctCategory = getDistinctCategory(items);
    
    const songItems = distinctCategory.map(category => {
        let options = items.filter(x => x.group === category);
        options = options.map(x => {
            return { value: x._id, label: x.name, artist: x.artist, group: x.group }
        })
        return { label: category, options: options }
    });

    return songItems;
}

