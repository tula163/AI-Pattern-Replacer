import api from './index';
// import type { BaseResponse } from '../types/api';

interface ModifyTableRequest {
  instruction: string;
  table_data: string[][];
}

interface RegexResponseData {
  modified_data: string[][];
  regex: string;
  parsed: {
    column: string;
    replacement: string;
    pattern_type: string;
  };
}

export const apiModify = async (
  payload: ModifyTableRequest
): Promise<RegexResponseData> => {
  return api.post('/modify-table', payload);
};

