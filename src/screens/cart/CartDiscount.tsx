import React, { useMemo, useRef } from "react";
import {
  Box,
  Text,
  Pressable,
  Divider,
  Input,
  FormControl,
  useTheme,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { ThemeType } from "../../theme";
import { View } from "react-native";

export function CartDiscountSection(props: any) {
  const { onPenDiscountSheet } = props;
  const theme = useTheme<ThemeType>();

  // const styles = useMemo(() => {
  //   return createStyles(theme, insets);
  // }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 200,
      }}
    >
      <View
        style={{
          borderRadius: 12,
          borderWidth: 0.5,
          borderColor: theme.colors.gray[500],
          padding: 8,
        }}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 0.7 }}>
            <FormControl>
              <Controller
                name=""
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Input
                      value={value}
                      placeholder="Nhập mã giảm giá"
                      onChange={() => {}}
                      variant="unstyled"
                    />
                  );
                }}
              />
            </FormControl>
          </View>
          <Pressable
            _pressed={{ opacity: 0.5 }}
            style={{
              backgroundColor: theme.colors.black,
              flex: 0.3,
              borderRadius: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text color="white">Áp dụng</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default CartDiscountSection;
