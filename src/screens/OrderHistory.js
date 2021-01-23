import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, ActivityIndicator, StyleSheet, PermissionsAndroid, Image, Alert } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { add_item_to_cart, create_menu, increment_quantity, decrement_quantity } from '../store/actions/actionCreators';


function OrderHistory(props) {

  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {

    get_past_orders();
  }, []);

  const get_past_orders = async () => {
    await AsyncStorage.getItem('order_history')
      .then((res) => {
        setOrderHistory(JSON.parse(res));
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        centerComponent={<View>
          <Text style={{ fontSize: wp(5), color: 'white', fontWeight: 'bold' }}>ORDER HISTORY</Text>
        </View>}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: '30%' }}>
      </ScrollView>

    </SafeAreaView>
  );
}

export default connect(null, null)(OrderHistory);