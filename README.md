# aliyun-oss-react-native-fix-wrapper

Offer addition functionality to operate images in aliyun cloud base on [aliyun-oss-react-native-fix-further](https://github.com/DeepRolling/aliyun-oss-react-native.git)

## Installation

```sh
npm install aliyun-oss-react-native-fix-wrapper
```

## Usage

```typescript
import {uploadImagesToAliCloud} from "aliyun-oss-react-native-fix-wrapper";

// ...

const uploadedImageNames = await uploadImagesToAliCloud(
  [
    {
      name: '1.png',
      path: 'yourPath',
    },
    {
      name: '2.png',
      path: 'yourPath',
    },
  ],
  {
    AccessKeyId: 'YourAccessKeyId',
    AccessKeySecret: 'YourAccessKeySecret',
    SecurityToken: 'YourSecurityToken',
    bucketName: 'YourBucketName',
    endpoint: 'YourEndpoint',
    folder: 'YourFolder',
  }
);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
