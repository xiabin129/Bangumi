/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-23 11:40:33
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Button } from '@components'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import SearchBar from './search-bar'
import History from './history'
import List from './list'
import Store from './store'

const title = '帖子搜索'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['search', 'Search']
})
@observer
class Search extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  onPress = () => {
    const { $ } = this.context
    $.doSearch(true)
  }

  render() {
    return (
      <View style={_.select(_.container.plain, _.container.bg)}>
        <Flex style={styles.searchBar}>
          <Flex.Item>
            <SearchBar />
          </Flex.Item>
          <Button
            style={styles.btn}
            type='ghostPlain'
            size='sm'
            onPress={this.onPress}
          >
            查询
          </Button>
        </Flex>
        <History style={_.mt.sm} />
        <List />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBar: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  },
  btn: {
    width: 68,
    height: 34,
    marginLeft: _.sm,
    borderRadius: 34
  }
})
