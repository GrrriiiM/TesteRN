import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';


const salesState = {
    isLoading: false,
    lastUpdate: null,
    isOffline: false,
    intervalType: 2,
    sales: []
};


export const salesReducer = (state = salesState, action) => {
    switch (action.type) {
        case 'LOAD_SALES':
            return {
                ...state,
                isLoading: true
            }
        case 'LOAD_SALES_SUCCESS_OFFLINE':
            return {
                ...state,
                isOffline: true,
                isLoading: false,
                sales: action.sales
            }
        case 'LOAD_SALES_SUCCESS':
            return {
                ...state,
                isOffline: false,
                isLoading: false,
                sales: action.sales
            }
            
        default:
            return state;
    }
};


export function loadSales(grouper1, grouper2, grouper3, intervalType) {
    
    return (dispatch) =>  {
        dispatch(loadingSales());

        let IntervalBegin = new Date(Date.now());

        IntervalBegin = new Date(2019, 2, 15);

        let IntervalEnd =  new Date(IntervalBegin.getFullYear(), IntervalBegin.getMonth(), IntervalBegin.getDate());
        //IntervalEnd.setDate(IntervalEnd.getDate() + 1);
        //IntervalEnd.setMinutes(-1);
        IntervalEnd.setHours(19);
        

        let params = `IntervalTypeId=${2}`;

        params += `&GrouperTypeId=${5}`;
        params += `&IntervalBegin=${IntervalBegin.toJSON()}`;
        params += `&IntervalEnd=${IntervalEnd.toJSON()}`;

        if (!grouper1.isTotal)
            params += `&AggregationGrouperIds=${grouper1.id}`;

        if (!grouper2.isTotal)
            params += `&AggregationGrouperIds=${grouper2.id}`;    

        let storageName = `SALES-${intervalType}-${grouper1}-${grouper2}-${grouper3}`;
        
        return fetch(`http://localhost:5000/api/sales?${params}`)
            .then((response) => {
                return response.json();
            })
            .then(sales => {
                AsyncStorage.setItem(storageName, JSON.stringify(sales), (error) => {
                    dispatch(loadSalesSuccess(sales));
                });
            })
            .catch(error => {
                AsyncStorage.getItem(storageName, (error1, sales) => {
                    dispatch(loadSalesSuccessOffline(JSON.parse(sales)));
                });
            });
    }
}


const loadingSales = () => {
    return {type: 'LOAD_SALES'};
}

const loadSalesSuccess = (sales) => {
    return {type: 'LOAD_SALES_SUCCESS', sales};
}

const loadSalesSuccessOffline = (sales) => {
    return {type: 'LOAD_GROUPERS_SUCCESS_OFFLINE', groupers: groupers, selectedGrouperIds, offline: true};
}

