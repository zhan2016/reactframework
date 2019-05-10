import  {get,post,put,del,patch} from './API';
export const createForm = p => post(`form/formbuilder/`, p);
export  const getFormDetail = p => get(`form/formbuilder/${p.id}`,"");
export  const getStudyFormList = p => get('form/formbuilder', p);
export const  updateFormIndex = p => put('form/')
export const updateForm = (formid, p) => patch(`form/formbuilder/${formid}/`, p);
export const updateIndex = (p) => post("form/updateindex", p);