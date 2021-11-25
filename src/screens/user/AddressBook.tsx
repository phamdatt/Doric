import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from 'native-base';
import { ThemeType } from '../../theme';
import Header from '../../components/header';
const data = [
  {
    name: 'Phạm Tiến Đat',
    phone: '0333727182',
    address: '22, Tân kỳ tân quý,p.25,Q.TB',
    isMain: true,
  },
  {
    name: 'Phạm Tiến Đat',
    phone: '0333727182',
    address: '44, Tân kỳ tân quý,p.25,Q.TB',
    isMain: false,
  },
  {
    name: 'Phạm Tiến Đat',
    phone: '0333727182',
    address: '33, Tân kỳ tân quý,p.25,Q.TB',
    isMain: false,
  },
];

const AddressBook = () => {
  const theme = useTheme<ThemeType>();
  const styles = useMemo(() => {
    return createStyle(theme);
  }, []);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.addressItemBox}>
        <View
          style={item.isMain ? styles.addressItemActive : styles.addressItem}
        >
          <Text
            style={{
              marginTop: 12,
              fontSize: theme.fontSizes.md,
              fontWeight: '700',
            }}
          >
            {item.name}
          </Text>
          <Text style={{ marginTop: 12 }}>{item.phone}</Text>
          <Text style={{ marginTop: 12 }}>{item.address}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screens}>
      <Header headerTitle="Sổ địa chỉ" leftCol={true} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.address}
      />
    </View>
  );
};

export default AddressBook;

function createStyle(theme: ThemeType) {
  return StyleSheet.create({
    screens: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    addressItemBox: {
      paddingHorizontal: 16,
    },
    addressItem: {
      borderWidth: 2,
      borderColor: theme.colors.gray[300],
      borderRadius: theme.radii.lg,
      marginTop: 16,
      padding: 8,
    },
    addressItemActive: {
      borderWidth: 2,
      borderColor: theme.colors.blue[600],
      borderRadius: theme.radii.lg,
      marginTop: 16,
      padding: 8,
    },
  });
}
