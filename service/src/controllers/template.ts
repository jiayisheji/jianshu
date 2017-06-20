/**
 * 控制器模板
 * Created by jiayi on 2017/6/20.
 */
import * as async from "async";
import { default as Template, TemplateModel} from "../models/Template";
import { Request, Response, NextFunction } from "express";
import { WriteError } from "mongodb";
import * as _ from "lodash";

/**
 * 模板控制器
 */
export class TemplateController{
    constructor(){}
    /**
     * POST /template
     * 新增一个
     */
    async save(req: Request, res: Response, next: NextFunction){
    }

    /**
     * GET /template/:id
     * 获取一个
     */
    async find(req: Request, res: Response, next: NextFunction){
    }

    /**
     * PUT /template/:id
     * 更新一个
     */
    async updata(req: Request, res: Response, next: NextFunction){
    }

    /**
     * GET /template
     * 获取全部
     */
    async search(req: Request, res: Response, next: NextFunction) {
    }

    /**
     * DELETE /template
     * 删除一个
     */
    async remove(req: Request, res: Response, next: NextFunction) {
    }
}
/**
 * 导出模块
 */
export default new TemplateController()
