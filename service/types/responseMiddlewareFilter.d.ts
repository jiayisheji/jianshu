/**
 * Created by jiayi on 2017/9/13.
 */

///<reference types="express"/>

// Add RequestValidation Interface on to Express's Request Interface.
declare namespace Express {
    export interface Response extends ExpressResponseMiddlewareFilter.ResponseResults {
    }
}

// External express-response-middleware-filter module.
declare module 'express-response-middleware-filter' {
    import express = require('express');

    /**
     * @param options
     * @constructor
     */
    function ExpressResponseMiddlewareFilter(): express.Response;

    export = ExpressResponseMiddlewareFilter;
}

// Internal Module.
declare namespace ExpressResponseMiddlewareFilter {
    export interface ResponseResults {
        /**
         * 结果成功响应 返回无
         */
        resultsResolve(): void;
        /**
         * 结果成功响应 返回数组
         * @param {Object} results
         */
        resultsResolve(results: object): void;
        /**
         * 结果成功响应 返回对象
         * @param {Object} results
         * @param {{start?: number; count?: number; total?: number}} others
         */
        resultsResolve(results: Array<any>, others: { start?: number, count?: number, total?: number }): void;

        /**
         * 结果失败响应
         * @param {{status: number; code: number; message: string}} errors
         */
        resultsReject(errors: { status?: number, code?: number, message?: string }): void;
    }
}