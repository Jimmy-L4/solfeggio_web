import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const titles = ['音阶', '音组', '音程', '和弦', '节奏', '单声部旋律', '双声部旋律']

const qusNum = [6, 2, 3, 6, 2, 3, 1]

const stateText = ['已完成', '待完成', '已逾期']

const stateType = ['check-circle', 'clock-circle', 'stop']

const href = 'https://ant.design'

const choiceList = (options) => {
  const queryParameters = getQueryParameters(options)
  console.log('queryParameters', queryParameters)
  if (queryParameters && !queryParameters.count) {
    queryParameters.count = 7
  }
  const data = []
  for (let i = 0; i < queryParameters.count; i++) {
    const tmpKey = i + 1
    const state = Mock.mock('@integer(0, 2)')
    data.push({
      id: tmpKey,
      score: Mock.mock('@integer(1, 100)'),
      href: href,
      stateText: stateText[state],
      stateType: stateType[state],
      title: titles[i] + queryParameters.lesson_No,
      qusNum: qusNum[i],
    })
  }
  return builder(data)
}

Mock.mock(/\/study\/choiceList/, 'get', choiceList)
