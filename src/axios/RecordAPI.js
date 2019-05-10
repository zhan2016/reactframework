import  {get,post,put,del,patch} from './API';
export const createRecord = p => post(`record/record/`, p);
export  const getRecordDetail = p => get(`record/record/${p.id}`,"");
export  const getRecordFormList = p => get('record/record', p);
export const updateRecord = (recordid, p) => patch(`record/record/${recordid}/`, p);