/*
 * @Author: czy0729
 * @Date: 2019-05-20 22:29:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-20 22:39:18
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Text, Button } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'

const Login = (props, { navigation }) => (
  <View style={_.container.column}>
    <Text type='sub' size={16}>
      cookie已过期
    </Text>
    <Button
      style={[
        {
          width: 160
        },
        _.mt.md
      ]}
      shadow
      onPress={() => navigation.push('Login')}
    >
      重新登录
    </Button>
  </View>
)

Login.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Login)