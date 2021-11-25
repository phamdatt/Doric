import React, { useEffect, useState, useContext } from 'react';
import { Box, Text, Pressable, ScrollView, Modal } from 'native-base';
import Header from '../../components/header';
import { Image, Alert } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FullscreenLoadingContext } from '../../context/loadingScreen';
import { getProductFavorite } from '../../service/api/favoriteProduct/getProductFavorite';
import { removeProductFavorite } from '../../service/api/favoriteProduct/removeProductFavorite';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_NAME } from '../../screensContants/contants';
import ErrorSection from '../../components/errorSection'

const ProductListFavoriteScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState<any[]>([]);
    const { setIsShowFullscreenLoading } = useContext(FullscreenLoadingContext);
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [idProduct, setIdProduct] = useState<string>('');

    useEffect(() => {
        setIsShowFullscreenLoading(true);
        getProductFavorite().then((resp) => {
            setData(resp.data.payload);
        }).catch((error) => {
        }).finally(() => {
            setIsShowFullscreenLoading(false);
        })
    }, [isLoadingDelete]);

    const removeFavoriteProduct = (productId: any) => {
        setIsLoadingDelete(true);
        setIsShow(false)
        removeProductFavorite({
            productId: productId,
        }).then((resp) => {
            if (resp.data.code === 0) {
                Alert.alert('Bạn đã xoá sản phẩm khỏi danh sách yêu thích')
            }

        }).catch((error) => {
        }).finally(() => {
            setIsLoadingDelete(false);
        })
    }


    return (
        <Box flex={1} backgroundColor="white" >
            {
                isShow && (
                    <Modal isOpen={isShow} onClose={() => setIsShow(false)}>
                        <Modal.Content>
                            <Modal.Header>
                                <Text textAlign="center" fontWeight="bold" fontSize={14}>Bạn có muốn xoá sản phẩm khỏi danh sách yêu thích không</Text>
                            </Modal.Header>
                            <Modal.Body flexDirection="row" flex={1} mt={2} >
                                <Pressable flex={1} borderRadius={60} backgroundColor="gray.300" py={2} alignItems="center" mr={2} onPress={() => {
                                    setIsShow(false)
                                }} >
                                    <Text fontWeight="bold" fontSize={14}>Không</Text>
                                </Pressable >
                                <Pressable onPress={() => {
                                    removeFavoriteProduct(idProduct);
                                }} flex={1} borderRadius={60} backgroundColor="red.500" alignItems="center" py={2} ml={2}>
                                    <Text color="white" fontWeight="bold" fontSize={14}>Có</Text>
                                </Pressable>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>
                )
            }
            <Box>
                <Header leftCol={true} headerTitle="Danh sách yêu thích" rightCol={false} menuIcon={true} />
            </Box>
            {
                data.length > 0 ? <ScrollView showsVerticalScrollIndicator={false}>
                    <Box flexDirection="row" flexWrap='wrap' backgroundColor="white" p={1}>
                        {
                            data.map((item) => {
                                return (
                                    <Box style={{
                                        width: '50%',
                                        paddingHorizontal: 4,
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                    }}
                                    >
                                        <Pressable
                                            borderWidth={0.5}
                                            borderColor="black"
                                            p={4}
                                            borderRadius="sm"
                                            _pressed={{ opacity: 0.5 }}
                                            onPress={() => {
                                                navigation.navigate(SCREEN_NAME.PRODUCT_DETAIL_SCREEN, {
                                                    productId: item._id,
                                                    catId: item.catId,
                                                })
                                            }}
                                        >
                                            <Box>
                                                <Image source={{ uri: item?.image[0].imageThumnail }} style={{ aspectRatio: 1, width: "100%", height: 'auto' }} resizeMode="contain" />
                                            </Box>
                                            <Box>
                                                <Text numberOfLines={1} fontWeight="bold" fontSize={14}>{item.name}</Text>
                                            </Box>
                                            <Box flexDirection="row" mt={2} flex={1}>
                                                <Pressable flex={0.2} justifyContent="center" _pressed={{ opacity: 0.5 }} onPress={() => {
                                                    setIsShow(true)
                                                    setIdProduct(item._id)

                                                }}
                                                    p={1}
                                                >
                                                    <FontAwesomeIcon icon={faHeart} size={14} />
                                                </Pressable>
                                            </Box>
                                        </Pressable>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </ScrollView> : <ErrorSection />
            }
        </Box >
    );
};

export default ProductListFavoriteScreen;

