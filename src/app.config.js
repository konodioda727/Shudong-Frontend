export default ({

  pages: [
    "pages/Welcome/index",
    'pages/Main/index',
    'pages/Homepage/index',
    'pages/Video/index',
    'pages/Analysis/index',
  ],
  subpackages: [//分包
    {
      root: "moduleA",
      pages: [
        "pages/Alarm/index",
        "pages/Form/index",
        "pages/Rescue_detail/index",
        "pages/Rescue_comment/index",
        "pages/Sign/index",
        "pages/R_record/index",
        "pages/R_task/index",
        'pages/Userinfo/index',
        'pages/Aprovelist/index',
        'pages/Aprove/index',//区域负责人、组委会审批报名表
        'pages/Manage/index',
        'pages/Rolehistory/index',
        'pages/Outer/index',
        'pages/ImportRescue/index',
        'pages/View_Video/index'
      ],
      independent: false
    },
    {
      root: "moduleB",
      pages: [
       'pages/TeamAnalyse/index',
       /* 'components/ec-canvas/ec-canvas' */
      ],
      independent: false
    },
    {
      root: "moduleC",
      pages:[
        "pages/Search/index",
       'pages/Grade/index',
       'pages/Formalreport/index',
       'pages/Transfer/index',
       'pages/Submit/index',
       'pages/Auditform/index',
       'pages/Notice/index',
       'pages/VideoList/index',
       'pages/VideoPlay/index'
      ],
      independent: false
    }
    ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#76A9FF',
    navigationBarTitleText: '树洞救援',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true,
    onReachBottomDistance: 3,

  },
  tabBar: {
    /* tab页面必须放在主包里 */
    list: [
      {
        pagePath: 'pages/Main/index',
        text:'首页',
        iconPath: 'images/main.png',
        selectedIconPath: 'images/main-selected.png'
      },
      {
        pagePath:'pages/Analysis/index',
        text:'数据分析',
        iconPath: 'images/analysis.png',
        selectedIconPath: 'images/analysis-selected.png'
      },
      {
        pagePath:'pages/Video/index',
        text:'学习频道',
        iconPath: 'images/video.png',
        selectedIconPath: 'images/video-selected.png'
      },
      {
        pagePath: 'pages/Homepage/index',
        text:'个人',
        iconPath: 'images/mine.png',
        selectedIconPath: 'images/mine-selected.png'
      }],
      color: '#000000',
      backgroundColor: '#c4d6f5',
      selectedColor: '#3F94D1'
    }
    ,

})
