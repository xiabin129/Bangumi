/*
 * @Author: czy0729
 * @Date: 2019-05-29 16:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-16 15:40:19
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Touchable, Image, Text, Flex } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import { years } from './store'

const cdn =
  'https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@master/data/award/title'
const itemWidth = 128
const itemWidthLg = itemWidth * 2 + 16

function Award(props, { navigation }) {
  const styles = memoStyles()
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <Touchable
        style={styles.item2020}
        withoutFeedback
        onPress={() => {
          t('发现.跳转', {
            to: 'Award',
            year: 2020
          })

          navigation.push('Award', {
            uri: `${HOST}/award/2020`
          })
        }}
      >
        <Image
          src={`${cdn}/2020.png`}
          size={itemWidthLg}
          height={itemWidth}
          placeholder={false}
          resizeMode='contain'
        />
      </Touchable>
      <Touchable
        style={styles.item2019}
        withoutFeedback
        onPress={() => {
          t('发现.跳转', {
            to: 'Award',
            year: 2019
          })

          navigation.push('Award', {
            uri: `${HOST}/award/2019`
          })
        }}
      >
        <Image
          src={`${cdn}/2019.png`}
          size={itemWidthLg - 32}
          height={itemWidth}
          placeholder={false}
          resizeMode='contain'
        />
      </Touchable>
      <Touchable
        style={styles.item2018}
        withoutFeedback
        onPress={() => {
          t('发现.跳转', {
            to: 'Award',
            year: 2018
          })

          navigation.push('Award', {
            uri: `${HOST}/award/2018`
          })
        }}
      >
        <Image
          src={`${cdn}/2018.png`}
          size={itemWidthLg}
          height={itemWidth}
          placeholder={false}
        />
      </Touchable>
      {years.map(item => (
        <Touchable
          key={item}
          style={_.ml.md}
          withoutFeedback
          onPress={() => {
            t('发现.跳转', {
              to: 'Award',
              year: item
            })

            navigation.push('Award', {
              uri: `${HOST}/award/${item}`
            })
          }}
        >
          <View style={styles.border} />
          <Flex style={styles.item} justify='center' direction='column'>
            <Text size={18} type={_.select('plain', 'title')} bold>
              {item}
            </Text>
            <Text size={18} type={_.select('plain', 'title')} bold>
              年鉴
            </Text>
          </Flex>
        </Touchable>
      ))}
    </ScrollView>
  )
}

export default obc(Award)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  },
  item2020: {
    width: itemWidthLg,
    marginRight: _.md,
    backgroundColor: 'rgb(236, 243, 236)',
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  item2019: {
    width: itemWidthLg,
    paddingLeft: 20,
    marginRight: _.md,
    backgroundColor: 'rgb(54, 63, 69)',
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  item2018: {
    width: itemWidthLg,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  item: {
    width: itemWidth,
    height: itemWidth,
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  }
}))
