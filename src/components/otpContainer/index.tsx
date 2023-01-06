
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Dimensions, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { IOtpContainer } from '../../types';
import { styles } from './styles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const initCodes: Array<string> = [];

const OTPContainer = (props: IOtpContainer) => {
  const { codeCount, containerStyle, onFinish, onTyping, blankCheck } = props
  const inputCodeRef = useRef(new Array());
  const [codes, setCodes] = useState<Array<string>>(initCodes);

  useEffect(() => {
    const codes: Array<string> = [];
    for (let i = 0; i < codeCount; i++) {
      codes.push('');
    }
    setCodes(codes);

  }, []);

  useEffect(() => {
    //console.log('from oto container',codes)
    onTyping && onTyping(getCodes());
    const isTypeFinish = codes.every(function (i) {
      return i !== '';
    });
    if (isTypeFinish) {
      onFinish && onFinish(getCodes());
    }
  }, [codes]);

  useEffect(() => {
    console.log(blankCheck);
    if (blankCheck == false) {
      //console.log(codeCount);
      setCodes(['', '', '', '']);
    }
  }, [blankCheck]);

  const getCodes = () => {
    let codeString = '';
    codes.forEach(code => {
      codeString += code;
    });
    return codeString;
  };

  const onChangeCode = (code: string, index: number) => {
    const typedCode = code.slice(-1);
    const currentCodes = [...codes];
    currentCodes[index] = typedCode;
    setCodes(currentCodes);
  };

  const onKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
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

export default OTPContainer;

