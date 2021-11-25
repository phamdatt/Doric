import React, { useMemo, useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import { useTheme, Pressable, Text } from "native-base";
import { ThemeType } from "../theme";
import Carousel from "react-native-snap-carousel";
import Header from "../components/header";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../screensContants/contants";
import { getMenu } from "../service/api/category";
import { FullscreenLoadingContext } from "../context/loadingScreen";

const CategoryMenu = () => {
  const navigation = useNavigation();
  const theme = useTheme<ThemeType>();
  const styles = useMemo(() => {
    return createStyle(theme);
  }, []);
  const [titleParent, setTitleParent] = useState<number>(0);
  const [indexCategoryLv1, setIndexCategoryLv1] = useState<number>(0);
  const { setIsShowFullscreenLoading } = useContext(FullscreenLoadingContext);
  const [dataMenu, setDataMenu] = useState<any[]>([]);
  const WINDOW_WIDTH = Dimensions.get("window").width;
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    setIsShowFullscreenLoading(true);
    getMenu()
      .then((resp) => {
        setDataMenu(resp.data?.payload);
      })
      .catch(() => {})
      .finally(() => {
        setIsShowFullscreenLoading(false);
      });
  }, []);

  useEffect(() => {
    setIndexCategoryLv1(0);
  }, [titleParent]);

  return (
    <View style={styles.screen}>
      <Header headerTitle="Danh mục" leftCol={false} menuIcon={true} />
      <View style={styles.tabBox}>
        <View style={styles.tabBarItem}>
          {dataMenu.map((itemTab, index) => {
            return (
              <Pressable
                style={[
                  styles.tabBarItemBtn,
                  index === titleParent
                    ? styles.tabBarItemBtnActive
                    : styles.tabBarItemBtn,
                ]}
                _pressed={{ opacity: 0.5 }}
                onPress={() => {
                  setTitleParent(index);
                }}
                key={itemTab.name}
              >
                <Text
                  style={[
                    styles.tabBarItemTitle,
                    titleParent === index
                      ? styles.tabBarItemTitleActive
                      : styles.tabBarItemTitle,
                  ]}
                >
                  {itemTab.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.categoryMenuBox}>
        <View style={styles.categoryMenuLeftBox}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {dataMenu[titleParent]?.childCategory.map(
              (itemMenu: any, index: number) => {
                return (
                  <Pressable
                    height={60}
                    key={itemMenu.name + index.toString()}
                    px={4}
                    py={3}
                    style={[
                      styles.categoryMenuLeft,
                      index === indexCategoryLv1
                        ? styles.categoryMenuLeftActive
                        : styles.categoryMenuLeft,
                    ]}
                    onPress={() => {
                      setIndexCategoryLv1(index);
                    }}
                    _pressed={{ opacity: 0.5 }}
                  >
                    <Text
                      style={[
                        styles.categoryMenuLeftTitle,
                        index === indexCategoryLv1
                          ? styles.categoryMenuLeftTitleActive
                          : styles.categoryMenuLeftTitle,
                      ]}
                    >
                      {itemMenu.name}
                    </Text>
                  </Pressable>
                );
              }
            )}
          </ScrollView>
        </View>
        <View style={styles.categoryMenuRightBox}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {dataMenu[titleParent]?.childCategory[indexCategoryLv1].banner
              .length > 0 ? (
              <Carousel
                data={
                  dataMenu[titleParent]?.childCategory[indexCategoryLv1]?.banner
                }
                contentContainerCustomStyle={{ height: 100 }}
                renderItem={({ item }: any) => (
                  <Image
                    key={item.imageBanner}
                    source={{ uri: item.imageBanner }}
                    style={{
                      marginTop: 10,
                      height: "50%",
                      width: "56%",
                      padding: 4,
                    }}
                    resizeMode="contain"
                  />
                )}
                sliderWidth={WINDOW_WIDTH}
                itemWidth={WINDOW_WIDTH}
                slideStyle={{ width: WINDOW_WIDTH, aspectRatio: 2 }}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                loop={true}
                autoplay={true}
                autoplayInterval={5000}
                layout="stack"
                onSnapToItem={(i: number) => setActiveTab(i)}
                layoutCardOffset={18}
              />
            ) : null}
            <View style={{ flex: 1 }}>
              {dataMenu[titleParent]?.childCategory[
                indexCategoryLv1
              ]?.childCategory.map((itemMenuLv1: any) => (
                <View
                  style={{ flex: 1 }}
                  key={itemMenuLv1.name + itemMenuLv1.image}
                >
                  <Text
                    style={{
                      marginTop: 20,
                      color: theme.colors.gray[500],
                      padding: 2,
                    }}
                  >
                    {itemMenuLv1.name}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {itemMenuLv1?.childCategory.map(
                      (itemMenuLv2: any, indexMenu2: number) => (
                        <Pressable
                          style={{
                            width: "50%",
                            padding: 2,
                          }}
                          key={itemMenuLv2.image + indexMenu2.toString()}
                          _pressed={{ opacity: 0.3 }}
                          onPress={() => {
                            navigation.navigate(
                              SCREEN_NAME.STORECATEGORY_SCREEN,
                              {
                                slug: itemMenuLv2.slug,
                                catId: itemMenuLv2.catId,
                              }
                            );
                          }}
                        >
                          <Image
                            source={{ uri: itemMenuLv2.image }}
                            style={{
                              width: "100%",
                              height: 50,
                              marginTop: 10,
                            }}
                            resizeMode="cover"
                          />
                          <View>
                            <Text
                              style={{
                                textAlign: "center",
                                fontSize: theme.fontSizes.xs,
                                marginTop: 8,
                              }}
                              numberOfLines={2}
                            >
                              {itemMenuLv2.name}
                            </Text>
                          </View>
                        </Pressable>
                      )
                    )}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default CategoryMenu;
function createStyle(theme: ThemeType) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    tabBox: {
      backgroundColor: theme.colors.white,
      shadowColor: theme.colors.gray[300],
      shadowOffset: { height: 2, width: 0 },
      shadowOpacity: 2,
      shadowRadius: 1,
    },
    tabBarItem: {
      flexDirection: "row",
    },
    tabBarItemBtn: {
      paddingHorizontal: 32,
      paddingVertical: 12,
      marginLeft: 16,
    },
    tabBarItemBtnActive: {
      paddingHorizontal: 32,
      paddingVertical: 12,
      marginLeft: 14,
      borderBottomColor: theme.colors.gray[600],
      borderBottomWidth: 3,
    },
    tabBarItemTitle: {
      color: theme.colors.gray[400],
      fontWeight: "bold",
      textAlign: "center",
    },
    tabBarItemTitleActive: {
      color: theme.colors.black[400],
      fontWeight: "bold",
      textAlign: "center",
    },
    categoryMenuBox: {
      flexDirection: "row",
      flex: 1,
    },
    categoryMenuLeftBox: {
      flex: 0.3,
      marginRight: 2,
      marginTop: 6,
    },
    categoryMenuLeft: {
      height: 80,
      width: "auto",
      backgroundColor: theme.colors.gray[200],
      justifyContent: "center",
      alignItems: "center",
    },
    categoryMenuLeftActive: {
      backgroundColor: theme.colors.white,
      justifyContent: "center",
      alignItems: "center",
    },
    categoryMenuLeftTitle: {
      textAlign: "center",
    },
    categoryMenuLeftTitleActive: {
      fontWeight: "bold",
      textAlign: "center",
    },
    categoryMenuRightBox: {
      flex: 0.7,
      paddingHorizontal: 8,
    },
  });
}
