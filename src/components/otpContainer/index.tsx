/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Dimensions,  } from 'react-native';
import { styles } from './styles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



const initCodes = [];
const OTPContainer=()=>({
  containerStyle,
  otpStyles,
  codeCount = 4,
  onTyping,
  onFinish,
}) {
  const inputCodeRef = useRef(new Array());
  const [codes, setCodes] = useState(initCodes);
  useEffect(() => {
    const codes = [];
    for (let i = 0; i < codeCount; i++) {
      codes.push('');
    }
    setCodes(codes);
  }, []);

  useEffect(() => {
    onTyping && onTyping(getCodes());
    const isTypeFinish = codes.every(function (i) {
      return i !== '';
    });
    if (isTypeFinish) {
      onFinish && onFinish(getCodes());
    }
  }, [codes]);

  const getCodes = () => {
    let codeString = '';
    codes.forEach(code => {
      codeString += code;
    });
    return codeString;
  };

  const onChangeCode = (code, index) => {
    const typedCode = code.slice(-1);
    const currentCodes = [...codes];
    currentCodes[index] = typedCode;
    setCodes(currentCodes);
  };
  const onKeyPress = (event, index) => {
    const key = event.nativeEvent.key;
    let destIndex = index;
    if (key === 'Backspace') {
      destIndex = index > 0 ? index - 1 : 0;
    } else {
      destIndex = index < codeCount - 1 ? index + 1 : codeCount - 1;
    }
    inputCodeRef.current[destIndex].focus();
  };
  return (
    <View style={[styles.form, containerStyle]}>
      {codes.map((code, index) => {
        return (
          <TextInput
            ref={element => inputCodeRef.current.push(element)}
            style={[
              styles.input,
              otpStyles,
              { width: width / (codeCount + 2), height: height / 14 },
            ]}
            onChangeText={text => onChangeCode(text.replace(/\s/g, ''), index)}
            keyboardType={'number-pad'}
            onKeyPress={event => onKeyPress(event, index)}
            value={code}
          />
        );
      })}
    </View>
  );
}