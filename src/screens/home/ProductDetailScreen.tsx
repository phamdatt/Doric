import React, { useMemo, useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Box, Text, useTheme, Pressable, useToast } from "native-base";
import { ThemeType } from "../../theme";
import Header from "../../components/header";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import ProductCardMini from "../../components/productCardMini";
import { assetImages } from "../../config";
import { getProductDetail } from "../../service/api/product/getProductDetail";
import { FullscreenLoadingContext } from "../../context/loadingScreen";
import { getProductRelate } from "../../service/api/product/getProductRelate";
import { useRoute, useNavigation } from "@react-navigation/native";
import ImageViewer from "react-native-image-zoom-viewer";
import { addToCart } from "../../service/api/card/addToCart";
import { formatNumber } from "../../helper/formatNumberHelper";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { addProductFavorite } from "../../service/api/favoriteProduct/addProductFavorite";

export interface RouteParamsInterface {
  productId: string;
  catId: number;
}

const ProductDetailScreen = () => {

  const theme = useTheme<ThemeType>();
  const WINDOW_WIDTH = Dimensions.get("window").width;
  const imageItemWidth = WINDOW_WIDTH - 16;
  const styles = useMemo(() => {
    return createStyles(theme);
  }, []);
  const route = useRoute();
  const routeParams = (route.params as RouteParamsInterface) ?? {};
  const [_, setActiveTabRelate] = useState<boolean>(false);
  const [dataProductDetail, setDataProductDetail] = useState<any>({});
  const [isModal, setIsModal] = useState<boolean>(false);
  const [imageIndex, setimageIndex] = useState<number>(0);
  const [images, setImages] = useState<any[]>([]);
  const [productId, setProductId] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataProductDetailRelate, setDataProductDetailRelate] = useState<any[]>(
    []
  );
  const { setIsShowFullscreenLoading } = useContext(FullscreenLoadingContext);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const toast = useToast();

  useEffect(() => {
    setIsShowFullscreenLoading(true);
    getProductDetail({
      productId: routeParams.productId,
    })
      .then((resp) => {
        setDataProductDetail(resp.data.payload);
        setProductId(resp.data.payload._id);
        const imagess = resp.data?.payload?.image.map((item: { imageThumnail: any; }) => ({
          url: item.imageThumnail,
        }));
        setImages(imagess);
      })

      .catch((error) => { })
      .finally(() => {
        getProductRelate({
          catId: routeParams.catId,
        })
          .then((resp) => {
            setDataProductDetailRelate(resp.data.payload);
          })
          .catch((error) => { })
          .finally(() => { });
        setIsShowFullscreenLoading(false);
      });
  }, [isLoading]);

  const onSnapToItem = (i: any) => {
    setActiveItemIndex(i);
  };
  const onAddToCart = (dataProductDetail: any) => {
    addToCart({
      productId: productId,

    })
      .then((resp) => {
        toast.show({
          title: "Thêm sản phẩm vào giỏ hàng thành công",
          placement: "top",
        });
      })
      .catch((error) => { })
      .finally(() => { });
  };
  const addToFavorite = (id: string) => {
    setIsLoading(true)
    setIsShowFullscreenLoading(true);
    addProductFavorite({
      productId: id,
    }).then((resp) => {
      if (resp.data.code === 0) {
        toast.show({
          title: "Đã thêm vào danh sách yêu thích",
          placement: "top",
        });
      }
    }).catch(() => {
    }).finally(() => {
      setIsLoading(false)
      setIsShowFullscreenLoading(false);
    })
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isModal && (
        <Modal
          visible={isModal}
          transparent={true}
          onRequestClose={() => setIsModal(false)}
        >
          <ImageViewer
            index={imageIndex}
            imageUrls={images}
            onSwipeDown={() => {
              setIsModal(false);
            }}
            swipeDownThreshold={1}
            onMove={(data) => console.log(data)}
            enableSwipeDown={true}
            renderHeader={() => (
              <Pressable
                backgroundColor="white"
                style={{
                  marginLeft: "auto",
                  marginTop: 30,
                  marginRight: 30,
                }}
                onPress={() => {
                  setIsModal(false);
                }}
              ></Pressable>
            )}
          />
        </Modal>
      )}
      <Header
        headerTitle="Chi tiết sản phẩm"
        leftCol={true}
        rightCol={true}
        menuIcon={true}
      />
      <Box flex={1} marginBottom={16}>
        <ScrollView stickyHeaderIndices={[3]}>
          <Box
            h={250}
            position="relative"
            p={2}
            borderBottomWidth={0.5}
            borderBottomColor={theme.colors.gray[200]}
          >
            <Carousel
              data={dataProductDetail.image}
              renderItem={({ item, index }: any) => {
                return (
                  <Pressable
                    alignItems="center"
                    height={200}
                    key={item.imageThumnail}
                    _pressed={{ opacity: 0.5 }}
                    onPress={() => {
                      setimageIndex(index);
                      setIsModal(true);
                    }}
                  >
                    <Image
                      source={{
                        uri: item.imageThumnail,
                      }}
                      style={styles.productImage}
                    />
                  </Pressable>
                );
              }}
              sliderWidth={imageItemWidth}
              itemWidth={imageItemWidth}
              onSnapToItem={onSnapToItem}
            />

            <Box style={styles.paginationBar}>
              <Pagination
                dotStyle={styles.dot}
                inactiveDotOpacity={0.5}
                inactiveDotScale={0.8}
                activeDotIndex={activeItemIndex}
                dotsLength={dataProductDetail?.image?.length!}
              />
            </Box>
          </Box>
          {/*Start Infor Product*/}
          <Box
            flex={1}
            px={4}
            borderBottomWidth={1}
            borderColor={theme.colors.gray[200]}
          >
            <Text
              py={2}
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {dataProductDetail.name}
            </Text>
            <Box flex={1} flexDirection="row">
              <Text
                style={{
                  fontWeight: "bold",
                }}
                fontFamily={theme.fonts.Oswald}
              >
                {formatNumber(dataProductDetail.price ?? 0)} VND
                {/* {dataProductDetail.price} */}
              </Text>
              {/* <Text style={{ marginLeft: "auto" }}>Rating</Text> */}
            </Box>
          </Box>
          {/*End Infor Product*/}
          {/*Start Chính Sách*/}
          <Box flex={1} px={4} py={3}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              Chính sách vận chuyển
            </Text>
            <Pressable
              flex={1}
              _pressed={{
                backgroundColor: theme.colors.gray[100],
              }}
              justifyContent="center"
              mt={2}
            >
              <Box flexDirection="row" py={1}>
                <Image
                  source={assetImages.isDelivery}
                  style={{ height: 24, width: 24, marginRight: 12 }}
                />
                <Box flex={0.8}>
                  <Text flexWrap="wrap">
                    Giao hàng miễn phí cho các đơn trên 1.115.000 đồng
                  </Text>
                </Box>
                <FontAwesome5
                  style={{ marginLeft: "auto", marginTop: 2 }}
                  name="chevron-right"
                  size={theme.fontSizes.sm}
                  color={theme.colors.gray[400]}
                />
              </Box>
            </Pressable>
            <Pressable
              flex={1}
              _pressed={{
                backgroundColor: theme.colors.gray[100],
              }}
              justifyContent="center"
              mt={2}
            >
              <Box flexDirection="row" py={1}>
                <Image
                  source={assetImages.isPayment}
                  style={{ height: 24, width: 24, marginRight: 12 }}
                />
                <Box flex={0.8}>
                  <Text flexWrap="wrap">Quy tắc COD</Text>
                </Box>
                <FontAwesome5
                  style={{ marginLeft: "auto", marginTop: 2 }}
                  name="chevron-right"
                  size={theme.fontSizes.sm}
                  color={theme.colors.gray[400]}
                />
              </Box>
            </Pressable>
            <Pressable
              flex={1}
              _pressed={{
                backgroundColor: theme.colors.gray[100],
              }}
              justifyContent="center"
              mt={2}
            >
              <Box flexDirection="row" py={1}>
                <Image
                  source={assetImages.isSecurte}
                  style={{ height: 24, width: 24, marginRight: 12 }}
                />
                <Box flex={0.8}>
                  <Text flexWrap="wrap">Chính sách đổi trả</Text>
                </Box>
                <FontAwesome5
                  style={{ marginLeft: "auto", marginTop: 2 }}
                  name="chevron-right"
                  size={theme.fontSizes.sm}
                  color={theme.colors.gray[400]}
                />
              </Box>
            </Pressable>
          </Box>
          {/*End Chính Sách*/}
          {/*Start Rating */}

          {/*End Rating */}
          {/*Product Lien Quan*/}
          <Box>
            <Box p={2} backgroundColor="white" px={4} flexDirection="row">
              <Pressable
                px={2}
                _pressed={{ opacity: 0.5 }}
                onPress={() => {
                  setActiveTabRelate(true);
                }}
              >
                <Text py={2} fontSize={14} fontWeight="bold">
                  Sản phẩm liên quan
                </Text>
              </Pressable>
              <Pressable
                px={2}
                _pressed={{ opacity: 0.5 }}
                onPress={() => {
                  setActiveTabRelate(true);
                }}
              >
                <Text py={2} fontSize={14} fontWeight="bold">
                  Thường được mua cùng
                </Text>
              </Pressable>
            </Box>
          </Box>

          {dataProductDetailRelate.length < 0 ? (
            <Box></Box>
          ) : (
            <Box
              flex={1}
              borderColor={theme.colors.gray[200]}
              borderTopWidth={0.5}
              px={2}
            >
              <Box width="100%" flexDirection="row" flexWrap="wrap">
                {dataProductDetailRelate?.map((item) => {
                  return (
                    <Box width="50%" p={1} key={item._id}>
                      <ProductCardMini
                        productCatId={item.catId}
                        productId={item._id}
                        propductName={item.name}
                        productImage={item.image}
                        productPercent={item.disCount}
                        productPrice={item.price}
                        productDescription={item.description}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </ScrollView>
      </Box>
      <Box
        position="absolute"
        right={0}
        left={0}
        bottom={0}
        backgroundColor="white"
      >
        <Box
          flex={1}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          px={4}
          py={3}
        >
          <Pressable onPress={() => {
            addToFavorite(dataProductDetail._id)
          }}
            _pressed={{ opacity: 0.5 }}
            p={2}
            justifyContent="center"
            alignItems="center"
            disabled={dataProductDetail.favorite === true ? true : false}
          >
            {
              dataProductDetail.favorite === true ? <FontAwesomeIcon icon={faHeart} size={18} /> : <FontAwesomeIcon icon={faHeartBroken} size={18} />
            }
          </Pressable>
          <Pressable
            backgroundColor="black"
            marginLeft="auto"
            _pressed={{ opacity: 0.3 }}
            flex={0.8}
            onPress={() => {
              onAddToCart(dataProductDetail);
            }}
            alignItems="center"
          >
            <Text color="white" px={10} py={3} fontSize={16} fontWeight="bold">
              Thêm vào giỏ hàng
            </Text>
          </Pressable>
        </Box>
      </Box>
    </View>
  );
};

export default ProductDetailScreen;

export function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    productImage: {
      aspectRatio: 1,
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    paginationBar: {
      position: "absolute",
      right: 0,
      bottom: -10,
      left: 0,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 40,
      backgroundColor: theme.colors.black,
      borderWidth: 1,

      marginHorizontal: -10,
    },
  });
}
