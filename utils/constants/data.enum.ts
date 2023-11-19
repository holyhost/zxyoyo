
export const constants = {
    postTags: [
        'React',
        'Angular',
        'Vue',
        'Next',
        'MQTT',
        'Centos',
        'Error',
        '生活',
        'Python',
        'Mysql',
        'ESP8266',
        'Typescript',
        'Flask'
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
        value: 'all'
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


export type ImageTagType = (typeof constants.imageTags)[number];