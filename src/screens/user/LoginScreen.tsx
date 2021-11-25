import React, { useRef } from "react";
import {
  Box,
  FormControl,
  Text,
  Input,
  Button,
  theme,
  Pressable,
  useToast,
} from "native-base";
import { View, StyleSheet, StatusBar, Alert } from "react-native";
import * as Animated from "react-native-animatable";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../../screensContants/contants";
import { FontAwesome5 } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import * as Google from "expo-google-app-auth";
import * as Facebook from 'expo-facebook';


// 201428760739-2m4n7nuotvv8lagp9p92vojuh3mock1r.apps.googleusercontent.com
const LoginScreen = () => {
  const navigation = useNavigation();
  const toas = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const modalizeForgotPassword = useRef<Modalize>(null);
  const oPenForgotPassword = () => {
    modalizeForgotPassword.current?.open();
  };

  const loginByGoggle = () => {
    const config = {
      iosClientId: `201428760739-2m4n7nuotvv8lagp9p92vojuh3mock1r.apps.googleusercontent.com`,
      androidClientId: `201428760739-1qijtbkbppm3vl05m7gtm5gd3or0377h.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };
    Google.logInAsync(config)
      .then((resp: any) => {
        const { type, user } = resp;
        if (type == "success") {
          navigation.navigate(SCREEN_NAME.HOME);
          toas.show({
            title: "Login success",
            placement: "top",
          });
        }
      })
      .catch(() => { })
      .finally(() => { });
  };
  const loginByFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '857277571520854',
      });
      const {
        type,
        token
      }: any = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
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
          Đăng Nhập
        </Text>
      </View>
      <Animated.View style={styles.footer} animation="fadeInUpBig">
        <Box flex={1}>
          <FormControl.Label py={3}>Email</FormControl.Label>
          <Box
            flexDirection="row"
            alignItems="center"
            borderWidth={0.5}
            borderColor="black"
            px={4}
            borderRadius={8}
          >
            <FontAwesome5
              name="user"
              size={18}
              color={theme.colors.gray[400]}
            />
            <FormControl isInvalid={"email" in errors} px={2} isRequired>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={(val) => {
                      onChange(val);
                    }}
                    value={value}
                    fontSize={14}
                    placeholder="Enter your email"
                    borderRadius={12}
                    variant="unstyled"
                    ml={4}
                  />
                )}
              />
            </FormControl>
          </Box>
          <FormControl.Label py={3}>Mật khẩu</FormControl.Label>
          <Box
            flexDirection="row"
            alignItems="center"
            borderWidth={0.5}
            borderColor="black"
            px={4}
            borderRadius={8}
          >
            <FontAwesome5 name="key" size={18} color={theme.colors.gray[400]} />
            <FormControl isInvalid={"email" in errors} px={2} isRequired>
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
                    variant="unstyled"
                    ml={4}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box alignItems="flex-end" pt={3}>
            <Text color={theme.colors.gray[400]} onPress={oPenForgotPassword}>
              Quên mật khẩu?
            </Text>
          </Box>
          <Box py={4} flexDirection="row">
            <Button
              backgroundColor="black"
              _pressed={{ opacity: 0.5 }}
              borderRadius={8}
              flex={1}
              onPress={() => {
                navigation.navigate(SCREEN_NAME.HOME_NAVIGATOR);
              }}
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
              onPress={() => {
                navigation.navigate(SCREEN_NAME.REGISTERSCREEN);
              }}
            >
              Đăng ký
            </Button>
          </Box>
          <Box flex={1}>
            <Box mt={4} justifyContent="center" alignItems="center">
              <Text>---.Hoặc tham gia.---</Text>
            </Box>
            <Box
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              mt={4}
            >
              <Pressable
                mr={2}
                borderRadius={50}
                borderColor={theme.colors.gray[400]}
                borderWidth={0.5}
                p={1}
                _pressed={{ opacity: 0.5 }}
                onPress={loginByFacebook}
              >
                <FontAwesome5
                  name="facebook"
                  size={18}
                  color={theme.colors.gray[400]}
                />
              </Pressable>
              <Pressable
                _pressed={{ opacity: 0.5 }}
                ml={2}
                borderRadius={50}
                borderColor={theme.colors.gray[400]}
                borderWidth={0.5}
                p={1}
                onPress={loginByGoggle}
              >
                <FontAwesome5
                  name="google"
                  size={18}
                  color={theme.colors.gray[400]}
                />
              </Pressable>
            </Box>
          </Box>
        </Box>
      </Animated.View>
      <ForgotPasswordScreen modalizeForgotPassword={modalizeForgotPassword} />
    </View>
  );
};

export default LoginScreen;
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
