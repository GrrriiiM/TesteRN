import React from 'react';
import { View } from 'react-native';
import { withTheme, Title, Surface, Colors } from 'react-native-paper';
import { VictoryArea, VictoryStack, VictoryLine, VictoryChart, VictoryAxis, VictoryLabel } from 'victory-native'
import { connect } from 'react-redux';

class HomeSalesChart extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: {
                minX: 7,
                maxX: 15,
                minY: 0,
                maxY: 50000,
                values: [
                    { 
                        color: Colors.red900,
                        data: [
                            { x:7, y:0 }, { x: 8, y: 2342 }, { x: 9, y: 3232 }, { x: 10, y: 3532 }, { x: 11, y: 4123 }, { x: 12, y: 4894 }, { x: 13, y: 5133 }
                        ]
                    },
                    { 
                        color: Colors.blue900,
                        data: [
                            { x: 8, y: 1243 }, { x: 9, y: 1564 }, { x: 10, y: 2342 }, { x: 11, y: 3452 }, { x: 12, y: 5421 }, { x: 13, y: 6532 }
                        ]
                    },
                    { 
                        color: Colors.green900,
                        data: [
                            { x: 8, y: 432 }, { x: 9, y: 542 }, { x: 10, y: 1543 }, { x: 11, y: 2343 }, { x: 12, y: 3212 }, { x: 13, y: 3543 }
                        ]
                    },
                    { 
                        color: Colors.orange900,
                        data: [
                            { x: 8, y: 234 }, { x: 9, y: 432 }, { x: 10, y: 1532 }, { x: 11, y: 2232 }, { x: 12, y: 2453 }, { x: 13, y: 3212 }
                        ]
                    },
                    { 
                        color: Colors.purple900,
                        data: [
                            { x: 8, y: 3212 }, { x: 9, y: 6542 }, { x: 10, y: 7652 }, { x: 11, y: 9874 }, { x: 12, y: 10875 }, { x: 13, y: 11243 }
                        ]
                    }
                ]
            }
        }
    }

    renderStack(data) {
        return data.values.map((v, i) => 
            <VictoryArea 
                key={i + ""}
                style={{
                    data: {
                        fill: v.color
                    }
                }}
                data={v.data}
            />
        )

    }

    sumValuesY(data){
        var sum = 0
        for(let value of data.values){
            var y = value.data[value.data.length - 1].y;
            sum += y;
        }
        return sum;
    }

    maxValuesX(data){
        var max = 0
        for(let value of data.values){
            var x = value.data[value.data.length - 1].x;
            if (max < x) max = x;
        }
        return max;
    }

    _createData(){
        let values = this.props.sales.reduce((g, i) => {
            let gn = g.find(x => {
                return x.referenceId == i.referenceId
            });
            if (gn == null) {
                gn = {
                    referenceId: i.referenceId,
                    referenceDescription: i.referenceDescription,
                    color: Colors[i.grouperColor], 
                    order: i.grouperOrder,
                    data: [{x: 7, y: 0}]
                };
                g.push(gn);
            }

            let interval = new Date(i.intervalEnd);
            interval.setMinutes(interval.getMinutes() + 1)
            let x = interval.getHours();
            let y = Math.round(i.value);
            gn.data.push({
                x: x,
                y: y
            });
            return g;
        },[]);

        values = values.sort((a,b) => a.order - b.order);

        for(let value of values) {
            value.data = value.data.sort((a,b) => a.x - b.x);
            value.data = value.data.reduce((a, b) => {
                let n = b;
                if (a.length){
                    n.y = n.y + a[a.length-1].y;
                }
                a.push(n);
                return a;
            },[]);
        }

        var data = {
            minX: 7,
            maxX: 23,
            minY: 0,
            maxY: 120000,
            values: values
        }

        return data;

    }

    render() {

        var data = this._createData();

        const { theme } = this.props;

        return (
            <Surface
                style={{
                    height: 250,
                    elevation: 1,
                    marginTop: 10,
                    borderRadius: 5,
                    padding: 10
                }}
                pointerEvents="none"
            >
                <Title
                    style={{
                        marginBottom: 10
                    }}
                >
                    Venda x Período
                </Title>
                <VictoryChart
                    height={190}
                    padding={{top:20, bottom:25, left:0, right:40}}
                >
                    <VictoryArea 
                        style={{
                            data: {
                                fill: Colors.grey400,
                            }
                        }}
                        data={[
                            { 
                                x: this.maxValuesX(data),
                                y: this.sumValuesY(data)
                            },
                            { 
                                x: data.maxX,
                                y: data.maxY
                            }
                        ]}
                    />
                    <VictoryAxis 
                        dependentAxis
                        style={{
                            grid: {stroke: Colors.grey500, opacity: 0.5},
                        }}
                        tickLabelComponent = {<VictoryLabel dx={40} dy={-10} />}
                        tickFormat={(t) => `${Math.round(t / 1000)}k`}
                        
                    />
                    <VictoryAxis 
                        style={{
                            grid: {stroke: Colors.grey500, opacity: 0.5},
                        }}
                        tickCount={6}
                        tickFormat={(t) => `${t.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}H`}
                        
                    />

                    <VictoryStack>
                        {this.renderStack(data)}
                    </VictoryStack>
                    <VictoryArea
                        style={{
                            data: { 
                                fill: Colors.grey700,
                                opacity: 0.3,
                                stroke: Colors.grey700
                            },
                        }}
                        data={[
                            { x: data.minX, y: data.minY },
                            { x: data.maxX, y: data.maxY }
                        ]}
                    />
                    
                </VictoryChart>
            </Surface>
        )
    }
}

const mapStateToProps = store => ({
    sales: store.salesState.sales
});


export default  connect(mapStateToProps)(withTheme(HomeSalesChart));