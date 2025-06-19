import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import comman from '../styles/CommanStyles';
import Colors from '../constants/Colors';
import { postData } from '../services/apiService'; 

const ImageDetailScreen = () => {
  const route = useRoute();
  const { id, user_image } = route.params;

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const validateAndSubmit = async () => {
    const errors: any = {};

    if (!first_name.trim()) {
      errors.first_name = 'First name is required';
    } else if (!/^[A-Za-z]{3,}$/.test(first_name)) {
      errors.first_name = 'Min 3 letters, spaces not allowed';
    }

    if (!last_name.trim()) {
      errors.last_name = 'Last name is required';
    } else if (!/^[A-Za-z]{3,}$/.test(last_name)) {
      errors.last_name = 'Min 3 letters, spaces not allowed';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email without spaces';
    }

    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone must be 10 numeric digits';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
        const payload = {
          id,
          user_image,
          first_name,
          last_name,
          email,
          phone,
        };
        Alert.alert('Success', JSON.stringify(payload));
      try {
        const response = await postData('/savedata.php', payload);
        console.log('API Response:', JSON.stringify(response));
        if (response.status === 'success') {
        Alert.alert('Success', 'Form submitted successfully!');
          setFirstName('');
          setLastName('');
          setEmail('');
          setPhone('');
          setFormErrors({});
        } else {
          Alert.alert('Error', 'Submission failed.');
        }
      } catch (error) {
        Alert.alert('API Error:', JSON.stringify(error));
        console.error('API Error:', error);
      }
    }
  };

return (
    <SafeAreaView style={comman.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6200EE" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContainer}
        enableOnAndroid
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <Header title="Detail Screen" showBackButton={true} />
        <Image source={{ uri: user_image }} style={styles.image} />

        <View style={styles.cardContainer}>
          <View style={styles.formGroupRow}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.inputField}
              value={first_name}
              onChangeText={setFirstName}
              autoCapitalize="none"
            />
          </View>
          {formErrors.first_name && <Text style={styles.errorText}>{formErrors.first_name}</Text>}

          <View style={styles.formGroupRow}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.inputField}
              value={last_name}
              onChangeText={setLastName}
              autoCapitalize="none"
            />
          </View>
          {formErrors.last_name && <Text style={styles.errorText}>{formErrors.last_name}</Text>}

          <View style={styles.formGroupRow}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.inputField}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>
          {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}

          <View style={styles.formGroupRow}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.inputField}
              keyboardType="numeric"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          {formErrors.phone && <Text style={styles.errorText}>{formErrors.phone}</Text>}

          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity style={styles.button} onPress={validateAndSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ImageDetailScreen;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    // paddingHorizontal: 20,
    // paddingTop: 10,
    // paddingBottom: 40,
    // backgroundColor: 'red',
  },
  cardContainer: {
    padding: 20,
    paddingTop: 20,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  formGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 20,
  },
  label: {
    flex: 4,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  inputField: {
    flex: 8,
    borderColor: '#333',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    textAlign: 'right',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    width: 120,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
