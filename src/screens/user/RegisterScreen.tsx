import React from "react";
import { Box, FormControl, Text, Input, Button } from "native-base";
import { View, StyleSheet, StatusBar } from "react-native";
import * as Animated from "react-native-animatable";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../../screensContants/contants";
import { register } from "@/service/api/account/register";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onRegister = () => {
    register({
      email: 'hellos@gmail.com',
      password: '123456',
      username: 'minhdat',
      phonenumber: Number('0333727182'),
      gender: 1,
      birthday: 123,
    })
      .then((resp) => {

      })
      .catch((error) => { })
      .finally(() => { });
  };

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 30,
            color: "white",
          }}
        >
          Đăng Ký
        </Text>
      </View>
      <Animated.View style={styles.footer} animation="fadeInUpBig">
        <Box flex={1}>
          <FormControl
            isInvalid={"email" in errors}
            mt={2}
            px={2}
            isRequired
            mb={4}
          >
            <FormControl.Label>Họ tên</FormControl.Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  fontSize={14}
                  onChangeText={(val) => {
                    onChange(val);
                  }}
                  value={value}
                  placeholder="Enter your name"
                  borderRadius={12}
                />
              )}
            />
          </FormControl>
          <FormControl
            isInvalid={"email" in errors}
            mt={2}
            px={2}
            isRequired
            mb={4}
          >
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  fontSize={14}
                  onChangeText={(val) => {
                    onChange(val);
                  }}
                  value={value}
                  placeholder="Enter your email"
                  borderRadius={12}
                />
              )}
            />
          </FormControl>
          <FormControl
            isInvalid={"email" in errors}
            mt={2}
            px={2}
            isRequired
            mb={4}
          >
            <FormControl.Label>Số điện thoại</FormControl.Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  fontSize={14}
                  onChangeText={(val) => {
                    onChange(val);
                  }}
                  value={value}
                  placeholder="Enter your phone"
                  borderRadius={12}
                />
              )}
            />
          </FormControl>

          <FormControl isInvalid={"email" in errors} mt={2} px={2} isRequired>
            <FormControl.Label>Mật khẩu</FormControl.Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  fontSize={14}
                  onChangeText={(val) => {
                    onChange(val);
                  }}
                  value={value}
                  placeholder="Enter your password"
                  borderRadius={12}
                />
              )}
            />
          </FormControl>
          <Box flexDirection="row" my={4}>
            <Button
              backgroundColor="black"
              _pressed={{ opacity: 0.5 }}
              borderRadius={8}
              flex={1}

            >
              Đăng nhập
            </Button>
            <Button
              flex={1}
              ml={2}
              _pressed={{ opacity: 0.5 }}
              borderRadius={8}
              borderWidth={1}
              borderColor="black"
              variant="unstyled"
              _text={{
                color: "black",
              }}
              onPress={onRegister}
            >
              Đăng ký
            </Button>
          </Box>
        </Box>
      </Animated.View>
    </View >
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
    justifyContent: "flex-end",
  },
  footer: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
