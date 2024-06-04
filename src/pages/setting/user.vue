<template>
	<view class="login">
		<view class="header">
			<u-navbar leftIconSize="25px" :leftText="$i18n.t('setting.personalInformation')" leftIconColor="#ffffff" :autoBack="true"
				:bgColor="bgColor"></u-navbar>
			<u--image class="top" :showLoading="true" :src="src" width="340rpx" height="470rpx"></u--image>
			<view class="contain">
				<u-tabs :list="tabsList" @change="tabsChange"></u-tabs>
				<view v-show="settingTabs == 1">
					<u--form labelPosition="left" :model="formData" :rules="rules" ref="uForm">
						<u-form-item labelWidth="100" :label="$i18n.t('setting.userName')" prop="username" borderBottom ref="item1">
							<u--input v-model="formData.username" border="surround"></u--input>
						</u-form-item>
						<u-form-item labelWidth="100" :label="$i18n.t('setting.phoneNumber')" prop="mobile" borderBottom ref="item1">
							<u--input v-model="formData.mobile" border="surround"></u--input>
						</u-form-item>
						<u-form-item labelWidth="100" :label="$i18n.t('setting.emailAddress')" prop="email" borderBottom ref="item1">
							<u--input v-model="formData.email" border="surround"></u--input>
						</u-form-item>
						<u-form-item labelWidth="100" :label="$i18n.t('setting.employeeID')" prop="jobNumber" borderBottom ref="item1">
							<u--input v-model="formData.jobNumber" border="surround"></u--input>
						</u-form-item>
					</u--form>

					<u-button class="setting" type="primary" shape="circle" @click="handleSubmit">
						{{ $i18n.t('common.confirm2') }}
					</u-button>
				</view>

				<view v-show="settingTabs == 2">
					<u--form labelPosition="left" :model="formData2" :rules="rules2" ref="uForm2">
						<u-form-item labelWidth="100" :label="$i18n.t('setting.oldPassword')" prop="oldPassword" borderBottom ref="item1">
							<u--input type="password" :placeholder="$i18n.t('setting.enterOldPassword')" border="surround"
								v-model="formData2.oldPassword"></u--input>
						</u-form-item>
						<u-form-item labelWidth="100" :label="$i18n.t('setting.newPassword')" prop="newPassword" borderBottom ref="item1">
							<u--input type="password" :placeholder="$i18n.t('setting.enterNewPassword')" border="surround" password v-model="formData2.newPassword"></u--input>
						</u-form-item>
					</u--form>

					<u-button class="setting" type="primary" shape="circle" @click="passwordSubmit">
						{{ $i18n.t('common.confirm2') }}
					</u-button>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>
<script>
	const img = require("@/static/login/top.png");
	import {
		postExposePing,
		postUserEditmy,
		postUserPwd,
		getUserInfo
	} from "@/api/login";
	export default {
		name: "setting",
		data() {
			return {
				bgColor: "transparent",
				showSex: false,
				formData: {
					username: '',
					mobile: "",
					email: '',
					jobNumber: '',

				},
				formData2:{
					oldPassword: '',
					newPassword: '',
				},
				settingTabs: 1,
				tabsList: [{
						name: $i18n.t('setting.basicInformation'),
						value: 1
					},
					{
						name: $i18n.t('setting.changePassword'),
						value: 2
					},
				],
				rules: {
					username: [{
						required: true,
						message: $i18n.t('setting.enterUserName'),
						trigger: ['change', 'blur'],
					}],
					jobNumber:[{
						required: true,
						message: $i18n.t('setting.enterPhoneNumber'),
						trigger: ['change', 'blur'],
					}],
					mobile: [{
							required: true,
							message: $i18n.t('setting.enterPhoneNumber'),
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.mobile(value);
							},
							message: $i18n.t("setting.phoneError"),
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],

				},
				rules2:{
					oldPassword: [{
						required: true,
						message: $i18n.t('setting.enterOldPassword'),
						trigger: ['blur'],
					}],
					newPassword: [{
						required: true,
						message: $i18n.t('setting.enterNewPassword'),
						trigger: ['blur'],
					}]
				},
				radio: '',
				switchVal: false,
				loading: false,
				src: img,
			};
		},
		onLoad(options) {
			if (!options.user) return
			this.formData = JSON.parse(options.user)
		},
		methods: {
			tabsChange(item) {

				this.settingTabs = item.value;

			},
			handleSubmit() {
				this.$refs.uForm.validate().then(res => {
					let data = this.formData;
					postUserEditmy(data).then(res => {
						console.log(res)
						if(res.data.success){
							this.$refs.uToast.show({
							    message: $i18n.t('setting.editSuccess'),
							    type: 'success',
							    duration: 1500,
								complete() {
									uni.navigateTo({
									  url: "/pages/login/index",
									});
								}
							});

						}
					})
				}).catch(errors => {
					uni.$u.toast($i18n.t('setting.validationFailed'))
				})
			},
			passwordSubmit(){
				if(this.formData2.oldPassword != "" && this.formData2.newPassword != ""){
					let data ={
						oldPassword:this.formData2.oldPassword,
						newPassword:this.formData2.newPassword
					}
					postUserPwd(data).then(res => {
						if(res.data.success){
							this.$refs.uToast.show({
							    message: $i18n.t('setting.passwordChangeSuccess'),
							    type: 'success',
							    duration: 1500,
								complete() {
									uni.navigateTo({
									  url: "/pages/login/index",
									});
								}
							});
						}
					})
				}
			}
		},
	};
</script>
<style lang="scss" scoped>
	.login {
		.header {
			position: relative;
			width: 100%;
			height: 780rpx;
			background: url("@/static/login/bg.png");
			background-size: cover;
			background-repeat: no-repeat;
			.top {
				display: block;
				position: absolute;
				top: 100rpx;
				left: 200rpx;
				z-index: 3;
			}

			.contain {
				width: 90%;
				position: absolute;
				left: 5%;
				box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08);
				border-radius: 10px;
				backdrop-filter: blur(25px);
				background: #ffffff;
				top: 65%;
				padding: 5% 5% 5%;
				box-sizing: border-box;

				.common {
					height: 70rpx;
					border-radius: 70rpx;
					margin-top: 60rpx;
				}

				.loginBtn {
					margin-top: 120rpx;
					background: #2283e2;
					border: none;
					height: 88rpx;
				}

				.setting {
					margin-top: 50rpx;
					background: #00c280;
					border: none;
					height: 88rpx;
				}
			}
		}
	}
</style>
