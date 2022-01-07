import { Box, useTheme, Text, Pressable } from 'native-base';
import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import { ThemeType } from '@/theme';
import { ScrollView, Image } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';
import { getOrderDetail } from '@/service/api/order/getOrderDetail';
import { useRoute } from '@react-navigation/native';
import { formatNumber } from '@/helper/formatNumberHelper';
export interface RouteParamsInterface {
    orderId: string;
}
const OrderDetail = () => {
    const route = useRoute();
    const routeParams = (route.params as RouteParamsInterface) ?? {};
    const [dataOrderDetail, setDataOrderDetail] = useState<any>({});
    useEffect(() => {
        getOrderDetail({
            orderId: routeParams.orderId
        }).then((resp) => {
            setDataOrderDetail(resp.data.payload);

        }).catch((err) => {
            console.log(err)
        })
    }, [])
    const theme = useTheme<ThemeType>();
    return (
        <Box flex={1} backgroundColor="white">
            <Header leftCol={true} headerTitle='Chi tiết đơn hàng DH-1' rightCol={false} menuIcon={true} />
            <ScrollView>
                <Box flex={1}>
                    <Box backgroundColor={theme.colors.coolGray} py={4} px={4}>
                        <Text fontSize={theme.fontSizes.sm} color={theme.colors.white} fontWeight="bold" >Thông tin đơn hàng</Text>
                    </Box>
                    <Box flexDirection="row" flex={1} px={4} borderColor={theme.colors.gray[200]} borderBottomWidth={0.3} py={2}>
                        <Box flex={1} alignItems="center">
                            <Text mb={2} color={theme.colors.black} fontWeight="bold">Mã đơn hàng</Text>
                            <Text textAlign="center" color={theme.colors.black} fontFamily={theme.fonts.FadoBold}>{dataOrderDetail.orderId}</Text>
                        </Box>
                        <Box flex={1} alignItems="center">
                            <Text mb={2} color={theme.colors.black} fontWeight="bold">Ngày tạo</Text>
                            <Text textAlign="center" color={theme.colors.black} fontFamily={theme.fonts.FadoBold}>{dataOrderDetail.createdAt}</Text>
                        </Box>
                    </Box>
                    <Box flexDirection="row" px={4} alignItems="center" py={2} borderColor={theme.colors.gray[200]} borderBottomWidth={0.3}>
                        <Text color={theme.colors.black} fontWeight="bold">Trạng thái</Text>
                        {
                            dataOrderDetail?.orderStatus! === 1 && (<Box p={2} marginLeft="auto" borderRadius={60} borderWidth={0.3} backgroundColor={theme.colors.black}><Text fontSize={theme.fontSizes.xs} color={theme.colors.white}>Đang vận chuyển</Text></Box>)
                        }
                    </Box>
                    <Box flexDirection="row" alignItems="center" px={4} py={2} borderColor={theme.colors.gray[200]} borderBottomWidth={0.3}>
                        <Text color={theme.colors.black} fontWeight="bold">Số tiền cần thanh toán</Text>
                        <Box p={2} marginLeft="auto"><Text>{formatNumber(2300000)}</Text></Box>
                    </Box>
                    <Box py={4}>
                        <Box flexDirection="row" alignItems="center" px={4}>
                            <Text color={theme.colors.black} fontWeight="bold">Phương thức thanh toán</Text>
                            <Box marginLeft="auto"><Text>Thanh toán trực tiếp</Text></Box>
                        </Box>
                    </Box>
                </Box>
                {/*Thong tin dat hang */}
                <Box flex={1}>
                    <Box backgroundColor={theme.colors.coolGray} py={4} px={4}>
                        <Text fontSize={theme.fontSizes.sm} color={theme.colors.white} fontWeight="bold" >Thông tin đặt hàng</Text>
                    </Box>
                    <Box flexDirection="row" px={4} alignItems="center" py={2} borderColor={theme.colors.gray[200]} borderBottomWidth={0.3}>
                        <Text color={theme.colors.black} fontWeight="bold" >Họ tên</Text>
                        <Box p={2} marginLeft="auto"><Text>{dataOrderDetail.name}</Text></Box>
                    </Box>
                    <Box flexDirection="row" px={4} alignItems="center" py={2} borderColor={theme.colors.gray[200]} borderBottomWidth={0.3}>
                        <Text color={theme.colors.black} fontWeight="bold">Điện thoại</Text>
                        <Box p={2} marginLeft="auto"><Text>{dataOrderDetail.phone}</Text></Box>
                    </Box>
                    <Box flexDirection="row" alignItems="center" px={4} py={2} borderColor={theme.colors.gray[200]} borderBottomWidth={0.3}>
                        <Text color={theme.colors.black} fontWeight="bold">Email</Text>
                        <Box p={2} marginLeft="auto"><Text>{dataOrderDetail.email}</Text></Box>
                    </Box>
                    <Box flexDirection="row" alignItems="center" px={4} py={2} borderColor={theme.colors.gray[200]} borderBottomWidth={0.3}>
                        <Text color={theme.colors.black} fontWeight="bold" >Địa chỉ</Text>
                        <Box p={2} marginLeft="auto"><Text>{dataOrderDetail.address}</Text></Box>
                    </Box>
                </Box>
                <Box backgroundColor={theme.colors.coolGray} py={4} px={4}>
                    <Text fontSize={theme.fontSizes.sm} color={theme.colors.white} fontWeight="bold" >Danh sách sản phẩm</Text>
                </Box>
                {
                    dataOrderDetail?.itemList?.map((item) => {
                        return (
                            <Box px={4} flex={1}>
                                <Box flexDirection="row" width="100%" py={4} >
                                    <Pressable
                                        flex={0.3}
                                        height={100}
                                        borderRadius={12}
                                        alignItems="center"
                                        mr={4}
                                        borderStyle="dashed"
                                        borderWidth={0.5}
                                        mt={1}
                                        justifyContent="center"
                                        _pressed={{ opacity: 0.5 }}
                                        onPress={() => {

                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: item.image![0].imageThumnail,
                                            }}
                                            resizeMode="contain"
                                            style={{ height: 60, width: 60 }}
                                        />
                                    </Pressable>
                                    <Box flex={0.7}>
                                        <Box flexDirection="row">
                                            <Text
                                                fontSize={theme.fontSizes.md}
                                                fontFamily={theme.fonts.FadoBold}
                                                fontWeight="bold"
                                                numberOfLines={2}
                                            >
                                                {item.name}
                                            </Text>
                                            <Pressable ml="auto" mr={4} mt={1} _pressed={{ opacity: 0.5 }}>
                                                <FontAwesome5 name="times" size={14} />
                                            </Pressable>
                                        </Box>
                                        {/*Description*/}
                                        <Box mt={2}>
                                            <Text
                                                color={theme.colors.gray[500]}
                                                fontSize={theme.fontSizes.xs}
                                            >
                                                Size:M
                                            </Text>
                                        </Box>
                                        <Box mt={2}>
                                            <Text
                                                color={theme.colors.gray[500]}
                                                fontSize={theme.fontSizes.xs}
                                            >
                                                Color:Black
                                            </Text>
                                        </Box>

                                    </Box>
                                </Box>
                            </Box>
                        )
                    })
                }

            </ScrollView >
        </Box >

    )
}
export default OrderDetail;
