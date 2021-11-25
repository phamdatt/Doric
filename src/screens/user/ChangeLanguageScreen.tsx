import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, useTheme, Pressable, Text } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { ThemeType } from '../../theme';
import Header from '../../components/header';

const arrLocaleList = [
  {
    title: 'Tiếng Việt',
  },
  {
    title: 'Tiếng Anh',
  },
];

function SelectLanguageScreen() {
  const navigation = useNavigation();
  const theme = useTheme<ThemeType>();
  const styles = useMemo(() => {
    return createStyle(theme);
  }, []);
  const [currentLocale, setCurrentLocale] = useState<number>(0);

  return (
    <View style={styles.screen}>
      <Header headerTitle="Thay đổi ngôn ngữ" leftCol={true} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {arrLocaleList.map((localeTagItem, idx) => {
            return (
              <Pressable
                key={idx}
                _pressed={{
                  backgroundColor: theme.colors.gray[100],
                }}
                onPress={() => {
                  setCurrentLocale(idx);
                }}
              >
                <View style={styles.menuItem}>
                  <View style={styles.menuItemTitleCol}>
                    <Text>{localeTagItem.title}</Text>
                  </View>

                  {currentLocale === idx ? (
                    <FontAwesome5
                      style={styles.menuItemIcon}
                      name="check"
                      size={theme.fontSizes.md}
                      color={theme.colors.black[400]}
                    />
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
        <Button style={styles.submitBtn} size="md" onPress={() => {}}>
          Xác nhận
        </Button>
      </View>
    </View>
  );
}

export default SelectLanguageScreen;
function createStyle(theme: ThemeType) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 32,
    },
    menuItem: {
      paddingVertical: 16,
      flexDirection: 'row',
      borderBottomColor: theme.colors.gray[200],
      borderBottomWidth: 1,
    },
    menuItemTitleCol: {
      marginRight: 'auto',
    },
    menuItemIcon: {
      marginLeft: 16,
    },
    submitBtn: {
      marginTop: 16,
      backgroundColor: 'black',
      marginBottom: 16,
    },
  });
}
