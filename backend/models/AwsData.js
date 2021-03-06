const mongoose = require('mongoose');

const AwsDataSchema = new mongoose.Schema(
  {
    AmiLaunchIndex: Number,
    ImageId: String,
    InstanceId: String,
    InstanceType: String,
    KeyName: String,
    LaunchTime: String,
    Monitoring: { State: String },
    Placement: {
      AvailabilityZone: String,
      GroupName: String,
      Tenancy: String,
    },
    PrivateDnsName: String,
    PrivateIpAddress: String,
    ProductCodes: Array,
    PublicDnsName: String,
    State: { Code: Number, Name: String },
    StateTransitionReason: String,
    SubnetId: String,
    VpcId: String,
    Architecture: String,
    BlockDeviceMappings: {
      DeviceName: String,
      Ebs: {
        AttachTime: String,
        DeleteOnTermination: Boolean,
        Status: String,
        VolumeId: String,
      },
    },
    ClientToken: String,
    EbsOptimized: Boolean,
    EnaSupport: Boolean,
    Hypervisor: String,
    NetworkInterfaces: {
      Association: {
        IpOwnerId: String,
        PublicDnsName: String,
        PublicIp: String,
      },
      Attachment: {
        AttachTime: String,
        AttachmentId: String,
        DeleteOnTermination: Boolean,
        DeviceIndex: Number,
        Status: String,
        NetworkCardIndex: Number,
      },
      Description: String,
      Groups: {
        GroupName: String,
        GroupId: String,
      },
      Ipv6Addresses: Array,
      MacAddress: String,
      NetworkInterfaceId: String,
      OwnerId: String,
      PrivateIpAddress: String,
      PrivateIpAddresses: {
        Association: {
          IpOwnerId: String,
          PublicDnsName: String,
          PublicIp: String,
        },
        Primary: Boolean,
        PrivateIpAddress: String,
      },
      SourceDestCheck: Boolean,
      Status: String,
      SubnetId: String,
      VpcId: String,
      InterfaceType: String,
    },
    RootDeviceName: String,
    RootDeviceType: String,
    SecurityGroups: {
      GroupName: String,
      GroupId: String,
    },
    SourceDestCheck: Boolean,
    Tags: { Key: String, Value: String },
    VirtualizationType: String,
    CpuOptions: { CoreCount: Number, ThreadsPerCore: Number },
    CapacityReservationSpecification: { CapacityReservationPreference: String },
    HibernationOptions: { Configured: Boolean },
    MetadataOptions: {
      State: String,
      HttpTokens: String,
      HttpPutResponseHopLimit: Number,
      HttpEndpoint: String,
      HttpProtocolIpv6: String,
    },
    EnclaveOptions: { Enabled: Boolean },
    PlatformDetails: String,
    UsageOperation: String,
    UsageOperationUpdateTime: String,
    tableName: String,
    // UserCustom: { refs: 'xlsxData'} // ????????? ????????? ??????
  },
  { timestamps: true },
  
);

const AwsData = mongoose.model('awsData', AwsDataSchema);
module.exports = { AwsData };
