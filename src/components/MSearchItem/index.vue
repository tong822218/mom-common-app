<template>
  <view class="m-search-item flex text-28rpx text-#5A6F82">
    <view class="start-center flex-1 width-83">
      <text class="flex label" :style="{ width: labelWidth, flexShrink: 0 }">
        <view class="flex items-center  " @click="labelClick">
          <text
            :style="{ color: 'red', visibility: required ? 'auto' : 'hidden' }"
          >
            *
          </text>
          {{ label }}
          <u-icon
            v-if="select && iconPlacement == 'left'"
            :name="require('@/static/selectIcon.png')"
            color="#CDCDCD"
            size="20"
          ></u-icon>
        </view>
      </text>
      <!-- 文字展示 -->
      <view class="text-right flex text-#333 text-pack" v-if="type == 'text'">
        <text>{{ value }}</text>
      </view>
      <!-- 输入框 -->
      <view class="between-center flex-1" v-if="type == 'input'">
        <view
          @click="scan"
          v-if="iconPlacement == 'right'"
          class="flex text-#333 text-pack"
        >
          <text class="text-15px" v-if="value">{{ value }}</text>
          <text v-else class="placeholderClass">
            {{ placeholderText ? placeholderText : `选择${label}` }}
          </text>
        </view>

        <u-number-box
          v-else-if="inputType == 'number'"
          class="flex-1"
          v-bind="$attrs"
          v-on="$listeners"
          :value="value"
          bgColor="#F3F5FB"
          :placeholder="placeholderText ? placeholderText : `输入${label}`"
          :customStyle="customStyleIn"
          placeholderClass="placeholderClass"
        ></u-number-box>
        <u-input
          v-else
          class="flex flex-1"
          type="input"
          clearable
          v-on="$listeners"
          v-bind="$attrs"
          :value="value"
          :placeholder="placeholderText ? placeholderText : `输入${label}`"
          :customStyle="customStyleIn"
          placeholderClass="placeholderClass"
        ></u-input>
        <u-icon
          :size="iconPlacement == 'right' ? '36rpx' : '48rpx'"
          v-if="showScan"
          color="#B6C0C9" class="right-icon"
          :name="iconPlacement == 'right' ? 'arrow-right' : 'scan'"
          @click="scan"
        ></u-icon>
      </view>

      <!-- 单选-多选 -->
      <view class="between-center flex-1" v-if="type == 'radio'">
        <u-radio-group
          class="flex-1 text-28rpx"
          v-bind="$attrs"
          v-on="$listeners"
          :value="value"
          bgColor="#F3F5FB"
          :placeholder="placeholderText ? placeholderText : `选择${label}`"
          :customStyle="customStyleIn"
          placeholderClass="placeholderClass"
        >
          <u-radio
            :customStyle="{ marginRight: '16px' }"
            v-for="(item, index) in options"
            :key="index"
            class="text-28rpx"
            :label="item.text"
            :name="item.value"
          ></u-radio>
        </u-radio-group>
      </view>
    </view>
    <view class="flex">
      <slot name="right"></slot>
    </view>
    <select-search
      style="flex: 0;"
      @confirm="confirmPicker"
      v-model="showPicker"
      :labelKey="labelKey"
      :data="selectOptions"
      @closeInput="closeInput"
      v-bind="$attrs"
    ></select-search>
  </view>
</template>

<script>
import selectSearch from "@/components/select-search";
export default {
  name: "MSearchItem",
  components: { selectSearch },
  props: {
    type: {
      type: String,
      default: "input",
    },
    inputType: {
      type: String,
      default: "text",
    },
    labelKey: {
      type: String,
      default: "name",
    },
    select: {
      type: Boolean,
      default: false,
    },
    iconPlacement: {
      type: String,
      default: "left",
    },
    selectOptions: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "单号",
    },
    placeholderText: {
      type: String,
      default: "",
    },
    value: {
      type: String | Number,
      default: "",
    },
    labelWidth: {
      type: String,
      default: "224rpx",
    },
    showScan: {
      type: Boolean,
      default: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    showPickerBefore: Function,
  },
  data() {
    return {
      customStyleIn: {
        padding: 0,
      },
      showPicker: false,
    };
  },
  methods: {
    closeInput() {
      this.$emit("closeInput");
    },
    async labelClick() {
      if (this.select) {
        // 打开前的钩子
        let { show } = this.showPickerBefore
          ? await this.showPickerBefore()
          : { show: true };

        this.showPicker = show;
      }
    },
    confirmPicker(item) {
      this.$emit("selectConfirm", item);
      this.showPicker = false;
    },
    scan() {
      if (this.select && this.iconPlacement == "right") {
        this.labelClick();
      } else {
        this.$mpaasScan({
          success: ({ result }) => {
            this.$emit("input", result);
            this.$emit("scan", result, this.value);
          },
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.m-search-item {
  width: 100%;
  background: #fff;
  // height: 80rpx;
  padding: 6px 9px;
  align-items: center;
  border-bottom: solid 1px #f3f3f5;
  ::v-deep .u-number-box__input {
    flex: 1;
  }
  ::v-deep .u-number-box {
    width: 100%;
  }
  .text-pack {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  .required {
    &::before {
      color: red;
      content: "*";
      width: 8rpx;
      height: 8rpx;
    }
  }
  ::v-deep .u-input {
    border: none;
  }
  .placeholderClass {
    font-size: 15px;
    font-weight: 400;
    color: rgb(192, 196, 204);
  }
  .width-83 {
    width: 0%;
  }
  ::v-deep.u-radio__text {
    font-size: 28rpx !important;
    line-height: unset !important;
  }
  .font-28 {
  }
}
</style>
