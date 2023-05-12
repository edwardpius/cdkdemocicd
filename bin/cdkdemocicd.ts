#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkdemocicdStack } from '../lib/cdkdemocicd-stack';

const app = new cdk.App();
new CdkdemocicdStack(app, 'CdkdemocicdStack', {
  env: { account: '288417637285', region: 'us-west-2' },
});