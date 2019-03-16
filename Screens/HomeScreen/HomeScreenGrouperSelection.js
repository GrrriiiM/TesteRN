import React from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import { withTheme, Text, Headline } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    };
  
    render() {
      
      return (
        <TouchableOpacity
            onPress={this._onPress.bind(this)}
        >
            <Headline
                style={{
                    alignSelf:"center",
                    color: this.props.theme.colors.white,
                    padding: 20
                }}
            >
                {this.props.item.name}
            </Headline>
        </TouchableOpacity>
      );
    }
  }


class HomeScreenGrouperSelection extends React.Component {

    constructor(props){
        super(props);
    }

    onPressItem(i){
        this.props.onPressItem && this.props.onPressItem(i);
        this.props.selectGrouperLevel(i, this.props.levelForSelection);

    }

    render() {
        let data = this.props.groupersByLevel.find(i => i.level == this.props.levelForSelection);
        if (data){
            data = data.groupers.map(i => { return { key: i.id + '', value: i}});
        }
        return (
            <Animated.View 
                style={{
                    ...this.props.style,
                    position: "absolute",
                    height: this.props.theme.screen.height - this.props.theme.headerHeight - this.props.theme.bottomHeight,
                    left:0,
                    right:0
                }}
            >
                <FlatList
                    data={data}
                    renderItem={({item}) => 
                        <MyListItem
                            theme={this.props.theme}
                            item={item.value}
                            onPressItem={this.onPressItem.bind(this)}
                        />
                    }
                />
            </Animated.View>
        )
    }
}



const selectGrouperLevel = (grouper, level) => ({
    type: 'SELECT_GROUPER_LEVEL',
    grouper: grouper,
    level: level
});


const mapStateToProps = store => ({
    groupersByLevel: store.grouperState.groupersByLevel,
    levelForSelection: store.grouperState.levelForSelection,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectGrouperLevel }, dispatch);


export default  connect(mapStateToProps, mapDispatchToProps)(withTheme(HomeScreenGrouperSelection));