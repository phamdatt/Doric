import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_NAME } from '../../screensContants/contants';
import { Button } from 'native-base';

function UserLoginSection() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.buttonCol}>
        <Button
          size="md"
          onPress={() => {
            navigation.navigate(SCREEN_NAME.LOGINSCREEN);
          }}
          backgroundColor="black"
        >
          Đăng nhập
        </Button>
      </View>

      <View style={styles.buttonCol}>
        <Button
          variant="unstyled"
          onPress={() => {
            navigation.navigate(SCREEN_NAME.REGISTERSCREEN);
          }}
          _text={{
            color: 'black',
          }}
          borderColor="black"
          borderWidth={1}
          backgroundColor="white"
        >
          Đăng ký
        </Button>
      </View>
    </View>
  );
}

export default UserLoginSection;

export const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  buttonCol: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
