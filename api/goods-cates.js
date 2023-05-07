const db = uniCloud.database();
const dbCollectionName = 'goods-cates';


export default {
	async getGoodsCates() {
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
	}
}
