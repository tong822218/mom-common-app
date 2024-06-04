<template>
	<div style=" width: 100%;">
		<div @click="isShow = true" :class="{'no-onclick-event': disabled}">
			<u-input :prefixIcon="prefixIcon" :suffixIcon="suffixIcon" :shape="shape" :border="border"
				:disabled="disabled" :inputAlign="inputAlign" :value="selectedName" readonly :placeholder="placeholder">
			</u-input>
		</div>
		<u-action-sheet :title="title" :round="round" :description="description" :actions="options" :show="isShow"
			:closeOnClickAction="true" :closeOnClickOverlay="false" :cancelText="cancelText" @close="handleClose"
			@select="handleSelect"></u-action-sheet>
	</div>
</template>
<script>
	export default {
		name: 'pSelect',
		props: {
			title: {
				type: String,
				default: ''
			},
			description: {
				type: String,
				default: ''
			},
			options: {
				type: Array,
				default: () => []
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			value: {
				type: Object,
				defalut: () => {}
			},
			placeholder: {
				type: String,
				default: '请选择'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			border: {
				type: String,
				default: 'surround'
			},
			inputAlign: {
				type: String,
				default: 'left'
			},
			shape: {
				type: String,
				defalut: ''
			},
			required: {
				type: Boolean,
				default: false
			},
			round: {
				type: Number,
				default: 0
			},
			prefixIcon: {
				type: String,
				default: null
			},
			suffixIcon: {
				type: String,
				default: null
			}
		},
		computed: {
			selectedName() {
				return this.value['name'] || '';
			},
		},
		data() {
			return {
				isShow: false,
			}
		},
		methods: {
			handleSelect(result) {
				this.$emit('input', result)
			},
			handleClose() {
				this.isShow = false ;
				this.$emit('validate')
			}
		}
	}
</script>
<style scoped>
	.u-input {
		width: 100% !important;
	}

	.no-onclick-event {
		pointer-events: none;
	}
</style>
