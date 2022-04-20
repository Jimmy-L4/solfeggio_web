import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const titles = ['音阶', '音组', '音程', '和弦', '节奏', '单声部旋律', '双声部旋律']

const qusNum = [6, 2, 3, 6, 2, 3, 1]

const stateText = ['已完成', '待完成', '已逾期']

const stateType = ['check-circle', 'clock-circle', 'stop']

const href = 'https://ant.design'

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
]

const description = '这里是关于练耳听写题的详情，暂时未定具体内容'

const dictationList = (options) => {
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
      cover: covers[i],
      description: description,
    })
  }
  return builder(data)
}

Mock.mock(/\/study\/dictationList/, 'get', dictationList)
