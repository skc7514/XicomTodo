import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { postData } from '../services/apiService';
import { useNavigation } from '@react-navigation/native';
import comman from '../styles/CommanStyles';
import Header from '../components/Header';
import Colors from '../constants/Colors';

const ImageListScreen = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();


  const fetchImages = async (offset: number) => {
    setLoading(true);
    const payload = {
      user_id: 108,
      offset: offset,
      type: 'popular',
    };

    try {
      const response = await postData('/getdata.php', payload);
      console.log('Response:', response);
      if (response.status === 'success') {
        const newImages = response.images;
        if (newImages.length === 0) {
          setHasMore(false);
          Alert.alert('No more images', 'There are no more images to show.');
        } else {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error fetching the images.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(0);
  }, []);

  useEffect(() => {
    if (offset > 0) {
      fetchImages(offset);
    }
  }, [offset]);

  const getImageHeight = (uri: string) => {
    return new Promise<number>((resolve, reject) => {
      Image.getSize(uri, (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        const aspectRatio = height / width;
        const imageHeight = screenWidth * aspectRatio;
        resolve(imageHeight);
      }, reject);
    });
  };

  const updateImageHeights = async () => {
    const updatedImages = await Promise.all(
      images.map(async (image: any) => {
        const height = await getImageHeight(image.xt_image);
        return { ...image, height };
      })
    );
    setImages(updatedImages);
  };

  useEffect(() => {
    if (images.length > 0) {
      updateImageHeights();
    }
  }, [images]);

  const handleImagePress = (item: any) => {
    navigation.navigate('ImageDetail', {id: item.id, user_image: item.xt_image});
  };

  const renderImage = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => handleImagePress(item)} activeOpacity={0.8}>
        <View style={styles.imageContainer}>
          <View style={{position: 'absolute', bottom: 2, left: 2, zIndex: 1}}>
            <Text style={{color: '#333'}}>{item.id}</Text>
          </View>
          <Image
            source={{ uri: item.xt_image }}
            style={[styles.image, { height: item.height }]}
          />
        </View>
      </TouchableOpacity>
    );
  };


  const loadMoreImages = () => {
    if (hasMore && !loading) {
      const newOffset = offset + 1;
      setOffset(newOffset);
    }
  };

  return (
    <SafeAreaView style={comman.container}>
      <Header title="Image List" showBackButton={false} />
      {images && images.length > 0 ? (
      <FlatList
        data={images}
        renderItem={renderImage}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={1}
        ListFooterComponent={
          hasMore && !loading ? (
            <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreImages}>
              <Text style={styles.loadMoreText}>Click here to load more</Text>
            </TouchableOpacity>
          ) : null
        }
      />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No images found.</Text>
      )}
      

      {loading && <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  loadMoreButton: {
    paddingVertical: 15,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    // borderRadius: 10,
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 16,
  },
  loader: {
    marginVertical: 20,
  },
});

export default ImageListScreen;
