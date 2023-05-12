import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

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
          'npm cdk synth'
        ],
      }),
    });
  }
}
