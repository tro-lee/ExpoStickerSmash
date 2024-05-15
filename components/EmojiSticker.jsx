import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    left: '50%',
    bottom: '50%',
  },
})

export default function EmojiSticker({ imageSize, stickerSource }) {
  const scaleImage = useSharedValue(imageSize)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2
      }
      else {
        scaleImage.value = scaleImage.value / 2
      }
    })

  const drag = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX
      translateY.value += event.changeY
    })

  const imageStyle = useAnimatedStyle(() => ({
    width: withSpring(scaleImage.value),
    height: withSpring(scaleImage.value),
  }))

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }))

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[styles.imageContainer, containerStyle]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          >
          </Animated.Image>
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  )
}
