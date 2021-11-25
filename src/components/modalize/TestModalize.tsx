// import React, { useRef } from 'react';
// import { Animated, View, Text, TouchableOpacity } from 'react-native';
// import { Modalize } from 'react-native-modalize';
// import { Host } from 'react-native-portalize';

// const App = () => {
//   const modalizeRef = useRef<Modalize>(null);
//   const animated = useRef(new Animated.Value(0)).current;

//   const onOpen = () => {
//     modalizeRef.current?.open();
//   };

//   return (
//     <Host style={{ backgroundColor: '#000' }}>
//       <View
//         style={{
//           flex: 1,
//           borderRadius: animated.interpolate({ inputRange: [0, 1], outputRange: [0, 12] }),
//           transform: [
//             {
//               scale: animated.interpolate({ inputRange: [0, 1], outputRange: [1, 0.92] }),
//             },
//           ],
//           opacity: animated.interpolate({ inputRange: [0, 1], outputRange: [1, 0.75] }),
//         }}
//       >
//         <TouchableOpacity onPress={onOpen}>
//           <Text>Open the modal</Text>
//         </TouchableOpacity>

//         <Portal>
//           <Modalize ref={modalizeRef} panGestureAnimatedValue={animated}>
//                       <View>
//                           <Text>Homeasdjasiodjalks/</Text>
//            </View>
//           </Modalize>
//         </Portal>
//       </View>
//     </Host>
//   );
// };