

import moment from "moment/moment";

export const cardsData = [
  {
    title: "收入",
    change: 24,
    amount: 42056,
  },
  {
    title: "订单",
    change: 14,
    amount: 52125.03,
  },
  {
    title: "支出",
    change: 18,
    amount: 1216.5,
  },
  {
    title: "利润",
    change: 12,
    amount: 10125.0,
  },
];

export const ordersData = [
  {
    name: "滑板",
    type: "插画",
    items: 58,
    change: 290,
  },
  {
    name: "语言课程",
    type: "插画",
    items: 12,
    change: 72
  },
  {
    name: "办公协作",
    type: "插画",
    items: 7,
    change: 70
  },
  {
    name: "机器人",
    type: "插画",
    items: 21,
    change: 15
  }
]


//* get the value in group number format
export const groupNumber = (number) => {
  return parseFloat(number.toFixed(2)).toLocaleString("en", {
    useGrouping: true,
  });
};


//* calendar Events
let eventGuid = 0
let todayStr = moment().format("YYYY-MM-DD")  // YYYY-MM-DD of today
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: '午餐聚会',
    start: todayStr + 'T09:00:00',

  },
  {
    id: createEventId(),
    title: '定时事件',
    start: moment(todayStr).add(1, "days").format("YYYY-MM-DD") + 'T16:00:00'
  },
  {
    id: createEventId(),
    title: "部门会议",
    start: moment(todayStr).add(2, "days").format("YYYY-MM-DD") + 'T20:00:00'
  },
  {
    id: createEventId(),
    title: "视频会议",
    start: moment(todayStr).add(3, "days").format("YYYY-MM-DD") + 'T09:00:00'
  },
  {
    id: createEventId(),
    title: "付款计划",
    start: moment(todayStr).add(5, "days").format("YYYY-MM-DD") + 'T13:00:00'
  },
  {
    id: createEventId(),
    title: "视频会议",
    start: moment(todayStr).add(6, "days").format("YYYY-MM-DD") + 'T13:00:00'
  },
]

export function createEventId() {
  return String(eventGuid++)
}


// * tasks
export const boardData = {
  columns: [
    {
      id: 1,
      title: "待办事项",
      cards: [
        {
          id: 1,
          title: "数据库设置",
          description: "Firebase 集成"
        },
        {
          id: 2,
          title: "数据流程",
          description: "与其他开发者设置流程图"
        },
      ]
    },
    {
      id: 2,
      title: "计划中",
      cards: [
        {
          id: 9,
          title: "数据表格页面",
          description: "服务端分页",
        }
      ]
    },
    {
      id: 3,
      title: "进行中",
      cards: [
        {
          id: 10,
          title: "日历扩展",
          description: "创建新事件并存储在全局状态"
        },
        {
          id: 11,
          title: "自定义看板",
          description: "在仪表盘中设置 react-kanban 作为独立页面"
        }
      ]
    },
    {
      id: 4,
      title: "已完成",
      cards: [
        {
          id: 12,
          title: "Vite 服务器设置",
          description: "配置所需模块和启动器"
        },
        {
          id: 13,
          title: "模块化结构",
          description: "以模块形式编写 CSS 以减少命名冲突"
        }
      ]
    }
  ]
}


// * user table data
export const userData = [
  {
    name: {
      firstName: '张',
      lastName: '三',
    },
    address: '朝阳区建国路261号',
    city: '北京',
    state: '北京市',
  },
  {
    name: {
      firstName: '李',
      lastName: '四',
    },
    address: '浦东新区陆家嘴769号',
    city: '上海',
    state: '上海市',
  },
  {
    name: {
      firstName: '王',
      lastName: '五',
    },
    address: '天河区珠江新城566号',
    city: '广州',
    state: '广东省',
  },
  {
    name: {
      firstName: '赵',
      lastName: '六',
    },
    address: '南山区科技园722号',
    city: '深圳',
    state: '广东省',
  },
  {
    name: {
      firstName: '刘',
      lastName: '七',
    },
    address: '江汉区解放大道32188号',
    city: '武汉',
    state: '湖北省',
  }, {
    name: {
      firstName: '陈',
      lastName: '八',
    },
    address: '西湖区文三路769号',
    city: '杭州',
    state: '浙江省',
  },
  {
    name: {
      firstName: '周',
      lastName: '九',
    },
    address: '雨花台区软件大道566号',
    city: '南京',
    state: '江苏省',
  },
  {
    name: {
      firstName: '吴',
      lastName: '十',
    },
    address: '高新区天府大道722号',
    city: '成都',
    state: '四川省',
  },
  {
    name: {
      firstName: '郑',
      lastName: '十一',
    },
    address: '渝中区解放碑32188号',
    city: '重庆',
    state: '重庆市',
  },
]