import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FloatingAction} from 'react-native-floating-action';
import Clipboard from '@react-native-clipboard/clipboard';
import {SwipeListView} from 'react-native-swipe-list-view';
import {AuthorAPI} from '../../../API/AuthorAPI';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';

import PenceilWriting from '../../../assets/images/PenceilWriting.png';
import LinkAuthorWrite from '../../../assets/images/LinkAuthorWrite.png';
import DeleteAuthorWrite from '../../../assets/images/DeleteAuthorWrite.png';
import DeleteModal from '../../../assets/images/DeleteModal.png';

const AuthorWrite = () => {
  const navigation = useNavigation();
  const [recentSelect, setRecentSelect] = useState(true);
  const [rowList, setRowList] = useState(null);
  const [rowOpen, setRowOpen] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  // const [filterStorage, setFilterStorage] = useState(storageData);

  const {isLoading: storageLoading, data: storageData} = useQuery(
    ['AuthorStorage', recentSelect],
    AuthorAPI.writerGetSaving,
  );

  // useEffect(() => {
  //   if (filterStorage)
  //     setFilterStorage(data =>
  //       filterStorage.slice().sort(function (a, b) {
  //         if (a.tempSaveTime >= b.tempSaveTime) {
  //           return recentSelect ? -1 : 1;
  //         } else if (a.tempSaveTime < b.tempSaveTime) {
  //           return recentSelect ? 1 : -1;
  //         }
  //       }),
  //     );
  // }, [recentSelect, filterStorage]);

  const onPressRecent = () => {
    rowList ? (rowList[rowOpen] ? rowList[rowOpen].closeRow() : null) : null;
    setRecentSelect(true);
  };

  const onPressOld = () => {
    rowList ? (rowList[rowOpen] ? rowList[rowOpen].closeRow() : null) : null;
    setRecentSelect(false);
  };

  const onPressWritingPage = () => {
    navigation.navigate('AuthorStacks', {
      screen: 'AuthorEditor',
    });
  };

  const onRowOpen = (rowKey, rowMap, toValue) => {
    console.log(rowKey);
    setRowList(rowMap);
    setRowOpen(rowKey);
  };

  const onRowClose = (rowKey, rowMap, toValue) => {
    setRowOpen(null);
  };

  const onPressStorageItem = (rowMap, data) => {
    rowList
      ? rowList[rowOpen]
        ? null
        : navigation.navigate('AuthorStacks', {
            screen: 'AuthorEditor',
            params: {...data},
          })
      : navigation.navigate('AuthorStacks', {
          screen: 'AuthorEditor',
          params: {...data},
        });
  };

  const deleteRow = (rowMap, key) => {
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
    setModalVisible(true);
  };

  const onPressModalDelete = () => {
    setModalVisible(!modalVisible);
  };

  const renderItem = (data, rowMap, rowKey) => {
    return (
      <TouchableWithoutFeedback
        onPress={e => onPressStorageItem(rowMap, data.item)}>
        <View style={styles.itemView}>
          <Text style={styles.itemDateText}>{data.item.tempSaveTime}</Text>
          <Text style={styles.itemTitleText}>{data.item.title}</Text>
          <Text style={styles.itemBodyText}>{data.item.preView}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.backRightBtn}
        onPress={() => deleteRow(rowMap, data.item.id)}>
        <Image
          style={{width: 18, height: 21}}
          source={DeleteAuthorWrite}></Image>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFF'}} />
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}> */}
      <StatusBar barStyle="dark-content" />
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={{width: 60, height: 60}} source={DeleteModal}></Image>
            <Text style={styles.modalTitleText}>삭제하시겠습니까?</Text>
            <Text style={styles.modalBodyText}>
              삭제된 글은 복구가 불가능합니다.
            </Text>
            <View style={styles.modalButtonView}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <View style={{marginRight: 27}}>
                  <Text style={styles.modalCancel}>취소</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressModalDelete}>
                <View>
                  <Text style={styles.modalDelete}>삭제</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>메일쓰기</Text>
      </View>
      <View style={styles.bodyHeader}>
        <Text
          style={{
            fontFamily: 'NotoSansKR-Medium',
            fontSize: 14,
            color: '#3C3C3C',
          }}>
          임시저장함
        </Text>
        <View
          style={{
            width: 92,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onPressRecent} activeOpacity={1}>
            <Text
              style={{
                ...styles.bodyHeaderTextOrder,
                color: recentSelect ? '#3C3C3C' : '#BEBEBE',
              }}>
              최신순
            </Text>
          </TouchableOpacity>
          <Text style={{...styles.bodyHeaderTextOrder, color: '#BEBEBE'}}>
            ・
          </Text>
          <TouchableOpacity onPress={onPressOld} activeOpacity={1}>
            <Text
              style={{
                ...styles.bodyHeaderTextOrder,
                color: recentSelect ? '#BEBEBE' : '#3C3C3C',
              }}>
              오래된순
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        {storageData && storageData.length ? (
          <SwipeListView
            ListHeaderComponent={
              <TouchableOpacity
                onPress={() =>
                  Clipboard.setString('https://www.mail-link.co.kr/')
                }>
                <View style={styles.LinkView}>
                  <View>
                    <View style={{marginBottom: 5}}>
                      <Text style={styles.LinkText}>
                        <Text style={{fontFamily: 'NotoSansKR-Bold'}}>
                          웹사이트
                        </Text>
                        에서도 편하게
                      </Text>
                      <Text style={styles.LinkText}>
                        글을 작성하고 발행해보세요!
                      </Text>
                    </View>
                    <Text style={styles.LinkCopyText}>
                      클릭하여 링크복사하기
                    </Text>
                  </View>
                  <Image
                    style={{width: 134, height: 92}}
                    source={LinkAuthorWrite}></Image>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={(rowData, index) => {
              return rowData.id.toString();
            }}
            data={storageData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-77}
            stopRightSwipe={-77}
            disableRightSwipe={true}
            onRowOpen={onRowOpen}
            onRowClose={onRowClose}
            closeOnScroll={true}
          />
        ) : (
          <>
            <TouchableOpacity
              onPress={() =>
                Clipboard.setString('https://www.mail-link.co.kr/')
              }>
              <View style={styles.LinkView}>
                <View>
                  <View style={{marginBottom: 5}}>
                    <Text style={styles.LinkText}>
                      <Text style={{fontFamily: 'NotoSansKR-Bold'}}>
                        웹사이트
                      </Text>
                      에서도 편하게
                    </Text>
                    <Text style={styles.LinkText}>
                      글을 작성하고 발행해보세요!
                    </Text>
                  </View>
                  <Text style={styles.LinkCopyText}>클릭하여 링크복사하기</Text>
                </View>
                <Image
                  style={{width: 134, height: 92}}
                  source={LinkAuthorWrite}></Image>
              </View>
            </TouchableOpacity>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'NotoSansKR-Regular',
                  color: '#3C3C3C',
                  includeFontPadding: false,
                }}>
                저장된 메일이 없습니다.
              </Text>
            </View>
          </>
        )}
      </View>
      <FloatingAction
        actions={[
          {
            icon: (
              <Image
                style={{
                  width: 22,
                  height: 22,
                }}
                source={PenceilWriting}
              />
            ),
            name: 'bt_search',
            position: 1,
            buttonSize: 50,
          },
        ]}
        color="#FFF"
        distanceToEdge={{vertical: 110, horizontal: 17}}
        buttonSize={50}
        shadow={{
          shadowOpacity: 0.12,
          shadowColor: '#000000',
          shadowRadius: 23,
        }}
        overrideWithAction={true}
        animated={false}
        onPressItem={name => {
          onPressWritingPage();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 94 - 48,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  bodyHeader: {
    width: '100%',
    height: 32.6,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    // paddingBottom: 103 - 23.78,
    paddingBottom: 84.5,
  },
  bodyHeaderTextOrder: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    includeFontPadding: false,
  },
  LinkView: {
    backgroundColor: '#F4F6FF',
    height: 92,
    paddingHorizontal: 35,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  LinkText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    color: '#3C3C3C',
    includeFontPadding: false,
  },
  LinkCopyText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 11,
    color: '#4562F1',
    textDecorationLine: 'underline',
    includeFontPadding: false,
  },
  itemView: {
    height: 100,
    backgroundColor: '#FFF',
    paddingTop: 12,
    paddingBottom: 17,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  itemDateText: {
    position: 'absolute',
    color: '#BEBEBE',
    fontFamily: 'NotoSansKR-Thin',
    fontSize: 12,
    right: 20,
    top: 12,
    includeFontPadding: false,
  },
  itemTitleText: {
    color: '#3C3C3C',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    marginBottom: 8,
    includeFontPadding: false,
  },
  itemBodyText: {
    color: '#828282',
    fontFamily: 'NotoSansKR-Light',
    fontSize: 14,
    width: 301,
    includeFontPadding: false,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 77,
    backgroundColor: '#FF9B9B',
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
  },
  modalView: {
    width: 330,
    height: 240,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 40,
  },
  modalTitleText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 20,
    color: '#3C3C3C',
    includeFontPadding: false,
    marginBottom: 3,
    marginTop: 20,
  },
  modalBodyText: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 15,
    color: '#828282',
    includeFontPadding: false,
  },
  modalButtonView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 21,
    right: 27,
  },
  modalCancel: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#828282',
    includeFontPadding: false,
  },
  modalDelete: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#FF9B9B',
    includeFontPadding: false,
  },
});
export default AuthorWrite;
