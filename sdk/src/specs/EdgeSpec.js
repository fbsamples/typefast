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
 *
 * @flow
 */

import type {RequestMethod} from './../http/Request';
import type {NodeType} from './NodeSpec';
import type NodeSpec from './NodeSpec';
import type SpecRegistry from './../SpecRegistry';

class EdgeSpec {

  description: string;
  edge: string;
  functionName: string;
  name: string;
  method: RequestMethod;
  registry: SpecRegistry;
  returnType: NodeType;

  constructor(
    registry: SpecRegistry,
    name: string,
    edge: string,
    method: RequestMethod,
    return_type: NodeType,
    description: string
  ): void {
    this.registry = registry;
    this.name = name;
    this.edge = edge;
    this.method = method;
    this.returnType = return_type;
    this.description = description;
  }

  getEdge(): string {
    return this.edge;
  }

  getMethod(): RequestMethod {
    return this.method;
  }

  getReturnType(): NodeType {
    return this.returnType;
  }

  getDescription(): string {
    return this.description;
  }

  getName(): string {
    return this.name;
  }

  // FIXME provide logic or pre-build names from spec
  getFunctionName(): string {
    if (this.functionName == null) {
      let method = this.getMethod();
      let type = this.getNodeSpec().getType();
      this.functionName = (`${method}${type}`).toLowerCase();
    }

    return this.functionName;
  }

  getNodeSpec(): NodeSpec {
    return this.registry.get(this.getReturnType());
  }
}

module.exports = EdgeSpec;
