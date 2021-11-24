import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const SearchInput = ({ onChange, onSubmit, value } : {onChange: any, onSubmit: any, value: string}) => {
  return (
   <TextInput
      placeholder="Search"
      onSubmitEditing={onSubmit} 
      onChangeText={onChange}
      value={value}
      style={styles.input}
   />
  )
}

export default SearchInput

const styles = StyleSheet.create({
  input: {
    borderColor: '#777',
    borderBottomWidth: 2,
    // width: 300,
    height: 40,
    marginBottom: 10,
    marginHorizontal: 20
  }
})