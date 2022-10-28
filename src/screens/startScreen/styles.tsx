import {
    StyleSheet,
    Dimensions
} from "react-native";
import { Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    bodyContainer:{
        backgroundColor: Theme.color.White,
        flex: 1,
        flexDirection: 'column'
    },
    bodyContainerView:{
        backgroundColor: Theme.color.White,
        flex: 1,
        flexDirection: 'column',

    },
    scrollContainer:{
        backgroundColor: Theme.color.White
    },
    titleView:{
        marginTop: normalize(50)
    },
    titleText:{
        color: Theme.color.Black,
        fontSize: normalize(30),
        fontStyle: 'normal',
        flexDirection: 'row',
        alignSelf: 'center',
        fontFamily: 'ApercuProBold'
    },
    swiperView:{
        width: '100%',
        flex: 1,
        marginTop: normalize(20)
    },
    child: {
        flex: 1,
        width: windowWidth,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'

    }, sliderImg: {
        width: normalize(250),
        height: normalize(190),
        resizeMode: 'contain'
    },
    instructionTitle:{
        fontSize: normalize(14),
        color: Theme.color.Black,
        justifyContent: 'center',
        marginLeft: normalize(35),
        marginRight: normalize(35),
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: "center",
        textAlign: 'center',
        fontFamily: 'ApercuProRegular'
    },
    nextButtonView:{
        flexDirection: 'row',
        flex: 1,
        marginTop: normalize(45),
        marginRight: normalize(10),
        marginLeft: normalize(10)
    },
    nextButtoTouch:{
        flexDirection: 'row',
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',

    },
    menuIcon: {
        height: normalize(30),
        width: normalize(30),
        alignSelf: 'center'
    },
    backTouchView:{
        flexDirection: 'row',
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        flex: 1,
        position: 'absolute',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    paginationDotView:{
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: "center",
        textAlign: 'center',
        marginTop:normalize(10)
    },
    skipTutorialView:{
        marginTop: normalize(80),
        backgroundColor: Theme.color.White,
        alignSelf: 'center'
    },
    skipTutorialText:{
        fontSize: normalize(14),
        color: Theme.color.Black,
        fontFamily: 'ApercuProRegular',
        textDecorationLine: 'underline',
    },
    marginTopStyle:{
        marginTop: 10,
    },
    nextButtonText:{
        fontSize: normalize(18),
        fontFamily: 'ApercuProRegular',
        alignSelf: 'center'
    },
    backButtonText:
    {
        fontSize: normalize(18),
        fontFamily: 'ApercuProRegular',
        alignSelf: 'center'
    }
})