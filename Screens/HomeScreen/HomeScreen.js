import React from 'react';
import { ScrollView, Dimensions, Animated, View, Easing, StyleSheet } from 'react-native'
import { SafeAreaView  } from "react-navigation";
import { withTheme, Text, TouchableRipple, Headline } from 'react-native-paper';
import HomeScreenHeader from './HomeScreenHeader';
import HomeScreenMenuArea from './HomeScreenMenuArea';
import HomeScreenGrouperArea from './HomeScreenGrouperArea';
import HomeSalesScreen from './HomeSalesScreen/HomeSalesScreen';
import HomeScreenGrouperSelection from './HomeScreenGrouperSelection';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadGroupers } from  '../../Stores/MainStore';
import { loadSales } from  '../../Stores/SalesStore';


class HomeScreen extends React.Component {

    constructor(props){
        super(props);
        theme = this.props.theme;
        this.animatedScrollPostionY = new Animated.Value(0);
        this.animatedContentAreaTranslationY = new Animated.Value(0);
    }

    componentDidMount(){
        this.props.dispatch(loadGroupers());
    }

    shouldComponentUpdate(a, b, c, d){
        return false;
    }
    
    onScrollEndSnapToEdge(ev) {
        const y = ev.nativeEvent.contentOffset.y;
        if (0 < y && y < this.props.theme.homeHGrouperAreaHeight / 2) {
            if (_scrollView) {
                _scrollView.scrollTo({y: 0});
            }
        } else if (this.props.theme.homeHGrouperAreaHeight / 2 <= y && y < this.props.theme.homeHGrouperAreaHeight) {
            if (_scrollView) {
                _scrollView.scrollTo({y: this.props.theme.homeHGrouperAreaHeight});
            }
        }
    };

    showGrouperFilter() {
        _scrollView.scrollTo({y: 0});
    }

    openGrouperArea() {
        
        Animated.timing(
            this.animatedContentAreaTranslationY,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }
        ).start()
        _homeScreenMenuArea.hideMenu();

        requestAnimationFrame(() => {
            _scrollView.setNativeProps({ scrollEnabled: false });
        })
    }

    closeGrouperArea() {
        
        Animated.timing(
            this.animatedContentAreaTranslationY,
            {
                toValue: 0,
                duration: 300,
                //easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            }
        ).start(this._loadSales.bind(this));
        
        _homeScreenMenuArea.closeMenu();

        requestAnimationFrame(() => {
            _scrollView.setNativeProps({ scrollEnabled: true });
        })

        


    }

    _loadSales(){
        this.props.dispatch(
            loadSales(
                this.props.selectedGrouperLevel1,
                this.props.selectedGrouperLevel2,
                this.props.selectedGrouperLevel3,
                this.props.intervalType,
            ));
    }


    render() {
        return (
            <SafeAreaView
                style={{
                    backgroundColor: this.props.theme.colors.accent,
                    // height: this.props.theme.screen.height
                    // style={{
                    //     height: this.props.theme.screen.height
                    // }}
                }}
            >
                <HomeScreenHeader
                        animatedScrollPostionY={this.animatedScrollPostionY}
                        onPressExpanded={this.showGrouperFilter.bind(this)}
                    />
                    <Animated.ScrollView
                        ref={scrollView => {
                            _scrollView = scrollView ? scrollView._component : null;
                        }}
                        // scrollEnabled={!this.props.isSelection}
                        onScrollEndDrag={this.onScrollEndSnapToEdge.bind(this)}
                        onMomentumScrollEnd={this.onScrollEndSnapToEdge.bind(this)}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {contentOffset: {y: this.animatedScrollPostionY}},
                                },
                            ],
                            {
                                useNativeDriver: true,
                            }
                        )}
                    >
                        <HomeScreenGrouperArea
                            onPressGrouper1={this.openGrouperArea.bind(this)}
                            animatedValue={this.animatedContentAreaTranslationY}
                            style={{
                                transform: [
                                    {
                                        translateY: this.animatedScrollPostionY
                                    }
                                ]
                            }}
                        />
                        <HomeScreenGrouperSelection
                            onPressItem={this.closeGrouperArea.bind(this)}
                            style={{
                                opacity: this.animatedContentAreaTranslationY.interpolate({
                                    inputRange: [0.5, 1],
                                    outputRange: [0, 1],
                                    extrapolate: "clamp"
                                }),
                                transform: [
                                    { 
                                        translateY: this.animatedContentAreaTranslationY.interpolate({
                                            inputRange: [0, 0.01, 0.3, 1],
                                            outputRange: [9999, 200, 200, 0],
                                            extrapolate: "clamp"
                                        })
                                    }
                                ]
                            }}
                        />
                        <HomeSalesScreen
                            animatedScrollPostionY={this.animatedScrollPostionY}
                            style={{
                                transform: [
                                    {
                                        translateY: this.animatedContentAreaTranslationY.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, (theme.screen.height - theme.homeHGrouperAreaHeight) - 150],
                                            extrapolate: "clamp"
                                        })
                                    }
                                ]
                            }}
                        />
                    </Animated.ScrollView>
                    <HomeScreenMenuArea
                        ref={v => {
                            _homeScreenMenuArea = v ? v : null;
                        }}
                    />
            </SafeAreaView>
        )
    }
}


// const loadGroupers = (grouper) => ({
//     type: 'LOAD_GROUPERS'
// });

const mapStateToProps = store => ({
    isLoadingGrouper: store.grouperState.isLoadingGrouper,
    isSelection: store.grouperState.isSelection,
    selectedGrouperLevel1 : store.grouperState.selectedGrouperLevel1,
    selectedGrouperLevel2 : store.grouperState.selectedGrouperLevel2,
    selectedGrouperLevel3 : store.grouperState.selectedGrouperLevel3,
    intervalType: store.salesState.intervalType,
});

// const mapDispatchToProps = dispatch =>
//     bindActionCreators({ loadGroupers }, dispatch);


export default  connect(mapStateToProps
    // , mapDispatchToProps
    )(withTheme(HomeScreen));