/**
 * Created by jiayi on 2017/5/29.
 */
import {chunk} from 'lodash';


export class Page {
    constructor() {
    }

    public async getPage(list?: any, current: string = '1', size: string = '10') {
        const total = list.length;
        if (total === 0) {
            return {
                data: [],
                total: total
            }
        }
        let pageNumber = Math.abs(parseInt(current, 10)) || 1;
        let pageSize = Math.abs(parseInt(size, 10)) || 10;
        let count = Math.ceil(total / pageSize);
        if (pageNumber > count) {
            pageNumber = count;
        }
        return {
            data: chunk(list, pageSize)[pageNumber - 1],
            total: total
        }
    }
}