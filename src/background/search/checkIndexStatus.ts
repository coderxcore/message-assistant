import {IndexUpdatePayload} from "./IndexUpdatePayload";

export async function checkIndexStatus() {
	const start = await IndexUpdatePayload.get();
	if (!start) {
		return
	}
	console.log('开始更新索引', start)
}
