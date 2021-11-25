import React from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import {
  Divider,
  IconButton,
  Box,
  Text,
  FormControl,
  Input,
  Button,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { FontAwesome5 } from '@expo/vector-icons';
import { Portal } from 'react-native-portalize';

const ForgotPasswordScreen = (props: any) => {
  const { modalizeForgotPassword } = props;
  const closeSheet = () => {
    modalizeForgotPassword.current.close();
  };
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  return (
    <Portal>
      <Modalize
        ref={modalizeForgotPassword}
        modalHeight={500}
        HeaderComponent={
          <>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              py={2}
              px={4}
            >
              <Text fontSize="md" fontWeight="bold">
                Quên mật khẩu
              </Text>
              <IconButton
                icon={<FontAwesome5 name="times" size={18} />}
                color="gray.300"
                onPress={closeSheet}
              />
            </Box>
            <Divider />
          </>
        }
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <Text fontSize={18} fontWeight="bold">
            Đặt lại mật khẩu
          </Text>
          <Text fontSize={14} color="gray.500" marginTop={2}>
            Xác nhận đỉa chỉ email và gửi liên kết đặt lại
          </Text>
        </View>
        <Box px={4}>
          <FormControl isInvalid={'email' in errors} mt={4} isRequired>
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
                  placeholder="tiendatt3009@gmail.com"
                  color="black"
                  fontWeight="bold"
                />
              )}
            />
          </FormControl>
          <Button mt={4} backgroundColor="black" _pressed={{ opacity: 0.3 }}>
            <Text color="white" fontWeight="bold">
              Gửi
            </Text>
          </Button>
        </Box>
      </Modalize>

    </Portal>
  );
};

export default ForgotPasswordScreen;
