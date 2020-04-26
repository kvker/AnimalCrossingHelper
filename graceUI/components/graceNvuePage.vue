<template>
	<view class="gui-sbody" :style="{flex:flexVal}">
		<!-- 头部导航 -->
		<view v-if="customHeader">
			<view class="gui-page-header" :style="{'z-index':headerIndex, backgroundColor:headerBG, borderBottomWidth:borderWidth, borderBottomColor:borderColor}">
				<!-- 沉浸式状态栏 -->
				<view class="gui-page-status-bar" :style="{height:statusBarHeight+'px', backgroundColor:statusBarBG}"></view>
				<!-- 头部核心 -->
				<view class="gui-page-header-nav" :style="{height:headerHeight+'px'}">
					<view class="gui-header-main gui-flex-auto">
						<slot name="gHeader"></slot>
					</view>
					<view :style="{width:BoundingWidth, height:'10px'}"></view>
				</view>
			</view>
			<!-- 占位 view -->
			<view :style="{width:'750rpx', height:(statusBarHeight + headerHeight) + 'px'}"></view>
		</view>
		<!-- 页面主体 -->
		<view class="gui-page-body" :style="{flex:flexVal}"><slot name="gBody"></slot></view>
		<!-- 页面底部 -->
		<view class="gui-page-footer" :style="{'z-index':footerIndex, backgroundColor:footerBg}">
			<slot name="gFooter"></slot>
		</view>
		<!-- 右下角悬浮按钮 -->
		<view class="gui-page-rb-area" :style="{right:rbRight+'rpx', bottom:rbBottom+'rpx', width:rbWidth+'rpx'}"><slot name="gRTArea"></slot></view>
		<!-- 全屏 loading -->
		<view class="grace-page-loading" @tap.stop="" @touchmove.stop="" :style="{backgroundColor:loadingBG}" v-if="isLoading">
			<view class="grace-page-loading-point">
				<view class="grace-page-loading-points" ref="loadingPoints1" :style="{background:loadingPointBg}"></view>
				<view class="grace-page-loading-points" ref="loadingPoints2" :style="{background:loadingPointBg}"></view>
				<view class="grace-page-loading-points" ref="loadingPoints3" :style="{background:loadingPointBg}"></view>
			</view>
		</view>
	</view>
</template>
<script>
var animation = weex.requireModule('animation');
export default{
	props:{
		customHeader : { type : Boolean, default : true },
		headerHeight : { type : Number, default : 44 },
		headerIndex  : { type : Number, default : 999 },
		headerBG     : { type : String, default : '#FFFFFF'},
		statusBarBG  : { type : String, default : '#FFFFFF'},
		footerIndex  : { type : Number, default : 999},
		rbWidth      : { type : Number, default : 100},
		rbBottom     : { type : Number, default : 100 },
		rbRight      : { type : Number, default : 20 },
		footerBg     : { type : String, default : '' },
		flexVal      : { type : String, default : ''},
		borderWidth  : { type : String,  default : '0' },
		borderColor  : { type : String,  default : '#D1D1D1' },
		loadingBG    : { type : String,  default : 'rgba(255,255,255, 0.1)'},
		isLoading    :  { type : Boolean, default : false },
		loadingPointBg : {type : String,  default : '#3688FF'}
	},
	data() {
		return {
			statusBarHeight : 0,
			iphoneXButtomHeight:0,
			BoundingWidth : '0px',
			animateCount : 0
		}
	},
	watch:{
		isLoading:function(val){
			this.animateCount = 0;
			if(val){ setTimeout(() => { this.animation1(); }, 500);}
		}
	},
	methods:{
		animation1 : function(animations){
			if(this.animateCount >= 10){return ;}
			this.animateCount++;
			var animations1 = this.$refs.loadingPoints1;
			var animations2 = this.$refs.loadingPoints2;
			var animations3 = this.$refs.loadingPoints3;
			animation.transition(animations1, {
				styles: { opacity:0.3, transform: 'scale(1)'},
				duration: 500, 
				timingFunction: 'linear',
				needLayout:false,
				delay: 0 
			});
			animation.transition(animations2, {
				styles: { opacity:0.3, transform: 'scale(1)'},
				duration: 500, 
				timingFunction: 'linear',
				needLayout:false,
				delay: 100 
			});
			animation.transition(animations3, {
				styles: { opacity:0.3, transform: 'scale(1)'},
				duration: 500, 
				timingFunction: 'linear',
				needLayout:false,
				delay: 200
			},() => {this.animation2();});
		},
		animation2 : function(animations){
			var animations1 = this.$refs.loadingPoints1;
			var animations2 = this.$refs.loadingPoints2;
			var animations3 = this.$refs.loadingPoints3;
			animation.transition(animations1, {
				styles: { opacity:1, transform: 'scale(1.3)'},
				duration: 500, 
				timingFunction: 'linear',
				needLayout:false,
				delay: 0 
			});
			animation.transition(animations2, {
				styles: { opacity:1, transform: 'scale(1.3)'},
				duration: 500, 
				timingFunction: 'linear',
				needLayout:false,
				delay: 100 
			});
			animation.transition(animations3, {
				styles: { opacity:1, transform: 'scale(1.3)'},
				duration: 500, 
				timingFunction: 'linear',
				needLayout:false,
				delay: 200
			},() => {this.animation1();});
		}
	},
	created:function(){
		try {
		    var res = uni.getSystemInfoSync();
		} catch (e){
		    return null;
		}
		if(this.isLoading){ setTimeout(() => { this.animation1(); }, 500);}
		if(!this.customHeader){return ;}
		this.statusBarHeight = res.statusBarHeight;
	}
}
</script>
<style scoped>
.gui-sbody{width:750rpx;}
.gui-page-header{width:750rpx; position:fixed; left:0; top:0; z-index:99; border-style:solid;}
.gui-page-status-bar{width:750rpx; height:0;}
.gui-page-header-nav{width:750rpx; flex-direction:row; flex-wrap:nowrap;}
.gui-header-main{width:750rpx;}
.gui-page-body{width:750rpx;}
.gui-page-footer{width:750rpx; position:fixed; left:0; bottom:0; z-index:99;}
.gui-page-rb-area{width:100rpx; position:fixed; right:20rpx; bottom:100rpx; z-index:100;}

.grace-page-loading{width:750rpx; position:fixed; z-index:9999; left:0; top:0; bottom:0; flex:1; flex-direction:column; justify-content:center; align-items:center;}
.grace-page-loading-point{flex-direction:row; flex-wrap:nowrap; justify-content:center;}
.grace-page-loading-points{width:20rpx; height:20rpx; background-color:#3688FF; border-radius:50rpx; margin:10rpx; opacity:0.5;}
</style>