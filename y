version = 0.1
[y]
[y.deploy]
[y.deploy.parameters]
stack_name = "sf-file-mv"
s3_bucket = "aws-sam-cli-managed-default-samclisourcebucket-skt160kydc9"
s3_prefix = "sf-file-mv"
region = "ap-south-1"
confirm_changeset = true
capabilities = "CAPABILITY_IAM"
parameter_overrides = "StageName=\"dev\" ProductLine=\"data-channels\" vpcStackName=\"vpc-7aced912\" SecurityGroupIds=\"sg-43dc9c20\" SubnetIDs=\"subnet-0c2e9a77,subnet-170d605b,subnet-a51c20cd\" EFSpath=\"/mnt/files\" AccessPointARN=\"arn:aws:elasticfilesystem:ap-south-1:026420118215:access-point/fsap-05023fe8a92ec615d\""
