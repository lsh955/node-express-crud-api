require('dotenv').config()  // .env 환경설정

const {validationResult} = require("express-validator");

const logFormatter = require('../module/logs')

/**
 * validation API 결과 단일화를 위한 처리
 *
 * @param req   요청객체
 * @param res   응답객체
 * @returns {Promise<*>}
 */
const validationForm = async (req, res) => {
    // 파라미터 조건이 맞지 않는경우, message return
    const validation = validationResult(req).array()

    try {
        if (!Array.isArray(validation) || validation.length !== 0) {
            return res.json({
                message: validation[0]['msg'],
                value: validation[0]['value']
            })
        }
    } catch (error) {
        logFormatter.logs.error(`validationForm >> ${error}`)
        return res.json({
            message: "validationForm 함수 에러"
        })
    }
}

/**
 * router API 결과 단일화를 위한 처리
 *
 * @param res   응답객체
 * @param data  서비스 데이터
 * @returns {Promise<*>}
 */
const responseForm = async (res, data) => {
    // 최초 요청부터 완료까지 시간측정을 위한 셋팅.
    const startTime = new Date();

    try {
        return res.json({
            code: 'SUCCESS',
            message: '성공',
            doDT: new Date(),
            data: data,
            duration: new Date() - startTime
        })
    } catch (error) {
        return res.json({
            code: 'FAILURE',
            message: error
        })
    }
}

module.exports = {
    validationForm,
    responseForm
};