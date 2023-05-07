import goodCates from '@/api/goods-cates'
const db = uniCloud.database();
const dbCollectionName = 'goods-list';


export default {
	async getGoods() {
		let data = [];
		try {
			const res = await db.collection(dbCollectionName).get();
			if (res.result.code === 0) {
				data = res.result.data;
			}
		} catch (e) {
			uni.showModal({
				content: JSON.stringify(e)
			});
		}
		return data;
	},

    async getGoodsWithCates() {

        const mergeGoodsWithCates = (cates = [], goods=[]) => {
            let goodsWithCates = [];
            let catesObj = {};
            cates.forEach(cate=>{
                catesObj[cate.id] = cate;
            });
            goods.forEach(good=>{
                const cateId = good.cate_id;
                if(!catesObj[cateId].goods_list) {
                    catesObj[cateId].goods_list = [good];
                }else {
                    catesObj[cateId].goods_list = [...catesObj[cateId].goods_list, good];
                }
            });
            goodsWithCates = Object.values(catesObj);
            return goodsWithCates;
        }

		let data = [];
		try {
            const cates = await goodCates.getGoodsCates();
			const goods = await this.getGoods();
            console.log(cates, goods)
            data = mergeGoodsWithCates(cates, goods);
		} catch (e) {
			uni.showModal({
				content: JSON.stringify(e)
			});
		}
		return data;
	}
}
