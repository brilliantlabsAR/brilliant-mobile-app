import { FontFamily, Theme } from "../models"

export const textInputStyle = {
    colors: {
        placeholder: Theme.color.place_holder,
        text: Theme.color.Black,
        primary: Theme.color.place_holder,
        background: Theme.color.White,

    }, fonts: {
        regular: {
            fontFamily: FontFamily.regular
        }
    },
    roundness: 10
}
export const countryPickerStyle = {
    // Styles for whole modal [View]
    modal: {
        backgroundColor: Theme.color.White,
        height: '70%'
    },
    // Styles for input [TextInput]
    textInput: {
        borderRadius: 10,
    },
}
