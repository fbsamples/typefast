/**
 * Copyright (c) 2016-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

declare module "http-status-codes" {

  declare var exports: {
    ACCEPTED: number,
    BAD_GATEWAY: number,
    BAD_REQUEST: number,
    CONFLICT: number,
    CONTINUE: number,
    CREATED: number,
    EXPECTATION_FAILED: number,
    FAILED_DEPENDENCY: number,
    FORBIDDEN: number,
    GATEWAY_TIMEOUT: number,
    GONE: number,
    HTTP_VERSION_NOT_SUPPORTED: number,
    INSUFFICIENT_SPACE_ON_RESOURCE: number,
    INSUFFICIENT_STORAGE: number,
    INTERNAL_SERVER_ERROR: number,
    LENGTH_REQUIRED: number,
    LOCKED: number,
    METHOD_FAILURE: number,
    METHOD_NOT_ALLOWED: number,
    MOVED_PERMANENTLY: number,
    MOVED_TEMPORARILY: number,
    MULTI_STATUS: number,
    MULTIPLE_CHOICES: number,
    NETWORK_AUTHENTICATION_REQUIRED: number,
    NO_CONTENT: number,
    NON_AUTHORITATIVE_INFORMATION: number,
    NOT_ACCEPTABLE: number,
    NOT_FOUND: number,
    NOT_IMPLEMENTED: number,
    NOT_MODIFIED: number,
    OK: number,
    PARTIAL_CONTENT: number,
    PAYMENT_REQUIRED: number,
    PRECONDITION_FAILED: number,
    PRECONDITION_REQUIRED: number,
    PROCESSING: number,
    PROXY_AUTHENTICATION_REQUIRED: number,
    REQUEST_HEADER_FIELDS_TOO_LARGE: number,
    REQUEST_TIMEOUT: number,
    REQUEST_TOO_LONG: number,
    REQUEST_URI_TOO_LONG: number,
    REQUESTED_RANGE_NOT_SATISFIABLE: number,
    RESET_CONTENT: number,
    SEE_OTHER: number,
    SERVICE_UNAVAILABLE: number,
    SWITCHING_PROTOCOLS: number,
    TEMPORARY_REDIRECT: number,
    TOO_MANY_REQUESTS: number,
    UNAUTHORIZED: number,
    UNPROCESSABLE_ENTITY: number,
    UNSUPPORTED_MEDIA_TYPE: number,
    USE_PROXY: number,

    getStatusText(statusCode: number): string,
  }
}
