/**
 * Created by jiayi on 2017/9/13.
 */

///<reference types="express"/>

// Add RequestValidation Interface on to Express's Request Interface.
declare namespace Express {
    export interface Response extends ExpressResponseHandlerMiddleware.ResponseResults {
    }
}

// External express-response-handler-middleware module.
declare module 'express-response-handler-middleware' {
    import express = require('express');

    /**
     * @param options see: https://github.com/ctavan/express-validator#middleware-options
     * @constructor
     */
    function ExpressResponseHandlerMiddleware(): express.Response;

    export = ExpressResponseHandlerMiddleware;
}

// Internal Module.
declare namespace ExpressResponseHandlerMiddleware {
    export interface ResponseResults {
        /**
         * 结果成功响应
         * @param {Object} results
         * @param {{start?: number; count?: number; total?: number}} others
         */
        resultsResolve(results?: object, others?: { start?: number, count?: number, total?: number }): void;

        /**
         * 结果失败响应
         * @param {{status: number; code: number; message: string}} errors
         */
        resultsReject(errors: { status: number, code: number, message: string }): void;
    }
}
