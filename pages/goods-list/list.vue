<template>
  <view>
    <view class="uni-header">
      <view class="uni-group">
        <view class="uni-title"></view>
        <view class="uni-sub-title"></view>
      </view>
      <view class="uni-group">
        <input class="uni-search" type="text" v-model="query" @confirm="search" placeholder="请输入搜索内容" />
        <button class="uni-button" type="default" size="mini" @click="search">搜索</button>
        <button class="uni-button" type="default" size="mini" @click="navigateTo('./add')">新增</button>
        <button class="uni-button" type="default" size="mini" :disabled="!selectedIndexs.length" @click="delTable">批量删除</button>
        <!-- <download-excel class="hide-on-phone" :fields="exportExcel.fields" :data="exportExcelData" :type="exportExcel.type" :name="exportExcel.filename">
          <button class="uni-button" type="primary" size="mini">导出 Excel</button>
        </download-excel> -->
      </view>
    </view>
    <view class="uni-container">
      <unicloud-db ref="udb" :collection="collectionList" field="id,cate_id,name,price,discountPrice,discountDesc,discountCount,use_property,unit,goods_type,sort,content,images,remain_count,month_sell_count,is_sell,is_alone_sale,property,seller_note" :where="where" page-data="replace"
        :orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
        v-slot:default="{data,pagination,loading,error,options}" :options="options" loadtime="manual" @load="onqueryload">
        <uni-table ref="table" :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection" @selection-change="selectionChange">
          <uni-tr>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'id')" sortable @sort-change="sortChange($event, 'id')">自定义id</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'cate_id')">分类 id</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'name')" sortable @sort-change="sortChange($event, 'name')">名称</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'price')" sortable @sort-change="sortChange($event, 'price')">商品价格</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'discountPrice')" sortable @sort-change="sortChange($event, 'discountPrice')">优惠价格</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'discountDesc')" sortable @sort-change="sortChange($event, 'discountDesc')">优惠说明</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'discountCount')" sortable @sort-change="sortChange($event, 'discountCount')">优惠数目</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'use_property')">是否可选规格</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'unit')" sortable @sort-change="sortChange($event, 'unit')">商品单位</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'goods_type')" sortable @sort-change="sortChange($event, 'goods_type')">类型</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'sort')" sortable @sort-change="sortChange($event, 'sort')">商品排序</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'content')" sortable @sort-change="sortChange($event, 'content')">详细描述</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'images')" sortable @sort-change="sortChange($event, 'images')">缩略图地址</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'remain_count')" sortable @sort-change="sortChange($event, 'remain_count')">库存数量</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'month_sell_count')" sortable @sort-change="sortChange($event, 'month_sell_count')">月销量</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'is_sell')">是否上架</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'is_alone_sale')">月销量</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'property')">规格</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'seller_note')" sortable @sort-change="sortChange($event, 'seller_note')">商家备注</uni-th>
            <uni-th align="center">操作</uni-th>
          </uni-tr>
          <uni-tr v-for="(item,index) in data" :key="index">
            <uni-td align="center">{{item.id}}</uni-td>
            <uni-td align="center">{{item.cate_id}}</uni-td>
            <uni-td align="center">{{item.name}}</uni-td>
            <uni-td align="center">{{item.price}}</uni-td>
            <uni-td align="center">{{item.discountPrice}}</uni-td>
            <uni-td align="center">{{item.discountDesc}}</uni-td>
            <uni-td align="center">{{item.discountCount}}</uni-td>
            <uni-td align="center">{{item.use_property == true ? '✅' : '❌'}}</uni-td>
            <uni-td align="center">{{item.unit}}</uni-td>
            <uni-td align="center">{{item.goods_type}}</uni-td>
            <uni-td align="center">{{item.sort}}</uni-td>
            <uni-td align="center">{{item.content}}</uni-td>
            <uni-td align="center">{{item.images}}</uni-td>
            <uni-td align="center">{{item.remain_count}}</uni-td>
            <uni-td align="center">{{item.month_sell_count}}</uni-td>
            <uni-td align="center">{{item.is_sell == true ? '✅' : '❌'}}</uni-td>
            <uni-td align="center">{{item.is_alone_sale == true ? '✅' : '❌'}}</uni-td>
            <uni-td align="center">{{item.property}}</uni-td>
            <uni-td align="center">{{item.seller_note}}</uni-td>
            <uni-td align="center">
              <view class="uni-group">
                <button @click="navigateTo('./edit?id='+item._id, false)" class="uni-button" size="mini" type="primary">修改</button>
                <button @click="confirmDelete(item._id)" class="uni-button" size="mini" type="warn">删除</button>
              </view>
            </uni-td>
          </uni-tr>
        </uni-table>
        <view class="uni-pagination-box">
          <uni-pagination show-icon :page-size="pagination.size" v-model="pagination.current" :total="pagination.count" @change="onPageChanged" />
        </view>
      </unicloud-db>
    </view>
  </view>
