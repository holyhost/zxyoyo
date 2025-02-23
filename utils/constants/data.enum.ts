
export const constants = {
    postTags: [
        'React',
        'Angular',
        'Vue',
        'Next',
        'MQTT',
        'Centos',
        'Windows',
        'Error',
        'CMD',
        '生活',
        'Python',
        'Mysql',
        'ESP8266',
        'Typescript',
        'Flask'
    ],
    maTags: [
        'ma5+',
        'ma5-',
        'ma10+',
        'ma10-',
        'kiss',
        'kis>',
        'firstkiss',
        'up',
        'stopfall'
    ],
    imageTags: [
        '原神',
        '美女',
        '帅哥',
        '赛博朋克',
        '二次元',
        '搞笑',
        '机器人',
        '黑丝',
        '白丝'
    ],
    imageTypes: [
        '动漫',
        '影视',
        '明星',
        '宠物',
        '人物',
        'AI',
        '科技',
        '变异'
    ],
} as const


export const POST_TYPE =  [
    {
        label: '全部',
        value: ''
    },
    {
        label: '账号',
        value: 'account'
    },
    {
        label: '笔记',
        value: 'note'
    },
    {
        label: 'MD',
        value: 'md'
    },
    {
        label: '文章',
        value: 'article'
    }
]

export const SHARE_TEST_TYPE =  [
    {
        label: '市场',
        value: 'all_board'
    },
    {
        label: '大盘',
        value: 'main_board'
    },
    {
        label: '均线',
        value: 'day-ma'
    },
    {
        label: '沪市',
        value: '沪市'
    },
    {
        label: '深市',
        value: '深市'
    },
    {
        label: '北证',
        value: '北证'
    },
    {
        label: '其他',
        value: ''
    }
]


export type ImageTagType = (typeof constants.imageTags)[number];