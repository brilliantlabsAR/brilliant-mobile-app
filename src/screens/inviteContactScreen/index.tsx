import React, { useState, useEffect, useRef } from "react";
import {
    StatusBar,
    View,
    Text,
    SafeAreaView,
    Platform,
    LogBox,
    TextInput,
    TouchableOpacity,
    Image,
    BackHandler,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Keyboard,
    Dimensions,
    FlatList,
    Alert,
    Share,
    PermissionsAndroid,
    Linking
} from "react-native";
import { Theme, STRINGS } from "../../models";
import { InviteContactScreenNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import { Loading } from '../../components/loading';
import { search, closeIcon, shareIcon } from "../../assets";
import Contact from 'react-native-contacts';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchSendInviteData } from "../../redux/appSlices/sendInviteSlice";
import { apiStatus } from "../../redux/apiDataTypes";
import { ShowToast } from "../../utils/toastUtils";
import { TopBar } from "../../components/topBar";


type Props = InviteContactScreenNavigationProps
const InviteContactScreen = (props: Props) => {
    const { navigation, route } = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [contactList, setContactList] = React.useState<any[]>([]);
    const [backendContacts, setBackendContacts] = React.useState<any[]>([]);
    const [contactCount, setContactCount] = useState<number>();
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.sendInviteSlice.status);
    const inviteContactMessage = useAppSelector(state => state.sendInviteSlice.userData);

    useEffect(() => {
        if (Platform.OS === 'android') {
            // Request required permissions from Android
            requestContactPermission()
        } else {
            getContact();
        }

        if (status === apiStatus.success) {
            // console.log("Invitation sent",inviteContactMessage.message);
            // console.log("Invitation sent--->",inviteContactMessage);
            ShowToast(inviteContactMessage.message)

        }

    }, [status]);
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Let\'s join me in Frame App. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. Get it at https://frameapp.com/dl/',
                title: 'Invite a friend via...'


            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                    //  this.props.sendContactInvite({ receiver: number, token: this.state.token });
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            //alert(error.message);
        }
    };

    const sendInviteApiFunction = (cc: string, phoneNumber: string) => {
        dispatch(FetchSendInviteData({
            "cc": cc,
            "receiver": phoneNumber
        }))
    }

    async function requestContactPermission() {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
            ])
            if (
                granted['android.permission.WRITE_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED
                && granted['android.permission.READ_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log('You can use the Contacts');
                getContact();
            } else {


                console.log('Permission denied');

            }
        } catch (err) {
            console.warn(err)
        }
    }


    function searchTextFunc(searchKeyword: any) {
        const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
        const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (searchKeyword === "" || searchKeyword === null) {
            getContact();
        } else if (phoneNumberRegex.test(searchKeyword)) {
            Contact.getContactsByPhoneNumber(searchKeyword).then(contacts => {
                //  this.setState({ contacts });
                setContactList(contacts);
            });
        } else if (emailAddressRegex.test(searchKeyword)) {
            Contact.getContactsByEmailAddress(searchKeyword).then(contacts => {
                // this.setState({ contacts });
                setContactList(contacts);
            });
        } else {
            Contact.getContactsMatchingString(searchKeyword).then(contacts => {
                //  this.setState({ contacts });
                setContactList(contacts);
            });
        }
    }


    async function getContact() {
        try {

            setIsLoading(true);
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    'title': 'Contacts',
                    'message': 'This app would like to view your contacts.',
                    'buttonPositive': 'Please accept bare mortal'
                }
            ).then(async () => {
                await Contact.getAll().then((contact) => {
                    console.log('Backend', backendContacts);
                    let result = contact.filter(item => {
                        if (item.phoneNumbers && item.phoneNumbers.length > 0) {
                            return backendContacts.indexOf(item.phoneNumbers[0].number.replace(/ /g, '')) < 0
                        } else {
                            return false;
                        }
                    }
                    )
                    //  console.log('result', result);

                    setContactList(result);
                    //  console.log('HIHIOKOK', contactList)
                    Contact.getCount().then(count => {
                        setContactCount(count);
                    });
                    setIsLoading(false);
                })
            }).catch((e) => {

                console.log(e)
            })

        } catch (e) {
            console.log(e);
        }

    }


    function openMessageApp(number: string) {
        if (number.includes('+')) {
            console.log("hiii");
            var subNumber, ccLine;
            var subCc = number.substring(0, number.indexOf(' ')); // "72"
            if (subCc.length == 0) {
                ccLine = number.length - 10;
                subCc = number.substring(0, ccLine); // "72"  
                subNumber = number.substring(ccLine, number.length).replace(/ /g, '').replace('(', '').replace(')', '').replace('-', '');
            } else {
                subNumber = number.substring(number.indexOf(' ') + 1).replace(/ /g, '').replace('(', '').replace(')', '').replace('-', ''); // "tocirah sneab"
            }
            console.log("hiii", subNumber);
            console.log("hiii", subCc);
            // this.props.sendContactInvite({cc:subCc, receiver: subNumber, token: this.state.token });
            sendInviteApiFunction(subCc, subNumber);
        } else {
            console.log("hello");
            var subNumber: any = number.replace(/ /g, '').replace('(', '').replace(')', '').replace('-', '');
            // this.props.sendContactInvite({cc:'', receiver: subNumber, token: this.state.token });
            sendInviteApiFunction("", subNumber);

        }

        console.log('yyy', number);
        let message = 'Let\'s join me in Frame App. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. Get it at https://frameapp.com/dl/';
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${number}${separator}body=${message}`
        Linking.openURL(url)

    }




    const FlatListItemSeparator = ({ item }: { item: any }) => {
        <View style={styles.viewLine} />
    }

    const ContactListItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
                item.phoneNumbers && item.phoneNumbers.length > 0 && item.phoneNumbers.map((numberData: any, index: number) => {
                    if (index == 0) {

                        console.log(numberData)
                        openMessageApp(numberData.number);
                    }
                })
            }}
        >
            <View style={styles.topListView}>
                <View style={styles.middleView} >
                    <View style={styles.placeholder}>
                        {item.givenName && item.givenName.length > 0 &&

                            <Text style={styles.txt}>{item.givenName[0]}</Text>
                        }

                    </View>
                </View>
                <View style={styles.listNameView} >
                    <Text
                        style={styles.listNameText}
                    >{item.givenName + ' ' + item.familyName}</Text>
                    <View style={styles.numberView}>

                        {item.phoneNumbers && item.phoneNumbers.length > 0 && item.phoneNumbers.map((numberData: any, index: number) => {
                            if (index == 0) {
                                return (<Text style={styles.numberText}> {numberData.number}</Text>)
                            }
                        })
                        }

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView
            style={styles.bodyContainer}>
            <View style={styles.topView}>

                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.goBack()}
                    style={styles.backButtonStyle}
                >
                    <Image
                        style={styles.homeMenu}
                        source={closeIcon}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <Text
                    style={styles.headerText}
                >{STRINGS.INVITE_CONTACT}</Text>
            </View>
            <View style={styles.viewSpace} />

            <View style={styles.viewTop}>
                <ScrollView>
                    <View style={styles.insideScroll}>
                        <View style={styles.searchContactView}>
                            <TextInput
                                style={styles.searchTextInput}
                                placeholder="search contacts"
                                placeholderTextColor={Theme.color.gray}
                                onChangeText={searchText => { searchTextFunc(searchText) }}
                            />

                            <View style={styles.searchInconView}>
                                <Image
                                    style={styles.searchImage}
                                    source={search}
                                    resizeMode='cover'

                                />
                            </View>

                        </View>
                    </View>


                    <TouchableOpacity style={styles.inviteTouch}
                        onPress={onShare}>
                        <View style={styles.shareViewTop}>

                            <View style={styles.shareView}
                            // onPress={this.onShare} title="Share"
                            >
                                <Image
                                    style={styles.userImage}
                                    source={shareIcon}
                                    resizeMode='cover'

                                />
                            </View>
                            <Text
                                style={styles.shareLinkText}
                            >{STRINGS.SHARE_LINK}</Text>

                        </View>
                    </TouchableOpacity>
                    <Text
                        style={styles.contactListText}
                    >{'From Contacts (' + contactList.length + ')'}</Text>

                    {contactList.length > 0 ?

                        <FlatList
                            data={contactList}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            //ItemSeparatorComponent={FlatListItemSeparator}
                            renderItem={ContactListItem}
                            keyExtractor={(item, index) => index.toString()}
                        /> :
                        <Text
                            style={styles.noConttact}
                        >{STRINGS.NO_CONTACT_LIST}</Text>
                    }
                    {
                        isLoading ?
                            <Loading /> : null
                    }
                </ScrollView>

            </View>
        </SafeAreaView>
    )



}
export default InviteContactScreen;