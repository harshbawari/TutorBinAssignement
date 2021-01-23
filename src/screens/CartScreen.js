import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, ActivityIndicator, StyleSheet, PermissionsAndroid, Image, Alert } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { add_item_to_cart, create_menu, increment_quantity, decrement_quantity, clear_cart } from '../store/actions/actionCreators';

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    create_menu: (menu) => dispatch(create_menu(menu)),
    add_item_to_cart: (item) => dispatch(add_item_to_cart(item)),
    increment_quantity: (itemname, quantity) => dispatch(increment_quantity(itemname, quantity)),
    decrement_quantity: (itemname, quantity) => dispatch(decrement_quantity(itemname, quantity)),
    clear_cart: () => dispatch(clear_cart()),
  }
}


function CartScreen(props) {
  const navigation = useNavigation();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_cartItems_from_asyncstorage();

    get_total();
  }, [props.cartItems]);

  const get_cartItems_from_asyncstorage = async () => {
    await AsyncStorage.getItem('current_cart_order')
      .then((res) => {
        setCartItems(JSON.parse(res));
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }

  const get_total = async () => {
    let temp_total = 0;

    props.cartItems.map((cartItem) => {
      temp_total = temp_total + cartItem.quantity * parseFloat(cartItem.price);
    });

    setTotal(temp_total);
    setLoading(false);
  }


  const handleComplete = async () => {
    let updatedOrders = [];

    await AsyncStorage.getItem('order_history')
      .then(async (res) => {
        const pastOrders = JSON.parse(res);

        updatedOrders = pastOrders === null ? [...cartItems] : [...pastOrders, ...cartItems];
      })
      .then(async () => {
        await AsyncStorage.removeItem('order_history')
          .then(async () => {
            await AsyncStorage.setItem('order_history', JSON.stringify(updatedOrders))
              .catch((error) => {
                throw (error);
              })
          })
      })
      .then(() => {
        props.clear_cart();
        navigation.replace('orderHistory');
      })
      .catch((error) => {
        Alert.alert('OOPS!', error.toString());
        console.log('Error in placing order: ', error);
      });
  }

  const renderCartItems = props.cartItems.map((item, itemIndex) => {
    const minQuantity = item.quantity;

    return (
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey', paddingVertical: '3%', paddingHorizontal: '2%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} key={itemIndex.toString()}>
        <View style={{ justifyContent: 'center', flex: 4 }}>
          <Text style={{ fontSize: wp(5), fontWeight: 'bold' }}>{item.name}</Text>
          <Text style={{ color: 'grey', fontSize: wp(4) }}>$ {item.price}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: '#f55e00', borderWidth: wp(0.5), borderRadius: wp(5), width: wp(20), height: wp(8) }}>
            {props.cartItems.find((cartItem) => cartItem.name === item.name)
              ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => {
                    if (item.quantity > cartItems.find((cartItem) => cartItem.name === item.name).quantity) {
                      props.decrement_quantity(item.name, 1);
                    }
                  }}>
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
                  <TouchableOpacity onPress={() => {
                    props.increment_quantity(item.name, 1);
                  }}>
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
            }
          </View>
        </View>
      </View>
    );
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        centerComponent={<View>
          <Text style={{ fontSize: wp(5), color: 'white', fontWeight: 'bold' }}>CART</Text>
        </View>}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: '30%' }}>
        {renderCartItems}
      </ScrollView>

      <View style={{ flex: 1, position: 'absolute', bottom: '5%', alignSelf: 'center', width: wp(80), height: wp(20), borderRadius: wp(3), backgroundColor: 'orange' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ fontSize: wp(5), fontWeight: 'bold' }}>Order Total: </Text>
          <Text style={{ fontSize: wp(5), color: 'grey' }}>$ {total}</Text>
        </View>
        <View style={{ flex: 1, margin: '4%', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => handleComplete()}>
            <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: wp(5), height: wp(10), width: wp(50), backgroundColor: 'blue' }}>
              <Text style={{ fontSize: wp(6), color: 'white', fontWeight: 'bold' }}>Complete!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);