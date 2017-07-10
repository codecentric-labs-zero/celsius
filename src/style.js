import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66A6CC'
  },
  header: {},
  image: {
    alignSelf: 'flex-end',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontStyle: 'italic',
    color: '#FFFFFF',
    textAlign: 'center',
    margin: 10,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    margin: 2,
    textAlignVertical: 'center'
  },
  temp: {
    fontSize: 45,
    fontWeight: '600'
    //height: 40,
  },
  ago: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 13,
    height: 20,
    //lineHeight: 15
  },
  buttonRefresh: {
    height: 32,
    width: 96,
    alignSelf: 'center',
    margin: 15,
  },
  imageRefresh: {
    alignSelf: 'center',
    height: 32,
  }
});

export default styles;