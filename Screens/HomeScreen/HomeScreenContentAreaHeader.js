import React from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import { withTheme, Surface, TouchableRipple, Title, IconButton, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';


class HomeScreenContentAreaHeader extends React.Component {

    constructor(props){
        super(props);
    }




    render() {
        const { theme } = this.props;

        return (
            <Animated.View
                style={{
                    backgroundColor: this.props.theme.colors.accent,
                    zIndex: 1,
                    transform: [
                        { 
                            translateY: this.props.animatedScrollPostionY.interpolate(
                                {
                                    inputRange: [this.props.theme.homeHGrouperAreaHeight, 9999999],
                                    outputRange: [0, 9999999],
                                    extrapolate: "clamp"
                                }
                            ) 
                        }
                    ]
                }}
            >
                <Surface
                    style={{
                        backgroundColor: theme.colors.surface,
                        elevation: 1,
                        borderTopLeftRadius: theme.cornerRadius,
                        borderTopRightRadius: theme.cornerRadius,
                        padding: theme.cornerRadius
                    }}
                >
                    <TouchableOpacity                  
                        onPress={console.log('Pressed')}
                    >
                        <View
                            style={{
                                flexDirection: "row"
                            }}
                        >
                            <Title
                                style={{
                                    flex: 1
                                }}
                            >
                                { this.props.title }
                            </Title>
                            <View
                                style={{
                                    flexDirection: "row"
                                }}
                            >
                                <Icon
                                    color={this.props.theme.colors.text}
                                    name="event"
                                    size={30}
                                />
                                <Title>
                                    Hoje
                                </Title>
                                <Icon
                                    style={{
                                        margin: 0,
                                        paddingTop: 5
                                    }}
                                    color={this.props.theme.colors.text}
                                    name="keyboard-arrow-down"
                                    size={30}
                                />
                            </View>

                        </View>
                    </TouchableOpacity>  
                </Surface>
                {/* <FAB
                    style={{
                        elevation: 10,
                        position: "absolute",
                        right: 10,
                        top: 7
                    }}
                    icon="event"
                    label="Hoje"
                    onPress={console.log('Pressed')}
                /> */}
            </Animated.View>
        )
    }
}


export default withTheme(HomeScreenContentAreaHeader)