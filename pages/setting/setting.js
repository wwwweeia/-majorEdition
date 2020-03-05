Page({
  data: {
    fontSize: '',
    bgColor:'',
      ColorList: [
      {
        value: 0, 
        title: '海蓝',
        name: 'blue',
        color: '#0081ff',
        hot: false,
        checked: false
      },
      {
        value: 1,
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d',
        hot: false,
        checked: false
      },
      {
        value: 2,
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08',
        hot: false,
        checked: false
      },
      {
        value: 3,
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f',
        hot: false,
        checked: false
      },
      {
        value: 4,
        title: '森绿',
        name: 'green',
        color: '#39b54a',
        hot: false,
        checked: false
      },
      {
        value: 5,
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4',
        hot: false,
        checked: false
      },
      {
        value: 6,
        title: '嫣红',
        name: 'red',
        color: '#e54d42',
        hot: false,
        checked: false
      },
      {
        value: 7,
        title: '姹紫',
        name: 'purple',
        color: '#6739b6',
        hot: false,
        checked: false
      },
      {
        value: 8,
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0',
        hot: false,
        checked: false
      },
      {
        value: 9,
        title: '玄灰',
        name: 'grey',
        color: '#8799a3',
        hot: false,
        checked: false
      }
    ],
  
  },
  onLoad: function (options) {
  	var fontSize = wx.getStorageSync('fontSize');
    var bgColor = wx.getStorageSync('bgColor')
  	this.setData({
  		fontSize:fontSize,
      bgColor:bgColor
  	})
    this.Checkbox(bgColor);
   },
   //颜色默认
   Checkbox:function(bgColor){
    var that = this;
    var items = that.data.ColorList;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].name == bgColor) {
        items[i].checked = true;
        items[i].hot=true;
        break
      }
    }
    that.setData({
      ColorList: items
    })
   },

//改变字体大小
  change: function (e) {
    this.setData({
      fontSize: e.detail.value
    })
    wx.setStorageSync('fontSize', this.data.fontSize)
  },
  //点击颜色框 使所有元素都为false
  ChooseCheckbox(e) {
      var that = this;
    var items = that.data.ColorList;
    var values = e.currentTarget.dataset.value;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
        items[i].checked =false;
        items[i].hot=false;
    }
    that.setData({
      ColorList: items
    })
    that.ChooseCheckboxSub(values)
  },
  //点击颜色框 使选中的元素为true
  ChooseCheckboxSub(values) {
      var that = this;
    var items = that.data.ColorList;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        items[i].hot=!items[i].hot;
        var bgColor = items[i].name;
        wx.setStorageSync('bgColor',bgColor)
        break
      }
    }
    that.setData({
      ColorList: items,
      bgColor:bgColor
    })
  }
})