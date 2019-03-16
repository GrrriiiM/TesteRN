import React from 'react';
import { View, Animated } from 'react-native';
import { withTheme, Text } from 'react-native-paper';
import HomeScreenGrouperButton from './HomeScreenGrouperButton';
import HomeScreenGrouperSelection from './HomeScreenGrouperSelection';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class HomeScreenGrouperArea extends React.Component {

    constructor(props){
        super(props);
    }

    onPressGrouper1() {
        this.props.onPressGrouper1 && this.props.onPressGrouper1();
        this.props.loadGroupersLevel(1);
    }

    onPressGrouper2() {
        this.props.onPressGrouper1 && this.props.onPressGrouper1();
        this.props.loadGroupersLevel(2);
    }

    onPressGrouper3() {
        this.props.onPressGrouper1 && this.props.onPressGrouper1();
        this.props.loadGroupersLevel(3);
    }

    render() {
        // let selectedGrouperLevel1 = this.props.selectedGrouperLevel1.find(i => i.level == 1);
        // selectedGrouperLevel1 = selectedGrouperLevel1.groupers.find(i => i.selected);
        // let selectedGrouperLevel2 = this.props.groupersByLevel.find(i => i.level == 2).groupers.find(i => i.selected);
        // let selectedGrouperLevel3 = this.props.groupersByLevel.find(i => i.level == 3).groupers.find(i => i.selected);

        return (
            <Animated.View 
                style={{
                    ...this.props.style,
                    height: this.props.theme.homeHGrouperAreaHeight,
                    padding: 20
                }}
            >

                <Animated.View
                    style={{
                        flex: 1,
                        justifyContent: "space-around",
                        alignItems: "stretch",
                        opacity: this.props.animatedValue.interpolate({
                            inputRange: [0, 0.5],
                            outputRange: [1, 0],
                            extrapolate: "clamp"
                        }),
                        transform: [
                            {
                                translateY: this.props.animatedValue.interpolate({
                                    inputRange: [0, 0.5],
                                    outputRange: [0, 50],
                                    extrapolate: "clamp"
                                })
                            }
                        ]
                    }}
                >
                    <HomeScreenGrouperButton
                        text={this.props.selectedGrouperLevel1.name}
                        iconName="business"
                        onPress={this.onPressGrouper1.bind(this)}
                    />
                    <HomeScreenGrouperButton
                        text={this.props.selectedGrouperLevel2.name}
                        iconName="bookmark"
                        onPress={this.onPressGrouper2.bind(this)}
                    />
                    <HomeScreenGrouperButton
                        text={this.props.selectedGrouperLevel3.name}
                        iconName="shopping-cart"
                        onPress={this.onPressGrouper3.bind(this)}
                    />
                </Animated.View>
            </Animated.View>
        )
    }
}


const loadGroupersLevel = (level) => ({
    type: 'LEVEL_SELECTION',
    level: level
});


const mapStateToProps = store => ({
    selectedGrouperLevel1: store.grouperState.selectedGrouperLevel1,
    selectedGrouperLevel2: store.grouperState.selectedGrouperLevel2,
    selectedGrouperLevel3: store.grouperState.selectedGrouperLevel3
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadGroupersLevel }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(HomeScreenGrouperArea));