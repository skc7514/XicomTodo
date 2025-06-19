import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
import Images from '../constants/Images';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};

const Header = ({ title, showBackButton = true }: HeaderProps) => {
  const navigation = useNavigation();

  return (

    <View style={styles.headerContainer}>
      <View style={styles.sideContainer}>
        {showBackButton ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            {/* <Text style={{ fontSize: 30, color: '#fff' }}>⬅</Text> */}
            <Image
              source={Images.backIcon}
              style={{ width: 24, height: 24, tintColor: '#000' }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
      </View>

      <View style={styles.sideContainer} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  sideContainer: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backButton: {
    padding: 4,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});

