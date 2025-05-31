import api from './index';


interface ModifyTableRequest {
  instruction: string;
  table_data: string[][];
  filename:string
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

