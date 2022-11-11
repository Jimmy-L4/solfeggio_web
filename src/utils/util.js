export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 5
    ? '晚上好'
    : hour < 9
    ? '早上好'
    : hour <= 11
    ? '上午好'
    : hour <= 13
    ? '中午好'
    : hour < 20
    ? '下午好'
    : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '注意作业的deadline哦~', '要劳逸结合o~', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}
/**
 * @function 返回part_id
 * @description 根据信息返回part_id
 * @param mode 学习模式{视唱:'0',练耳选择题:'3',练耳听写题:'4'}
 * @param type 一级分类{视唱:单声部精唱:'01',单声部视谱即唱:'02',双声部:'03'}{练耳:音阶:'01'...}
 * @param voice_part 声部{低声部:'01',高声部:'02',不分声部:'00'}
 * @param grade 等级{基础级:'01',一级:'02'...}
 * @param lesson_No 课次{课次一:'1'...}
 * @param num 题目序号{第一题:'01'...}
 * @return part_id
 * @author Jimmy 2022/07/12
 */
export function getPartId(mode, type, voice_part = '00', grade, lesson_No, num = '01') {
  const part_id = mode + type + '00000000' + voice_part + '00' + grade +'0' + lesson_No + num
  return part_id
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    (event) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
export function scorePassword(pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1
    score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  }

  let variationCount = 0
  for (var check in variations) {
    variationCount += variations[check] === true ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score)
}
