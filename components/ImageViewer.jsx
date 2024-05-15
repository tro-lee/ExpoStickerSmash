import { Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 64,
  },
})

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource
  return <Image source={imageSource} style={styles.image}></Image>
}
