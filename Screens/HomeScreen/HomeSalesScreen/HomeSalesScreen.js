import React from 'react';
import { AppRegistry,
    StyleSheet,
    
    View, processColor } from 'react-native';
import { withTheme, Card, Text, Headline, Title } from 'react-native-paper';
import HomeScreenContentArea from '../HomeScreenContentArea';
import {LineChart} from 'react-native-charts-wrapper'
import HomeSalesChart from './HomeSalesChart';

class HomeSalesScreen extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const { theme } = this.props;

        return (
            <HomeScreenContentArea
                title="Vendas"
                option="Hoje"
                optionIconName="keyboard-arrow-down"
                animatedScrollPostionY={this.props.animatedScrollPostionY}
                style={{
                    ...this.props.style
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        paddingTop: 10
                    }}
                    >
                    <Card
                        style={{
                            flex: 1,
                            marginRight: 5
                        }}
                    >
                        <Card.Title title="Realizado"/>
                        <Card.Content>
                            <Headline>R$ 235.654</Headline>
                        </Card.Content>
                    </Card>
                    <Card
                        style={{
                            flex: 1,
                            marginLeft: 5
                        }}
                    >
                        <Card.Content>
                            <Title>Meta</Title>
                            <Headline>R$ 250.000</Headline>
                        </Card.Content>
                    </Card>
                </View>
                <HomeSalesChart/>
            </HomeScreenContentArea>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF'
    },
    chart: {
      flex: 1
    }
});

export default withTheme(HomeSalesScreen)