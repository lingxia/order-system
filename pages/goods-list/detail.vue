<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" :collection="collectionList" field="id,cate_id,name,price,discountPrice,discountDesc,discountCount,use_property,unit,goods_type,sort,content,images,remain_count,month_sell_count,is_sell,is_alone_sale,property,seller_note" :where="queryWhere" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
        <view>
          <text>id</text>
          <text>{{data.id}}</text>
        </view>
        <view>
          <text>cate_id</text>
          <text>{{data.cate_id}}</text>
        </view>
        <view>
          <text>名称</text>
          <text>{{data.name}}</text>
        </view>
        <view>
          <text>商品价格</text>
          <text>{{data.price}}</text>
        </view>
        <view>
          <text>优惠价格</text>
          <text>{{data.discountPrice}}</text>
        </view>
        <view>
          <text>优惠说明</text>
          <text>{{data.discountDesc}}</text>
        </view>
        <view>
          <text>优惠数目</text>
          <text>{{data.discountCount}}</text>
        </view>
        <view>
          <text>use_property</text>
          <text>{{data.use_property == true ? '✅' : '❌'}}</text>
        </view>
        <view>
          <text>商品单位</text>
          <text>{{data.unit}}</text>
        </view>
        <view>
          <text>类型</text>
          <text>{{data.goods_type}}</text>
        </view>
        <view>
          <text>商品排序</text>
          <text>{{data.sort}}</text>
        </view>
        <view>
          <text>详细描述</text>
          <text>{{data.content}}</text>
        </view>
        <view>
          <text>缩略图地址</text>
          <text>{{data.images}}</text>
        </view>
        <view>
          <text>库存数量</text>
          <text>{{data.remain_count}}</text>
        </view>
        <view>
          <text>month_sell_count</text>
          <text>{{data.month_sell_count}}</text>
        </view>
        <view>
          <text>是否上架</text>
          <text>{{data.is_sell == true ? '✅' : '❌'}}</text>
        </view>
        <view>
          <text>is_alone_sale</text>
          <text>{{data.is_alone_sale == true ? '✅' : '❌'}}</text>
        </view>
        <view>
          <text>property</text>
          <text>{{data.property}}</text>
        </view>
        <view>
          <text>seller_note</text>
          <text>{{data.seller_note}}</text>
        </view>
      </view>
    </unicloud-db>
    <view class="btns">
      <button type="primary" @click="handleUpdate">修改</button>
      <button type="warn" class="btn-delete" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script>
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../js_sdk/validator/goods-list.js'
  const db = uniCloud.database()

  export default {
    data() {
      return {
        queryWhere: '',
        collectionList: "goods-list",
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.queryWhere = '_id=="' + this._id + '"'
      }
    },
    methods: {
      handleUpdate() {
        // 打开修改页面
        uni.navigateTo({
          url: './edit?id=' + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            // 删除数据成功后跳转到list页面
            uni.navigateTo({
              url: './list'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  .btns {
    margin-top: 10px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
</style>
