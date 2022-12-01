import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  selectedItemContainer: {
    borderWidth: 1,
  },
  itemName: {
    fontSize: 14,
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '100%',
  },
})
