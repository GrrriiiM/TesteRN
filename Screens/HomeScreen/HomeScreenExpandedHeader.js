import React from 'react';
import { Animated, View } from 'react-native';
import { withTheme, TouchableRipple, Title, Paragraph } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';



class HomeScreenExpandedHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Animated.View
                style={{
                    flex: 1,
                    opacity: this.props.animatedScrollPostionY.interpolate(
                        {
                            inputRange: [this.props.theme.homeHGrouperAreaHeight * 0.75, this.props.theme.homeHGrouperAreaHeight],
                            outputRange: [0, 1],
                            extrapolate: "clamp"
                        }
                    ),
                    transform: [
                        {
                            translateY: this.props.animatedScrollPostionY.interpolate(
                                {
                                    inputRange: [this.props.theme.homeHGrouperAreaHeight * 0.75, this.props.theme.homeHGrouperAreaHeight],
                                    outputRange: [40, 0],
                                    extrapolate: "clamp"
                                }
                            )
                        }
                    ] 
                }}
            >
                <TouchableRipple
                    onPress={this.props.onPress}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Icon
                            color = {this.props.theme.colors.white}
                            name="filter-list"
                            size={40}
                        />
                        <View
                            style={{
                                alignItems: "flex-start",
                                justifyContent: "flex-start"
                            }}
                        >
                            <Title
                                style={{
                                    margin: 0,
                                    padding: 0,
                                    color: this.props.theme.colors.white
                                }}
                            >
                                {this.props.selectedGrouperLevel1.name}
                            </Title>
                            <View
                                style={{
                                    margin: 0,
                                    padding: 0,
                                    flexDirection: "row"
                                }}
                            >
                                <Paragraph
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        color: this.props.theme.colors.white
                                    }}
                                >
                                    {this.props.selectedGrouperLevel2.name}
                                </Paragraph>
                                <Paragraph
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        marginLeft: 20,
                                        color: this.props.theme.colors.white
                                    }}
                                >
                                    {this.props.selectedGrouperLevel3.name}
                                </Paragraph>
                            </View>
                        </View>
                    </View> 
                </TouchableRipple>
            </Animated.View>
        )
    }
}


const mapStateToProps = store => ({
    selectedGrouperLevel1: store.grouperState.selectedGrouperLevel1,
    selectedGrouperLevel2: store.grouperState.selectedGrouperLevel2,
    selectedGrouperLevel3: store.grouperState.selectedGrouperLevel3
});

export default connect(mapStateToProps)(withTheme(HomeScreenExpandedHeader))
