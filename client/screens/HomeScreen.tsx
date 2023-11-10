import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {};

const HomeScreen = (props: Props) => {


  return (
    <SafeAreaView>
      <Text >HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
