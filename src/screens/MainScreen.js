import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, ActivityIndicator, StyleSheet, PermissionsAndroid, Image, Alert } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Store funcs
import { add_item_to_cart, create_menu, increment_quantity, decrement_quantity } from '../store/actions/actionCreators';

const mapStateToProps = state => {
  return {
    menuItems: state.menu.menuItems,
    cartItems: state.cart.cartItems,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    create_menu: (menu) => dispatch(create_menu(menu)),
    add_item_to_cart: (item) => dispatch(add_item_to_cart(item)),
    increment_quantity: (itemname, quantity) => dispatch(increment_quantity(itemname, quantity)),
    decrement_quantity: (itemname, quantity) => dispatch(decrement_quantity(itemname, quantity)),
  }
}

function MainScreen(props) {
  const navigation = useNavigation();

  const [menu, setMenu] = useState({
    cat1: [{ name: 'XYZ', price: 100, instock: true }, { name: 'ABC', price: 934, instock: false }, { name: 'OTR', price: 945, instock: true }, { name: 'SLG', price: 343, instock: true }, { name: 'KGN', price: 342, instock: true }, { name: 'GDS', price: 234, instock: true }, { name: 'KNL', price: 934, instock: true }, { name: 'GLM', price: 320, instock: true }, { name: 'DKF', price: 394, instock: false }, { name: 'VFS', price: 854, instock: true },],
    cat2: [{ name: 'NA', price: 124, instock: true }, { name: 'DS', price: 953, instock: true }, { name: 'HF', price: 100, instock: true }, { name: 'FJ', price: 583, instock: true }, { name: 'LS', price: 945, instock: false }, { name: 'TR', price: 394, instock: true }, { name: 'PD', price: 35, instock: true }, { name: 'AL', price: 125, instock: true }, { name: 'TK', price: 129, instock: true }, { name: 'PG', price: 294, instock: true },],
    cat3: [{ name: 'A', price: 294, instock: true }, { name: 'B', price: 125, instock: true }, { name: 'C', price: 256, instock: true }, { name: 'D', price: 100, instock: true }, { name: 'E', price: 100, instock: true }, { name: 'F', price: 530, instock: true }, { name: 'G', price: 100, instock: true }, { name: 'H', price: 100, instock: true }, { name: 'I', price: 395, instock: true },],
    cat4: [{ name: 'J', price: 100, instock: true }, { name: 'K', price: 100, instock: true }, { name: 'L', price: 125, instock: false }, { name: 'M', price: 530, instock: true }, { name: 'N', price: 100, instock: true }, { name: 'O', price: 395, instock: true }, { name: 'P', price: 100, instock: true }, { name: 'Q', price: 400, instock: true }, { name: 'R', price: 100, instock: true }, { name: 'S', price: 256, instock: true },],
    cat5: [{ name: 'T', price: 100, instock: false }, { name: 'U', price: 100, instock: true }, { name: 'V', price: 395, instock: true }, { name: 'W', price: 100, instock: true }, { name: 'X', price: 100, instock: false }, { name: 'Y', price: 125, instock: true }, { name: 'Z', price: 530, instock: true },],
    cat6: [{ name: 'ABCD', price: 400, instock: true }, { name: 'PROS', price: 256, instock: true }, { name: 'NFDD', price: 200, instock: true }, { name: 'LFKR', price: 200, instock: true },]
  });

  useEffect(() => {

    props.create_menu(menu);

  }, []);

  const handle_place_order = async () => {
    console.log('Placing Order', props.cartItems);
    if (props.cartItems.length < 1) {
      Alert.alert('OOPS!', 'Please add items!');
      return;
    }

    await AsyncStorage.removeItem('current_cart_order')
      .then(async () => {
        await AsyncStorage.setItem('current_cart_order', JSON.stringify(props.cartItems))
          .catch((error) => {
            throw (error);
          })
      })
      .then(() => {
        navigation.navigate('cart');
      })
      .catch((error) => {
        Alert.alert('OOPS!', error.toString());
        console.log('Error: ', error);
      });

  }

  const renderMenuCats = props.menuItems.map((menuCategory, index) => {
    return (
      <View key={index.toString()}>
        <View style={{ borderWidth: 0.5, paddingVertical: '4%' }}>
          <Text style={{ fontSize: wp(5), color: 'grey' }}>Category {index.toString()}</Text>
        </View>
        <View>
          {
            menuCategory.map((item, itemIndex) => {
              return (
                <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey', paddingVertical: '3%', paddingHorizontal: '2%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} key={itemIndex.toString()}>
                  <View style={{ justifyContent: 'center', flex: 4 }}>
                    <Text style={{ fontSize: wp(5), fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ color: 'grey', fontSize: wp(4) }}>$ {item.price}</Text>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: '#f55e00', borderWidth: wp(0.5), borderRadius: wp(5), width: wp(20), height: wp(8) }}>
                      {item.instock
                        ? props.cartItems.find((cartItem) => cartItem.name === item.name)
                          ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                              <TouchableOpacity onPress={() => props.decrement_quantity(item.name, 1)}>
                                <Icon
                                  name='minus'
                                  type='ant-design'
                                  color='#f55e00'
                                />
                              </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ color: '#f55e00' }}>{props.cartItems.find((cartItem) => cartItem.name === item.name).quantity}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                              <TouchableOpacity onPress={() => props.increment_quantity(item.name, 1)}>
                                <Icon
                                  name='plus'
                                  type='ant-design'
                                  color='#f55e00'
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          : <TouchableOpacity onPress={() => props.add_item_to_cart({ ...item, quantity: 1 })}>
                            <Text style={{ fontWeight: 'bold', color: '#f55e00', fontSize: wp(5) }}>ADD</Text>
                          </TouchableOpacity>
                        : <View>
                          <Text style={{ color: 'grey' }}>Out of Stock!</Text>
                        </View>
                      }
                    </View>
                  </View>
                </View>
              );
            })
          }
        </View>
      </View >
    );
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        centerComponent={<View>
          <Text style={{ fontSize: wp(5), color: 'white', fontWeight: 'bold' }}>MENU</Text>
        </View>}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: '5%' }}>
        {renderMenuCats}
      </ScrollView>

      <View style={{ flex: 1, position: 'absolute', bottom: '2%', alignSelf: 'center', width: wp(80), height: wp(20), borderRadius: wp(3) }}>
        <View style={{ margin: '4%', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => handle_place_order()}>
            <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: wp(5), height: wp(10), width: wp(50), backgroundColor: 'orange' }}>
              <Text style={{ fontSize: wp(6), color: 'white', fontWeight: 'bold' }}>Place Order</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);