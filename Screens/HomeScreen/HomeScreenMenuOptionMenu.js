import React from 'react';
import { View } from 'react-native';
import { withTheme, Text, TouchableRipple, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';




class HomeScreenMenuOptionMenu extends React.Component {

    constructor(props){                
        super(props);
    }

    onPress(){
        this.props.onPress();
    }


    render() {
        const { theme } = this.props;
        let area = null;
        if (this.props.selected){
            area = 
            <View
                style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start"
                }}
            >
                <Icon
                    color={theme.colors.white}
                    name={this.props.iconName}
                    size={50}
                    style={{
                        padding: 0,
                        margin: 0,
                        width: 60
                    }}
                />
            </View>
        } else {
            area = 
            <View
                style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    opacity: 0.7
                }}
            >
                <Icon 
                    color={theme.colors.white}
                    name={this.props.iconName}
                    size={30}
                    style={{
                        padding: 0,
                        margin: 0
                    }}
                />
                <Paragraph
                    style={{
                        color: theme.colors.white,
                        padding: 0,
                        margin: 0
                    }}
                >
                    {this.props.text}
                </Paragraph>
            </View>
        }
        return (
            <TouchableRipple
                onPress={this.onPress.bind(this)}
                style={{
                    ...this.props.style,
                    height: 60,
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}
            >
                {area}

            </TouchableRipple>
        )
    }
}




export default withTheme(HomeScreenMenuOptionMenu)