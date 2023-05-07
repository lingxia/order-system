<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="id" label="" required>
        <uni-easyinput placeholder="自定义 id" v-model="formData.id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="cate_id" label="">
        <uni-easyinput placeholder="分类 id，参考`goods-cates`表" v-model="formData.cate_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="name" label="名称" required>
        <uni-easyinput placeholder="商品名称" v-model="formData.name" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="price" label="商品价格">
        <uni-easyinput placeholder="商品价格" type="number" v-model="formData.price"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="discountPrice" label="优惠价格">
        <uni-easyinput placeholder="优惠价格" type="number" v-model="formData.discountPrice"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="discountDesc" label="优惠说明">
        <uni-easyinput placeholder="优惠说明" v-model="formData.discountDesc" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="discountCount" label="优惠数目">
        <uni-easyinput placeholder="优惠数目" type="number" v-model="formData.discountCount"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="use_property" label="">
        <switch @change="binddata('use_property', $event.detail.value)" :checked="formData.use_property"></switch>
      </uni-forms-item>
      <uni-forms-item name="unit" label="商品单位">
        <uni-easyinput placeholder="商品单位" v-model="formData.unit" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="goods_type" label="类型">
        <uni-easyinput placeholder="商品类型" type="number" v-model="formData.goods_type"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="sort" label="商品排序">
        <uni-easyinput placeholder="商品排序" type="number" v-model="formData.sort"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="content" label="详细描述">
        <uni-easyinput placeholder="商品详细描述" v-model="formData.content" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="images" label="缩略图地址">
        <uni-easyinput placeholder="商品缩略图，用于在列表或搜索结果中预览显示" v-model="formData.images" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="remain_count" label="库存数量" required>
        <uni-easyinput placeholder="库存数量" type="number" v-model="formData.remain_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="month_sell_count" label="" required>
        <uni-easyinput placeholder="月销量" type="number" v-model="formData.month_sell_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="is_sell" label="是否上架" required>
        <switch @change="binddata('is_sell', $event.detail.value)" :checked="formData.is_sell"></switch>
      </uni-forms-item>
      <uni-forms-item name="is_alone_sale" label="" required>
        <switch @change="binddata('is_alone_sale', $event.detail.value)" :checked="formData.is_alone_sale"></switch>
      </uni-forms-item>
      <uni-forms-item name="property" label="">
        <uni-data-checkbox :multiple="true" v-model="formData.property"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="seller_note" label="">
        <uni-easyinput placeholder="商家备注，仅商家可见" v-model="formData.seller_note" trim="both"></uni-easyinput>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/goods-list.js';

  const db = uniCloud.database();
  const dbCollectionName = 'goods-list';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "id": "",
        "cate_id": "",
        "name": "",
        "price": null,
        "discountPrice": null,
        "discountDesc": "",
        "discountCount": null,
        "use_property": null,
        "unit": "",
        "goods_type": null,
        "sort": null,
        "content": "",
        "images": "",
        "remain_count": null,
        "month_sell_count": null,
        "is_sell": null,
        "is_alone_sale": null,
        "property": [],
        "seller_note": ""
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
  }

  .uni-button {
    width: 184px;
  }
</style>
