import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { salesReducer } from './SalesStore';

const grouperState = {
    isLoadingGrouper: true,
    groupersByLevel: [],
    levelForSelection: 0,
    countGrouperLevel: 0,
    selectedGrouperLevel1 : {},
    selectedGrouperLevel2 : {},
    selectedGrouperLevel3 : {},
    isSelection: false,
    grouperOffline: false
};


const grouperReducer = (state = grouperState, action) => {
    switch (action.type) {
        case 'LOAD_GROUPERS':
            return {
                ...state,
                isLoadingGrouper: true
            }
        case 'LOAD_GROUPERS_SUCCESS_OFFLINE':
        case 'LOAD_GROUPERS_SUCCESS':
            let groupersByLevel = action.groupers.reduce((g, i) => {
                let gn = g.find(x => {
                    return x.level == i.grouperTypeLevel
                });
                if (gn == null) {
                    gn = {
                        level: i.grouperTypeLevel,
                        groupers: []
                    };
                    g.push(gn);
                }
                gn.groupers.push(i);
                return g;
            },[]);

            groupersByLevel = groupersByLevel.sort((a, b) => a.level - b.level);

            let selectedGrouperLevel1;
            let selectedGrouperLevel2;
            let selectedGrouperLevel3;
            
            if (action.selectedGrouperIds && action.selectedGrouperIds.level1Id)
                selectedGrouperLevel1 = groupersByLevel.find(i => i.level == 1).groupers.find(i => i.id == action.selectedGrouperIds.level1Id);

            if (action.selectedGrouperIds && action.selectedGrouperIds.level2Id)
                selectedGrouperLevel2 = groupersByLevel.find(i => i.level == 2).groupers.find(i => i.id == action.selectedGrouperIds.level2Id);

            if (action.selectedGrouperIds && action.selectedGrouperIds.level3Id)
                selectedGrouperLevel3 = groupersByLevel.find(i => i.level == 3).groupers.find(i => i.id == action.selectedGrouperIds.level3Id);


            if (!selectedGrouperLevel1)
                selectedGrouperLevel1 = groupersByLevel.find(i => i.level == 1).groupers[0];
            
            if (!selectedGrouperLevel2)
                selectedGrouperLevel2 = groupersByLevel.find(i => i.level == 2).groupers[0];
            
            if (!selectedGrouperLevel3)
                selectedGrouperLevel3 = groupersByLevel.find(i => i.level == 3).groupers[0];

            // groupersByLevel.forEach(i => i.groupers[0].selected = true);

            return {
                ...state,
                isLoadingGrouper: false,
                groupersByLevel: groupersByLevel,
                countGrouperLevel: groupersByLevel.length,
                selectedGrouperLevel1: selectedGrouperLevel1,
                selectedGrouperLevel2: selectedGrouperLevel2,
                selectedGrouperLevel3: selectedGrouperLevel3
            }
        case 'LEVEL_SELECTION':
            return {
                ...state,
                levelForSelection: action.level,
                isSelection: true,
                grouperOffline: !!action.grouperOffline
            }
        case 'SELECT_GROUPER_LEVEL':

            let selectedGrouperIds = {
                level1Id: state.selectedGrouperLevel1.id,
                level2Id: state.selectedGrouperLevel2.id,
                level3Id: state.selectedGrouperLevel3.id,
            };

            if (action.level == 1) {
                selectedGrouperIds.level1Id = action.grouper.id;
                AsyncStorage.setItem('SELECTED_GROUPER_IDS', JSON.stringify(selectedGrouperIds));
                return {
                    ...state,
                    selectedGrouperLevel1: action.grouper,
                    isSelection: false
                };
            }

            if (action.level == 2) {
                selectedGrouperIds.level2Id = action.grouper.id;
                AsyncStorage.setItem('SELECTED_GROUPER_IDS', JSON.stringify(selectedGrouperIds));
                return {
                    ...state,
                    selectedGrouperLevel2: action.grouper,
                    isSelection: false
                };
            }

            if (action.level == 3) {
                selectedGrouperIds.level3Id = action.grouper.id;
                AsyncStorage.setItem('SELECTED_GROUPER_IDS', JSON.stringify(selectedGrouperIds));
                return {
                    ...state,
                    selectedGrouperLevel3: action.grouper,
                    isSelection: false
                };
            }
            
        default:
            return state;
    }
};


export function loadGroupers() {
    


    return (dispatch) =>  {
        dispatch(loadingGroupers());
        return fetch('http://localhost:5000/api/groupers')
            .then((response) => {
                return response.json();
            })
            .then(groupers => {
                AsyncStorage.setItem('GROUPERS', JSON.stringify(groupers), (error) => {
                    AsyncStorage.getItem('SELECTED_GROUPER_IDS', (error, selectedGrouperIds) => {
                        dispatch(loadGroupersSuccess(groupers, JSON.parse(selectedGrouperIds)));
                    });
                    
                });
            })
            .catch(error => {
                AsyncStorage.getItem('GROUPERS', (error1, groupers) => {
                    AsyncStorage.getItem('SELECTED_GROUPER_IDS', (error2, selectedGrouperIds) => {
                        dispatch(loadGroupersSuccessOffline(JSON.parse(groupers), JSON.parse(selectedGrouperIds)));
                    });
                });
            });
    }
}


const loadingGroupers = () => {
    return {type: 'LOAD_GROUPERS'};
}

const loadGroupersSuccess = (groupers, selectedGrouperIds) => {
    return {type: 'LOAD_GROUPERS_SUCCESS', groupers, selectedGrouperIds};
}

const loadGroupersSuccessOffline = (groupers, selectedGrouperIds) => {
    return {type: 'LOAD_GROUPERS_SUCCESS_OFFLINE', groupers: groupers, selectedGrouperIds, offline: true};
}


const reducers = combineReducers({
    grouperState: grouperReducer,
    salesState: salesReducer
})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

//store.dispatch(loadGroupers());

export default store;
