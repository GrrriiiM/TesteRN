import React from 'react';
import { View, Animated } from 'react-native';
import { withTheme } from 'react-native-paper';
import HomeScreenContentAreaHeader from './HomeScreenContentAreaHeader';

class HomeScreenContentArea extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const { theme } = this.props;

        return (
            <Animated.View
                style={{
                    ...this.props.style
                }}
            >
                <HomeScreenContentAreaHeader
                    title={this.props.title}
                    option={this.props.option}
                    optionIconName={this.props.optionIconName}
                    animatedScrollPostionY={this.props.animatedScrollPostionY }
                />
                <View
                    style={{
                        backgroundColor: theme.colors.background,
                        flex: 1,
                        minHeight: 1000,
                        padding: 10,
                    }}
                >
                    {this.props.children}
                </View>
            </Animated.View>
        )
    }
}

export default withTheme(HomeScreenContentArea)