import React from 'react';
import { Animated } from 'react-native';
import { withTheme, Headline } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';




class HomeScreenCollapsedHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Animated.View
                style={{
                    flex: 1,
                    top:10,
                    color: this.props.theme.colors.white,
                    position: "absolute",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: this.props.animatedScrollPostionY.interpolate(
                        {
                            inputRange: [0, this.props.theme.homeHGrouperAreaHeight * 0.75],
                            outputRange: [1, 0],
                            extrapolate: "clamp"
                        }
                    ),
                    transform: [
                        {
                            translateY: this.props.animatedScrollPostionY.interpolate(
                                {
                                    inputRange: [0, this.props.theme.homeHGrouperAreaHeight * 0.75],
                                    outputRange: [0, -30],
                                    extrapolate: "clamp"
                                }
                            )
                        }
                    ]
                }}
            >
                <Icon
                    color={this.props.theme.colors.white}
                    size={40}
                    name="dashboard"
                    style={{
                        width: 40
                    }}
                />
                <Headline
                        style = {{
                            color: this.props.theme.colors.white,
                            flex: 1
                        }}
                    >
                        EasyStrategy
                </Headline>
            </Animated.View>
        )
    }
}




export default withTheme(HomeScreenCollapsedHeader)