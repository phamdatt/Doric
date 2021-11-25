import React, { useRef } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useForm, Controller } from 'react-hook-form';
import { FormControl, Input, Box, Button, Text, Radio } from 'native-base';

const ProfileScreen = () => {
  const url =
    'https://scontent.fsgn2-2.fna.fbcdn.net/v/t39.30808-6/s640x640/240721998_269483361691686_3676869149288116383_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=TeRZUZnYwJ4AX-BFRlc&_nc_ht=scontent.fsgn2-2.fna&oh=8642e46a68f7b89d396b66db05227d6b&oe=615F098E';
  const insset = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const AnimatedImageBackgrond =
    Animated.createAnimatedComponent(ImageBackground);
  const AnimatedBlurview = Animated.createAnimatedComponent(BlurView);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={{
          zIndex: 2,
          position: 'absolute',
          top: insset.top + 10,
          left: 20,
          backgroundColor: 'rgba(0,0,0,0.6)',
          height: 30,
          width: 30,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: scrollY.interpolate({
            inputRange: [-20, 0],
            outputRange: [1, 0],
          }),
          transform: [
            {
              rotate: scrollY.interpolate({
                inputRange: [-45, -35],
                outputRange: ['180deg', '0deg'],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <Ionicons name="backspace" color="white" size={22} />
      </Animated.View>
      <Animated.View
        style={{
          zIndex: 2,
          position: 'absolute',
          top: insset.top + 6,
          left: 0,
          right: 0,
          alignItems: 'center',
          opacity: scrollY.interpolate({
            inputRange: [90, 110],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [90, 120],
                outputRange: [30, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          Pham Tien Dat
        </Text>
      </Animated.View>
      {/*Banner */}
      <AnimatedImageBackgrond
        source={{ uri: url }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 125,
          transform: [
            {
              scale: scrollY.interpolate({
                inputRange: [-200, 0],
                outputRange: [5, 1],
                extrapolateLeft: 'extend',
                extrapolateRight: 'clamp',
              }),
            },
          ],
        }}
      >
        <AnimatedBlurview
          tint="dark"
          intensity={96}
          style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: 2,
            opacity: scrollY.interpolate({
              inputRange: [-50, 0, 50, 100],
              outputRange: [1, 0, 0, 1],
            }),
          }}
        ></AnimatedBlurview>
      </AnimatedImageBackgrond>
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        showsVerticalScrollIndicator={false}
        style={{
          zIndex: 3,
          marginTop: 90,
          paddingTop: 35,
          flex: 1,
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <Animated.Image
              source={{ uri: url }}
              style={{
                width: 75,
                height: 75,
                borderRadius: 40,
                borderWidth: 4,
                borderColor: 'black',
                marginTop: -30,
                transform: [
                  {
                    scale: scrollY.interpolate({
                      inputRange: [0, 35],
                      outputRange: [1, 0.6],
                      extrapolate: 'clamp',
                    }),
                  },
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [0, 35],
                      outputRange: [0, 16],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            ></Animated.Image>
            <Text
              style={{
                fontSize: 24,
                color: 'black',
                fontWeight: 'bold',
                marginTop: 10,
              }}
            >
              Pham Tien Dat
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ marginTop: 10, paddingHorizontal: 8 }}>
            <FormControl isInvalid={'email' in errors} mt={2} px={2} isRequired>
              <FormControl.Label>Tên đầy đủ</FormControl.Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={(val) => {
                      onChange(val);
                    }}
                    value={value}
                    placeholder="Enter"
                  />
                )}
              />
            </FormControl>
            <FormControl isInvalid={'email' in errors} mt={2} px={2} isRequired>
              <FormControl.Label>Ngày sinh</FormControl.Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={(val) => {
                      onChange(val);
                    }}
                    value={value}
                    placeholder="Enter"
                  />
                )}
              />
            </FormControl>
            <FormControl isInvalid={'email' in errors} mt={2} px={2} isRequired>
              <FormControl.Label>Email</FormControl.Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={(val) => {
                      onChange(val);
                    }}
                    value={value}
                    placeholder="Enter"
                  />
                )}
              />
            </FormControl>
            <FormControl isInvalid={'email' in errors} mt={2} px={2} isRequired>
              <FormControl.Label>Số điện thoại</FormControl.Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={(val) => {
                      onChange(val);
                    }}
                    value={value}
                    placeholder="Enter"
                  />
                )}
              />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={'gender' in errors}
              px={2}
              mt={2}
            >
              <FormControl.Label>Giới tính</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Radio.Group
                    name="gender"
                    flexDirection="row"
                    defaultValue={value}
                    onChange={(val) => onChange(val)}
                  >
                    <Radio
                      accessibilityLabel="gender"
                      value="male"
                      colorScheme="blue"
                    >
                      <Text mx={2}>Nam</Text>
                    </Radio>

                    <Radio
                      accessibilityLabel="gender"
                      value="female"
                      colorScheme="pink"
                    >
                      <Text mx={2}>Nữ</Text>
                    </Radio>
                  </Radio.Group>
                )}
                name="gender"
                rules={{ required: 'Gender is required' }}
                defaultValue="other"
              />
            </FormControl>
          </View>
          <Box flex={1} flexDirection="row" px={4} mt={4}>
            <Button flex={1} mr={2} variant="outline" borderColor="black">
              <Text> Huỷ bỏ</Text>
            </Button>
            <Button
              flex={1}
              ml={2}
              backgroundColor="black"
              _pressed={{ opacity: 0.5 }}
            >
              Xác nhận
            </Button>
          </Box>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
