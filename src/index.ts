// @ts-ignore
import AliyunOSS from 'aliyun-oss-react-native-fix';

export type ImageInfo = {
  /**
   *  name of this image you want to operate
   *  you should ensure the uniqueness in image name
   */
  name: string;
  /**
   * image path
   */
  path: string;
};

/**
 * oss authorization information
 */
export type OssAuthInfo = {
  AccessKeyId: string;
  AccessKeySecret: string;
  SecurityToken: string;
  bucketName: string;
  endpoint: string;
  folder: string;
};

/**
 * upload images to ali cloud with auth information
 * @param imageInfos each image info need include two field : name(with suffix) and path , notice :
 * @param ossAuthInfo should fulfill profile : {AccessKeyId, AccessKeySecret, SecurityToken, bucket_name, endpoint, folder}
 * @returns {Promise<boolean>}
 */
export async function uploadImagesToAliCloud(
  imageInfos: ImageInfo[],
  ossAuthInfo: OssAuthInfo
) {
  const {
    AccessKeyId,
    AccessKeySecret,
    SecurityToken,
    bucketName,
    endpoint,
    folder,
  } = ossAuthInfo;
  AliyunOSS.enableDevMode();
  const configuration = {
    maxRetryCount: 3,
    timeoutIntervalForRequest: 30,
    timeoutIntervalForResource: 24 * 60 * 60,
  };
  AliyunOSS.initWithSecurityToken(
    SecurityToken,
    AccessKeyId,
    AccessKeySecret,
    endpoint,
    configuration
  );
  //first at all , upload image to oss service t, then submit to backend
  const allUploadPromise: Promise<any>[] = [];
  const allImageNames: string[] = [];
  for (let image of imageInfos) {
    let uniqueImageName = image.name;
    // let uniqueImageName = generateUUID() + 'com.finsiot.smarttinygrid.jpg';
    allImageNames.push(uniqueImageName);
    allUploadPromise.push(
      AliyunOSS.asyncUpload(bucketName, folder + uniqueImageName, image.path)
    );
  }
  return new Promise((resolve, reject) => {
    Promise.all(allUploadPromise)
      .then(() => {
        resolve(allImageNames);
      })
      .catch(reject);
  });
  // //listen upload progress
  // const downloadProgress = p => console.log('oss test : ' + p.currentSize / p.totalSize);
  // AliyunOSS.addEventListener('uploadProgress', downloadProgress);
}
