import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, PermissionsAndroid, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SplashScreen = (props) => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {

      navigation.replace('main');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TutorBin Assignment</Text>
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6a627'
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp(10),
    color: 'white'
  },
  logo: {
    width: wp(90),
    height: wp(90)
  }
});