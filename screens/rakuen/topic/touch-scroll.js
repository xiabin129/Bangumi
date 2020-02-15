/*
 * @Author: czy0729
 * @Date: 2019-10-14 22:46:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-15 15:01:53
 */
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { getTimestamp, titleCase } from '@utils'
import { MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants/model'

function TouchScroll({ onPress }, { $ }) {
  const { scrollDirection } = $.setting
  const { list } = $.comments
  if (
    scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue('隐藏') ||
    !list.length
  ) {
    return null
  }

  const styles = memoStyles()
  const { _time: readedTime } = $.readed
  const showFloor = [
    parseInt(list.length * 0.33333),
    parseInt(list.length * 0.66666),
    list.length - 1
  ]
  return (
    <Flex
      style={styles[`container${titleCase(scrollDirection)}`]}
      direction={
        scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue('水平底部')
          ? undefined
          : 'column'
      }
    >
      <Flex.Item>
        <TouchableWithoutFeedback onPressIn={() => onPress(-1)}>
          <Flex style={styles.item}>
            <Text style={styles.text} size={10} type='icon' align='center'>
              1
            </Text>
          </Flex>
        </TouchableWithoutFeedback>
      </Flex.Item>
      {list.map((item, index) => {
        let isNew = false
        if (readedTime) {
          if (getTimestamp(item.time) > readedTime) {
            isNew = true
          }

          if (!isNew) {
            if (item.sub) {
              item.sub.forEach(i => {
                if (getTimestamp(i.time) > readedTime) {
                  isNew = true
                }
              })
            }
          }
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Flex.Item key={index}>
            <TouchableWithoutFeedback onPressIn={() => onPress(index)}>
              <Flex style={[styles.item, isNew && styles.itemNew]}>
                {showFloor.includes(index) && (
                  <Text
                    style={styles.text}
                    size={10}
                    type={isNew ? _.select('plain', 'icon') : 'icon'}
                    align='center'
                  >
                    {list[index].floor.replace('#', '')}
                  </Text>
                )}
              </Flex>
            </TouchableWithoutFeedback>
          </Flex.Item>
        )
      })}
    </Flex>
  )
}

TouchScroll.defaultProps = {
  onPress: Function.prototype
}

TouchScroll.contextTypes = {
  $: PropTypes.object
}

export default observer(TouchScroll)

const memoStyles = _.memoStyles(_ => ({
  containerRight: {
    position: 'absolute',
    zIndex: 1,
    top: _.headerHeight,
    right: 0,
    bottom: 44,
    width: 16
  },
  containerLeft: {
    position: 'absolute',
    zIndex: 1,
    top: _.headerHeight,
    left: 0,
    bottom: 44,
    width: 16
  },
  containerBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 42,
    width: '100%',
    height: 24,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1)
  },
  item: {
    width: 16,
    height: '100%',
    paddingRight: 1,
    marginVertical: 2
  },
  itemNew: {
    backgroundColor: _.select(
      'rgba(254, 138, 149, 0.64)',
      'rgba(254, 113, 127, 0.16)'
    )
  },
  text: {
    width: '100%'
  }
}))
