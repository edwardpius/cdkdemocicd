import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineAppStage } from './cdkdemocicd-app-stack' ;
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { Code } from 'aws-cdk-lib/aws-lambda' ;

export class CdkdemocicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // AWS CI-CD Pipeline
    const democicdpipeline = new CodePipeline (this, 'cdkdemopipeline', {
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('edwardpius/cdkdemocicd', 'main', {
        }),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
      }),
    });

    const testingStage = democicdpipeline.addStage(new PipelineAppStage(this, 'test', {
      env: { account: '288417637285', region: 'us-west-2'}
    }));

    testingStage.addPost(new ManualApprovalStep('approval'));

    const prodStage = democicdpipeline.addStage(new PipelineAppStage(this, 'prod', {
      env: { account: '288417637285', region: 'us-west-2'}
    }));
  }
}