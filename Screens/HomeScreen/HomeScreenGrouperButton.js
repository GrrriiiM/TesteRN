import React from 'react';
import { View } from 'react-native'
import { TouchableRipple, IconButton, Text, withTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';


class HomeScreenGrouperButton extends React.Component {

    

    render() {
        const { theme } = this.props;
        return (
            <TouchableRipple
                onPress={this.props.onPress}
                style={{
                    backgroundColor: theme.colors.primary,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Icon 
                        size={30}
                        color={theme.colors.white}
                        name={this.props.iconName}
                        style={{
                            padding:10
                        }}
                    />
                    <Text
                        style={{
                            color: theme.colors.white
                        }}
                    >
                        {this.props.text}
                    </Text>
                </View>
            </TouchableRipple>
        )
    }
}

export default withTheme(HomeScreenGrouperButton)