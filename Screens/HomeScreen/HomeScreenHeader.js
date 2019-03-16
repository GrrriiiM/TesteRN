import React from 'react';
import { View, Animated } from 'react-native';
import { withTheme, Title, Surface, TouchableRipple, Paragraph, Headline } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreenCollapsedHeader from './HomeScreenCollapsedHeader';
import HomeScreenExpandedHeader from './HomeScreenExpandedHeader';




class HomeScreenHeader extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Surface style={{elevation: 0}}>
                <View
                    style={{
                        flexDirection: "row",
                        height: this.props.theme.headerHeight,
                        // paddingTop: 20,
                        backgroundColor: this.props.theme.colors.accent,
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <HomeScreenCollapsedHeader
                        animatedScrollPostionY={this.props.animatedScrollPostionY}
                    />
                    <HomeScreenExpandedHeader
                        animatedScrollPostionY={this.props.animatedScrollPostionY}
                        onPress={this.props.onPressExpanded}
                    />
                    <TouchableRipple
                        onPress={console.log("Pressed")}
                    >
                        <Icon 
                            size={40}
                            color = {this.props.theme.colors.white}
                            name="account-circle"
                        />
                    </TouchableRipple>
                </View>
            </Surface>
        );
    }
}




export default withTheme(HomeScreenHeader)