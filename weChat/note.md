## 小程序

一种新的应用形态


> 特性

- 并不是HTML5/CSS3的技术
- 抛弃了臃肿的WebView
- 采用了JavaScriptCode动态解析
- C/S架构，不会出现跨域问题
- 大量借鉴React.js + ReactNative.js思想

> 开放的API

- 视图容器：视图(View)、滚动视图、Swiper
- 基础内容：图标、文本、进度条
- 表单组件：按钮、表单等等
- 操作反馈 导航
- 媒体组建：音频、图片、视频。
- 地图 画布 文件操作能力
- 网络：上传下载能力、WebSocket
- 数据：数据缓存能力
- 位置：获取位置、查看位置
- 设备：网络状态、系统信息、重力感应、罗盘
- 界面：设置导航条、导航、动画、绘图等等
- 开放接口：登录，包括签名加密，用户信息、微信支付、模板消息



> 开发环境

[小程序官网](https://mp.weixin.qq.com/debug/wxadoc/dev/?t=1474644083132)


安装微信官方`微信web开发者工具`


## 项目结构

```
App
- app.js // 处理全局逻辑
- app.json // 公共配置
- app.wxss // 公共样式表
pages // 页面目录
	index
		- xxx.js // 页面逻辑
			- xxx.wxml // 页面视图
				- xxx.wxss // 页面样式
					- xxx.json // 配置文件
					utils // 工具库目录
					```
					-----
					```
					wxml - WXML -> WeiXin Markup Language 
					wxss - WXSS -> Weixin Style Sheet 
					```

					> Page函数

					- Page里面data属性
					- `Page.setData`函数进行刷新界面数据
					- 不能通过`this.data = {text: ''}`修改data中的全部数据


					> app.json

					```
					pages // 设置页面路径，路由
					window // 设置默认页面的窗口
					tabBar // 设置底部tab
					networkTimeout // 设置网络超时时间
					debug // 开启debugger
					```

					## 视图

					> 事件

					- 事件是视图层到逻辑层的通讯方式
					- 事件可以将用户的行为反馈到逻辑层进行处理
					- 事件可以绑定在组件上，当达到触发事件，就会执行逻辑层中对应的事件处理函数
					- 事件对象可以携带额外信息。 如id，dataset，touches


					```
					// 点击事件
					<view bindtap="eventName"></view>
					```

					> 数据修改

					```
					this.setData({dataKey: newValue})

					// 获取
					this.data.dataName
					```

					> 条件

					`wx:if`
					```
					<view wx:if="data"></view>
					<view wx:else></view>
					```

					> 循环

					`wx:for`

					```
					<view wx:for="{{arr}}" wx:key="index">{{item.name}}</view>
					```

					> 模板

					`template`
					模板不会在界面中显示.

					```
					<!-- 定义 -->
					<template name="staffName">
					  <view>{{name}}</view>
					  </template>
					  <!-- 使用 -->
					  <template is="staffName" data="{{...nameArr}}"></template>
					  ```

					  > wxml中的引用

					  ```
					  <import src="item.wxml" />
					  <template is="item" data="...dataValue" />
					  ```

					  ## 生命周期

					  ```
					  Page({

					    /**
					       * 页面的初始数据
					          */
						    data: {
						      
						        },

							  /**
							     * 生命周期函数--监听页面加载
							        */
								  onLoad: function (options) {
								    
								      },

								        /**
									   * 生命周期函数--监听页面初次渲染完成
									      */
									        onReady: function () {
										  
										    },

										      /**
										         * 生命周期函数--监听页面显示
											    */
											      onShow: function () {
											        
												  },

												    /**
												       * 生命周期函数--监听页面隐藏
												          */
													    onHide: function () {
													      
													        },

														  /**
														     * 生命周期函数--监听页面卸载
														        */
															  onUnload: function () {
															    
															      },

															        /**
																   * 页面相关事件处理函数--监听用户下拉动作
																      */
																        onPullDownRefresh: function () {
																	  
																	    },

																	      /**
																	         * 页面上拉触底事件的处理函数
																		    */
																		      onReachBottom: function () {
																		        
																			  },

																			    /**
																			       * 用户点击右上角分享
																			          */
																				    onShareAppMessage: function () {
																				      
																				        }
																					})
																					```

																					## API

																					> wx.request()

																					请求数据

																					> wx.showLoading()

																					显示loading

																					> wx.showToast()

																					模态框

																					```
																					wx.showLoading({
																					  title: '加载中'
																					  }) 
																					  wx.request({
																					    url: '',
																					      data: {},
																					        success (res) {
																						    wx.hideLoading()
																						      },
																						        error () {
																							    wx.hideLoading()
																							        wx.showToast({
																								      title: '请求错误',
																								            duration: 2000
																									        })
																										  }
																										  })
																										  ```

																										  > 数据缓存

																										  ```
																										  wx.setStorage() // 设置缓存
																										  wx.getStorage() // 获取缓存
																										  ```


																										  ## 内置组件

																										  > 视图

																										  ```
																										  <view></view> // 视图容器
																										  <scroll-view></scroll-view> // 可滚动视图区域
																										  <swiper></swiper> // 滑块视图容器
																										  ```

																										  > 文本，图片，进度条，图标

																										  ```
																										  <text></text>

																										  <block>
																										      <icon></icon>
																										      </block>

																										      <progress></progress>
																										      <image></image>
																										      ```

																										      > 导航

																										      url需要相对路径，不支持跳转外链.
																										      ```
																										      <navigator url="../../logs/logs"></navigator>
																										      ```
																										      ----
																										      ```
																										      // 跳转
																										      wx.navigateTo() // 跳转到指定路由
																										      wx.navigateBack({delta: 2}) // 返回到指定路由/历史记录
																										      ```



