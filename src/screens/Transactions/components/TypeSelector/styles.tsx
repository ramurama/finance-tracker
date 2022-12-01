import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 35,
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
  radioOuterCircle: {
    height: 18,
    width: 18,
    marginRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 50,
  },
})
