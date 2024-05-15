import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useRef, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot'
import ImageViewer from './components/ImageViewer'
import Button from './components/Button'
import IconButton from './components/IconButton'
import CircleButton from './components/CircleButton'
import EmojiPicker from './components/EmojiPicker'
import EmojiList from './components/EmojiList'
import EmojiSticker from './components/EmojiSticker'

// eslint-disable-next-line ts/no-var-requires
const PlaceholderImageSource = require('./assets/images/background-image.png')

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pickedEmoji, setPickedEmoji] = useState(null)

  const [status, requestPermission] = MediaLibrary.usePermissions()
  if (status === null) {
    requestPermission()
  }

  const imageRef = useRef()

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
    setIsModalVisible(false)
    setPickedEmoji(null)
  }

  const onSave = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      })

      await MediaLibrary.saveToLibraryAsync(localUri)
      if (localUri) {
        alert('Saved')
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  const onCloseModal = () => {
    setIsModalVisible(false)
  }

  const onOpenModal = () => {
    setIsModalVisible(true)
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light"></StatusBar>

      <View style={styles.imageContainer}>
        <View style={{ flex: 1 }} ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={PlaceholderImageSource} selectedImage={selectedImage}></ImageViewer>
          {pickedEmoji && <EmojiSticker imageSize={96} stickerSource={pickedEmoji}></EmojiSticker>}
        </View>
      </View>

      {showAppOptions
        ? (
          <View style={styles.footContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset}></IconButton>
              <CircleButton onPress={onOpenModal}></CircleButton>
              <IconButton icon="save-alt" label="Save" onPress={onSave}></IconButton>
            </View>
          </View>
          )
        : (
          <View style={styles.footContainer}>
            <Button onPress={pickImageAsync} label="选择图片" theme="primary"></Button>
            <Button onPress={() => setShowAppOptions(true)} label="就用这张啦"></Button>
          </View>
          )}

      <EmojiPicker isVisible={isModalVisible} onClose={onCloseModal}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onCloseModal}></EmojiList>
      </EmojiPicker>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    flex: 1,
    marginTop: 32,
    padding: 16,
  },
  footContainer: {
    alignItems: 'center',
    flex: 1 / 3,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
