import React from 'react';
import { Box, Text } from 'native-base'
import { assetImages } from '../../config';
import { Image, Dimensions } from 'react-native'
const ErrorSection = () => {
    return (
        <Box justifyContent="center" flex={1}>
            <Image source={assetImages.character} resizeMode="contain" style={{ height: 200, width: Dimensions.get('window').width }} />
            <Text textAlign="center">Hiện tại không tìm thấy dữ liệu sản phẩm này</Text>
        </Box>
    );
};

export default ErrorSection;