</template>

<script>
  import { enumConverter, filterToWhere } from '../../js_sdk/validator/goods-list.js';

  const db = uniCloud.database()
  // 表查询配置
  const dbOrderBy = '' // 排序字段
  const dbSearchFields = [] // 模糊搜索字段，支持模糊搜索的字段列表。联表查询格式: 主表字段名.副表字段名，例如用户表关联角色表 role.role_name
  // 分页配置
  const pageSize = 20
  const pageCurrent = 1

  const orderByMapping = {
    "ascending": "asc",
    "descending": "desc"
  }

  export default {
    data() {
      return {
        collectionList: "goods-list",
        query: '',
        where: '',
        orderby: dbOrderBy,
        orderByFieldName: "",
        selectedIndexs: [],
        options: {
          pageSize,
          pageCurrent,
          filterData: {},
          ...enumConverter
        },
        imageStyles: {
          width: 64,
          height: 64
        },
        exportExcel: {
          "filename": "goods-list.xls",
          "type": "xls",
          "fields": {
            "自定义id": "id",
            "分类 id": "cate_id",
            "名称": "name",
            "商品价格": "price",
            "优惠价格": "discountPrice",
            "优惠说明": "discountDesc",
            "优惠数目": "discountCount",
            "是否可选规格": "use_property",
            "商品单位": "unit",
            "类型": "goods_type",
            "商品排序": "sort",
            "详细描述": "content",
            "缩略图地址": "images",
            "库存数量": "remain_count",
            "月销量": "is_alone_sale",
            "是否上架": "is_sell",
            "规格": "property",
            "商家备注": "seller_note"
          }
        },
        exportExcelData: []
      }
    },
    onLoad() {
      this._filter = {}
    },
    onReady() {
      this.$refs.udb.loadData()
    },
    methods: {
      onqueryload(data) {
        this.exportExcelData = data
      },
      getWhere() {
        const query = this.query.trim()
        if (!query) {
          return ''
        }
        const queryRe = new RegExp(query, 'i')
        return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
      },
      search() {
        const newWhere = this.getWhere()
        this.where = newWhere
        this.$nextTick(() => {
          this.loadData()
        })
      },
      loadData(clear = true) {
        this.$refs.udb.loadData({
          clear
        })
      },
      onPageChanged(e) {
        this.selectedIndexs.length = 0
        this.$refs.table.clearSelection()
        this.$refs.udb.loadData({
          current: e.current
        })
      },
      navigateTo(url, clear) {
        // clear 表示刷新列表时是否清除页码，true 表示刷新并回到列表第 1 页，默认为 true
        uni.navigateTo({
          url,
          events: {
            refreshData: () => {
              this.loadData(clear)
            }
          }
        })
      },
      // 多选处理
      selectedItems() {
        var dataList = this.$refs.udb.dataList
        return this.selectedIndexs.map(i => dataList[i]._id)
      },
      // 批量删除
      delTable() {
        this.$refs.udb.remove(this.selectedItems(), {
          success:(res) => {
            this.$refs.table.clearSelection()
          }
        })
      },
      // 多选
      selectionChange(e) {
        this.selectedIndexs = e.detail.index
      },
      confirmDelete(id) {
        this.$refs.udb.remove(id, {
          success:(res) => {
            this.$refs.table.clearSelection()
          }
        })
      },
      sortChange(e, name) {
        this.orderByFieldName = name;
        if (e.order) {
          this.orderby = name + ' ' + orderByMapping[e.order]
        } else {
          this.orderby = ''
        }
        this.$refs.table.clearSelection()
        this.$nextTick(() => {
          this.$refs.udb.loadData()
        })
      },
      filterChange(e, name) {
        this._filter[name] = {
          type: e.filterType,
          value: e.filter
        }
        let newWhere = filterToWhere(this._filter, db.command)
        if (Object.keys(newWhere).length) {
          this.where = newWhere
        } else {
          this.where = ''
        }
        this.$nextTick(() => {
          this.$refs.udb.loadData()
        })
      }
    }
  }
</script>

<style>
</style>
