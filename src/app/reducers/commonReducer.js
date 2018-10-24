import { commonActions } from '../actions/Common/commonActionTypes'

const INITIAL_STATE = {
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case commonActions.GET_COMMON_DATA:
            console.log('Dispatched');
            const { stepchartTypeItems, statusItems } = action.payload;
            
            let stepchartTypeItemsSelect = [{ value: '', title: 'Choose Stepchart Types' }, ...stepchartTypeItems];

            let statusItemsSelect = statusItems.map(item => {
                return { value: item.status_value ,title: item.status_name}
            });
            statusItemsSelect = [{ value: '', title: 'Choose Status' }, ...statusItemsSelect];

            return {
                ...state,
                isLoading: false,
                stepchartTypeItems: stepchartTypeItemsSelect,
                statusItems: statusItemsSelect
            };
        case commonActions.REQUEST_COMMON_DATA:
            console.log('Request Common Data');
            return {
                ...state,
                isLoading: true
            }  
        case commonActions.RESET_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}

