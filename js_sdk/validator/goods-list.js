// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ]
  },
  "cate_id": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "name": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "title": "名称",
    "label": "名称"
  },
  "price": {
    "rules": [
      {
        "format": "double"
      }
    ],
    "title": "商品价格",
    "label": "商品价格"
  },
  "discountPrice": {
    "rules": [
      {
        "format": "double"
      }
    ],
    "title": "优惠价格",
    "label": "优惠价格"
  },
  "discountDesc": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "优惠说明",
    "label": "优惠说明"
  },
  "discountCount": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "优惠数目",
    "label": "优惠数目"
  },
  "use_property": {
    "rules": [
      {
        "format": "bool"
      }
    ]
  },
  "unit": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "商品单位",
    "label": "商品单位"
  },
  "goods_type": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "类型",
    "label": "类型"
  },
  "sort": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "商品排序",
    "label": "商品排序"
  },
  "content": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "详细描述",
    "label": "详细描述"
  },
  "images": {
    "rules": [
      {
        "format": "string"
      },
      {
        "pattern": "^(http://|https://|/|./|@/)\\S"
      }
    ],
    "title": "缩略图地址",
    "label": "缩略图地址"
  },
  "remain_count": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      }
    ],
    "title": "库存数量",
    "label": "库存数量"
  },
  "month_sell_count": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      }
    ]
  },
  "is_sell": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "bool"
      }
    ],
    "title": "是否上架",
    "label": "是否上架"
  },
  "is_alone_sale": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "bool"
      }
    ]
  },
  "property": {
    "rules": [
      {
        "format": "array"
      },
      {
        "arrayType": "object"
      }
    ]
  },
  "seller_note": {
    "rules": [
      {
        "format": "string"
      }
    ]
  }
}

const enumConverter = {}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
