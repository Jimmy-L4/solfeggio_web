import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const titles = ['单声部精唱', '单声部视谱即唱', '双声部']

const audioName = ['米拉尕黑', '龙船调', '深山密林我的家']

const player = ['努尔阿力白克', '刘宇', '达西道尔吉']

const description =
  '这里是关于视唱题目的详情，暂时未定具体内容'
const href = 'https://ant.design'

const instrument = ['库姆孜', '声乐', '声乐']

const nation = ['东乡族', '土家族', '达翰尔族']

const skill = ['单音', '滚奏', '']

const stateText = ['已完成', '待完成', '已逾期']

const stateType = ['check-circle', 'clock-circle', 'stop']

const sightsingList = (options) => {
  const queryParameters = getQueryParameters(options)
  console.log('queryParameters', queryParameters)
  if (queryParameters && !queryParameters.count) {
    queryParameters.count = 3
  }
  const data = []
  for (let i = 0; i < queryParameters.count; i++) {
    const tmpKey = i + 1
    const state = Mock.mock('@integer(0, 2)')
    data.push({
      id: tmpKey,
      player: player[i],
      audioName: audioName[i],
      AIscore: Mock.mock('@integer(1, 100)'),
      score: Mock.mock('@integer(1, 100)'),
      description: description,
      href: href,
      title: titles[i] + queryParameters.lesson_No,
      instrument: instrument[i],
      nation: nation[i],
      skill: skill[i],
      stateText: stateText[state],
      stateType: stateType[state],
    })
  }
  return builder(data)
}

Mock.mock(/\/study\/sightsingList/, 'get', sightsingList)
