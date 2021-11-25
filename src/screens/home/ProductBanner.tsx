import React, { useState, useEffect, useContext } from "react";
import { View, Image, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Box } from "native-base";
import { getBannerProduct } from "../../service/api/other/bannerProduct";
import { FullscreenLoadingContext } from "../../context/loadingScreen";

const ProductBanner = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [dataBanner, setDataBanner] = useState<any[]>([]);
  const { setIsShowFullscreenLoading } = useContext(FullscreenLoadingContext);

  useEffect(() => {
    setIsShowFullscreenLoading(true);
    getBannerProduct()
      .then((resp) => {
        setDataBanner(resp.data.payload);
      })
      .catch((error) => { })
      .finally(() => {
        setIsShowFullscreenLoading(false);
      });
  }, []);
  const WINDOW_WIDTH = Dimensions.get("window").width;

  const renderItem = ({ item }: { item: any; index: number }) => {
    return (
      <Image
        source={{ uri: item?.imageBanner }}
        style={{
          height: "50%",
          width: "100%",
        }}
        resizeMode="cover"
      />
    );
  };
  return (
    <Box flex={1} mt={2}>
      {dataBanner.map((item) => {
        return (
          <Box key={item.title}>
            <Carousel
              data={item.image}
              contentContainerCustomStyle={{ height: 120 }}
              renderItem={renderItem}
              sliderWidth={WINDOW_WIDTH}
              itemWidth={WINDOW_WIDTH}
              slideStyle={{ width: WINDOW_WIDTH, aspectRatio: 1.5 }}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              loop={true}
              autoplay={true}
              autoplayInterval={5000}
              onSnapToItem={(i: number) => setActiveTab(i)}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default ProductBanner;
