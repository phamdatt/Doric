import React, { useMemo } from 'react';
import { Box, Text, FormControl, useTheme, Input, Button } from 'native-base';
import { ThemeType } from '../../theme';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/header';

interface FormInterface {
  oldPass: any;
  newPass: any;
  rePass: any;
}

const ChangePasswordScreen = () => {
  const navigation: any = useNavigation();

  const theme = useTheme<ThemeType>();
  const { control } = useForm<FormInterface>();
  return (
    <Box style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <Header headerTitle="Thay đổi mật khẩu" leftCol={true} />
      <Box px={4} py={4}>
        <FormControl py={2}>
          <FormControl.Label py={2}>Nhập vào mật khẩu cũ</FormControl.Label>
          <Controller
            control={control}
            name="oldPass"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={(val) => {
                  onChange(val);
                }}
                value={value}
                placeholder="Nhập vào mật khẩu cũ"
              />
            )}
          />
        </FormControl>
        <FormControl py={2}>
          <FormControl.Label py={2}>Nhập vào mật khẩu mới</FormControl.Label>
          <Controller
            control={control}
            name="newPass"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={(val) => {
                  onChange(val);
                }}
                value={value}
                placeholder="Nhập vào mật khẩu mới"
              />
            )}
          />
        </FormControl>
        <FormControl py={2}>
          <FormControl.Label py={2}>Xác nhận mật khẩu</FormControl.Label>
          <Controller
            control={control}
            name="rePass"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={(val) => {
                  onChange(val);
                }}
                value={value}
                placeholder="Xác nhận mật khẩu"
              />
            )}
          />
        </FormControl>
        <Button
          mt={2}
          p={2}
          backgroundColor={theme.colors.black}
          _pressed={{ opacity: 0.5 }}
        >
          <Text color={theme.colors.white}>Cập nhập</Text>
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePasswordScreen;
