/**
 * Created by jiayi on 2017/9/13.
 */

///<reference types="express"/>

// Add RequestValidation Interface on to Express's Request Interface.
declare namespace Express {
    export interface Request extends ExpressRequestMiddlewareFilter.RequestResults {
    }
}

// External express-request-middleware-filter module.
declare module 'express-request-middleware-filter' {
    import express = require('express');

    /**
     * @param options
     * @constructor
     */
    function ExpressRequestMiddlewareFilter(): express.Response;

    export = ExpressRequestMiddlewareFilter;
}

// Internal Module.
declare namespace ExpressRequestMiddlewareFilter {
    export interface RequestResults {
        /**
         * 请求验证过字段集合
          */
        _VALIDATE_FIELD_COLLECTION: Array<string>;
    }
}
