import { comsAxios } from './interceptors';

import type { Bucket, SearchBucketsOptions } from '@/types';

const BUCKET_PATH = 'bucket';

export default {
  /**
   * @function searchForBuckets
   * Returns a list of buckets
   * @param {SearchBucketsOptions} params Optional object containing the data to filter against
   * @returns {Promise} An axios response
   */
  searchBuckets(params?: SearchBucketsOptions) {
    return comsAxios().get(`${BUCKET_PATH}`, { params: params });
  },

  /**
   * @function createBucket
   * Creates a bucket
   * @param {Bucket} data Bucket object containing the data to create bucket
   * @returns {Promise} An axios response
   */
  createBucket(data: Bucket) {
    return comsAxios().put(`${BUCKET_PATH}`, data);
  },

  /**
   * @function updateBucket
   * Updates a bucket
   * @param {Bucket} data Bucket object containing the data to update bucket
   * @returns {Promise} An axios response
   */
  updateBucket(bucketId: string, data: Bucket) {
    return comsAxios().patch(`${BUCKET_PATH}/${bucketId}`, data);
  }
};
