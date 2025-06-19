// 📁 src/styles/GlobalStyles.ts
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.background,
    // paddingHorizontal: 20,
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  // App/Screen Header (e.g., large title)
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  // Subheader (e.g., section headers)
  subHeader: {
    fontSize: 24,
    fontWeight: '600',
    color: '#eee',
  },
  // Page Title (e.g., main screen title)
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF4500',
  },
  // Page Subtitle (e.g., under main title)
  pageSubtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#aaa',
  },
  // Tagline / Slogan (e.g., short marketing phrase)
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#ccc',
    marginTop: 10,
  },
  or:{
    marginVertical: 20,
    color: '#333',
    fontSize: 16,
  },
  text: {
    color: Colors.textLight,
    fontSize: 16,
  },
  // BUTTON STYLES
  button: {
    backgroundColor: Colors.primary,  
    // borderRadius: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  // INPUT
  input: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(126, 126, 126, 0.34)',
    // paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 0,
    color: '#333',
    marginVertical: 10,
  },

  // MARGINS / PADDINGS
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mb20: {
    marginBottom: 20,
  },
  p20: {
    padding: 20,
  },
  pt20: {
    paddingTop: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  testb: {
    borderWidth: 1,
    borderColor: 'red'
  },
});
