import  {get,post,put,del,patch} from './API';
export const createFormData = p => post(`record/formdata/`, p);
export  const getFormDataDetail = p => get(`record/formdata/${p.id}`,"");
export  const getFormDataList = p => get('record/formdata', p);
export const updateFormData = (dataid, p) => patch(`record/formdata/${dataid}/`, p);